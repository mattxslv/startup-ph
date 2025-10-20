<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\News\News;
use App\Models\News\Resources\NewsResources;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * List news
     *
     * @param Request $request
     * @return NewsResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(News::FILLABLES))->rules());
        $filters = $request->only(News::FILTERS);
        $filters['is_published'] = 1;

        $query = News::searchQuery(News::filterES($filters))->size(10000);

        if (request('q')) {
            $query->sort('_score', 'desc');
        }

        $news = $query
            ->sort(News::getOrderBy(request('order_by') ?? 'publish_date'), (request('status_by') ?? 'desc'))
            ->paginate(request('per_page') ?? 15)
            ->onlyModels();

        return NewsResources::collection($news);
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
}
