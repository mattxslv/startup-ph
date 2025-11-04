<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    /**
     * Export startups to CSV
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function exportStartupsCSV(Request $request)
    {
        $filters = $request->only(Startup::FILTERS);
        
        $query = Startup::with(['user'])->filter($filters);
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="startups_' . Carbon::now()->format('Y-m-d_His') . '.csv"',
        ];

        $callback = function() use ($query) {
            $file = fopen('php://output', 'w');
            
            // CSV Headers
            fputcsv($file, [
                'ID',
                'Startup Number',
                'Startup Name',
                'Business Name',
                'Founder Name',
                'Status',
                'Email',
                'Mobile Number',
                'Founding Year',
                'Region',
                'Province',
                'Municipality',
                'Barangay',
                'Business Classification',
                'Development Phase',
                'Sectors',
                'TIN',
                'DTI Permit Number',
                'SEC Permit Number',
                'Permit Expiration Date',
                'Verified At',
                'Submitted At',
                'Created At',
            ]);

            // Stream data in chunks
            $query->chunk(500, function($startups) use ($file) {
                foreach ($startups as $startup) {
                    fputcsv($file, [
                        $startup->id,
                        $startup->startup_number ?? '',
                        $startup->name ?? '',
                        $startup->business_name ?? '',
                        $startup->founder_name ?? '',
                        $startup->status ?? '',
                        $startup->user->email ?? '',
                        $startup->business_mobile_no ?? '',
                        $startup->founding_year ?? '',
                        $startup->region_code ?? '',
                        $startup->province_code ?? '',
                        $startup->municipality_code ?? '',
                        $startup->barangay_code ?? '',
                        $startup->business_classification ?? '',
                        $startup->development_phase ?? '',
                        implode(', ', $startup->sectors ?? []),
                        $startup->tin ?? '',
                        $startup->dti_permit_number ?? '',
                        $startup->sec_permit_number ?? '',
                        $startup->business_certificate_expiration_date ?? '',
                        $startup->verified_at ? Carbon::parse($startup->verified_at)->format('Y-m-d H:i:s') : '',
                        $startup->submitted_at ? Carbon::parse($startup->submitted_at)->format('Y-m-d H:i:s') : '',
                        $startup->created_at ? $startup->created_at->format('Y-m-d H:i:s') : '',
                    ]);
                }
            });

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }

    /**
     * Export dashboard statistics to CSV
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function exportStatisticsCSV(Request $request)
    {
        $filters = $request->only(Startup::FILTERS);
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="statistics_' . Carbon::now()->format('Y-m-d_His') . '.csv"',
        ];

        $callback = function() use ($filters) {
            $file = fopen('php://output', 'w');
            
            // Overall Statistics
            fputcsv($file, ['Overall Statistics']);
            fputcsv($file, ['Metric', 'Count']);
            fputcsv($file, ['Total Startups', Startup::filter($filters)->count()]);
            fputcsv($file, ['Verified Startups', Startup::filter(array_merge($filters, ['status' => 'VERIFIED']))->count()]);
            fputcsv($file, ['For Verification', Startup::filter(array_merge($filters, ['status' => 'FOR VERIFICATION']))->count()]);
            fputcsv($file, ['For Resubmission', Startup::filter(array_merge($filters, ['status' => 'FOR RESUBMISSION']))->count()]);
            fputcsv($file, ['Rejected', Startup::filter(array_merge($filters, ['status' => 'REJECTED']))->count()]);
            fputcsv($file, []);

            // By Region
            fputcsv($file, ['Startups by Region']);
            fputcsv($file, ['Region', 'Count']);
            $byRegion = Startup::filter($filters)
                ->selectRaw('region_code, COUNT(*) as count')
                ->whereNotNull('region_code')
                ->groupBy('region_code')
                ->orderByDesc('count')
                ->get();
            
            foreach ($byRegion as $item) {
                $region = \App\Models\Addresses\Regions\Region::find($item->region_code);
                fputcsv($file, [
                    $region ? $region->name : $item->region_code,
                    $item->count
                ]);
            }
            fputcsv($file, []);

            // By Sector
            fputcsv($file, ['Startups by Sector']);
            fputcsv($file, ['Sector', 'Count']);
            $bySector = Startup::filter($filters)
                ->selectRaw('sectors, COUNT(*) as count')
                ->whereNotNull('sectors')
                ->where('sectors', '!=', '')
                ->groupBy('sectors')
                ->orderByDesc('count')
                ->get();
            
            foreach ($bySector as $item) {
                fputcsv($file, [
                    $item->sectors,
                    $item->count
                ]);
            }
            fputcsv($file, []);

            // By Development Phase
            fputcsv($file, ['Startups by Development Phase']);
            fputcsv($file, ['Phase', 'Count']);
            $byPhase = Startup::filter($filters)
                ->selectRaw('development_phase, COUNT(*) as count')
                ->whereNotNull('development_phase')
                ->groupBy('development_phase')
                ->orderByDesc('count')
                ->get();
            
            foreach ($byPhase as $item) {
                fputcsv($file, [
                    $item->development_phase,
                    $item->count
                ]);
            }

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }

    /**
     * Generate PDF report (placeholder for future implementation)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function generatePDFReport(Request $request)
    {
        // This would require a PDF library like DomPDF or TCPDF
        // For now, return a message
        return response()->json([
            'message' => 'PDF generation is not yet implemented. Please use CSV export for now.'
        ], 501);
    }
}
