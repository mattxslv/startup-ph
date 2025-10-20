<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Administrators\Administrator;
use App\Models\News\News;
use App\Models\News\Requests\CreateNewsRequest;
use App\Models\News\Requests\UpdateNewsRequest;
use App\Models\News\Resources\NewsResources;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * News listing
     *
     * @param Request $request
     * @return NewsResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(News::FILLABLES))->rules());

        $filters = $request->only(News::FILTERS);

        if (Administrator::authenticated()->agency != 'DICT') {
            $filters['agency'] = Administrator::authenticated()->agency;
        }

        $query = News::searchQuery(News::filterES($filters))->size(10000);

        if (request('q')) {
            $query->sort('_score', 'desc');
        }

        $news = $query
            ->sort(News::getOrderBy(request('order_by')), (request('status_by') ?? 'desc'))
            ->paginate(request('per_page') ?? 15)
            ->onlyModels();

        return NewsResources::collection($news);
    }

    /**
     * Create news
     *
     * @param CreateNewsRequest $request
     * @return NewsResources
     */
    public function store(CreateNewsRequest $request)
    {
        return new NewsResources(Administrator::authenticated()->createNews($request->validated()));
    }

    /**
     * Show news
     *
     * @param News $news
     * @return NewsResources
     */
    public function show(News $news)
    {
        return new NewsResources($news);
    }

    /**
     * Update news
     *
     * @param UpdateNewsRequest $request
     * @param News $news
     * @return NewsResources
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        $news->update($request->validated());

        return new NewsResources($news);
    }

    /**
     * Delete news
     *
     * @param News $news
     * @return NewsResources
     */
    public function destroy(News $news)
    {
        $news->delete();

        return new NewsResources($news);
    }

    /**
     * Toggle published status
     *
     * @param News $news
     * @return NewsResources
     */
    public function togglePublishedStatus(News $news)
    {
        $news->update([
            'is_published' => intval(!$news->is_published),
            'published_at' => $news->is_published ? null : date('Y-m-d H:i:s'),
        ]);

        return new NewsResources($news);
    }
}
