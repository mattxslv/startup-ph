<?php

namespace App\Console\Commands;

use App\Mail\PermitExpiredMail;
use App\Mail\PermitExpiringMail;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckExpiredPermits extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'startups:check-expired-permits {--dry-run : Run without making changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for expired business permits and flag startups for reverification';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        
        if ($isDryRun) {
            $this->info('Running in DRY RUN mode - no changes will be made');
        }

        $now = Carbon::now();
        $this->info("Checking permits as of: {$now->toDateTimeString()}");

        // Find verified startups with expired permits
        $expiredStartups = Startup::where('status', StartupEnum::STATUS['VERIFIED'])
            ->whereNotNull('business_certificate_expiration_date')
            ->where('business_certificate_expiration_date', '<', $now)
            ->get();

        $this->info("Found {$expiredStartups->count()} startups with expired permits");

        $flaggedCount = 0;
        foreach ($expiredStartups as $startup) {
            $expiryDate = Carbon::parse($startup->business_certificate_expiration_date);
            $daysExpired = $now->diffInDays($expiryDate);
            
            $this->line("- {$startup->name} (ID: {$startup->id}) - Expired {$daysExpired} days ago");

            if (!$isDryRun) {
                // Update status to FOR RESUBMISSION
                $startup->update([
                    'status' => StartupEnum::STATUS['FOR RESUBMISSION'],
                    'remarks' => "Your business permit has expired. Please upload a renewed/updated business permit to continue your verified status.",
                    'returned_at' => $now,
                ]);

                // Send email notification
                try {
                    Mail::to($startup->user)->queue(new PermitExpiredMail($startup, $expiryDate));
                    $this->info("  ✓ Email sent to {$startup->user->email}");
                } catch (\Exception $e) {
                    $this->error("  ✗ Failed to send email: {$e->getMessage()}");
                }

                $flaggedCount++;
            }
        }

        // Also check for permits expiring in 7 days (warning notification)
        $expiringIn7Days = Startup::where('status', StartupEnum::STATUS['VERIFIED'])
            ->whereNotNull('business_certificate_expiration_date')
            ->whereBetween('business_certificate_expiration_date', [
                $now,
                $now->copy()->addDays(7)
            ])
            ->get();

        $this->info("Found {$expiringIn7Days->count()} startups with permits expiring in 7 days");

        $warningCount = 0;
        foreach ($expiringIn7Days as $startup) {
            $expiryDate = Carbon::parse($startup->business_certificate_expiration_date);
            $daysRemaining = $now->diffInDays($expiryDate);
            
            $this->line("- {$startup->name} (ID: {$startup->id}) - Expires in {$daysRemaining} days");

            if (!$isDryRun) {
                // Send warning email
                try {
                    Mail::to($startup->user)->queue(new PermitExpiringMail($startup, $expiryDate, $daysRemaining));
                    $this->info("  ✓ Warning email sent to {$startup->user->email}");
                    $warningCount++;
                } catch (\Exception $e) {
                    $this->error("  ✗ Failed to send email: {$e->getMessage()}");
                }
            }
        }

        if ($isDryRun) {
            $this->warn("DRY RUN complete - no changes were made");
            $this->info("Would have flagged {$expiredStartups->count()} startups");
            $this->info("Would have sent {$expiringIn7Days->count()} warning emails");
        } else {
            $this->info("Successfully flagged {$flaggedCount} startups for reverification");
            $this->info("Sent {$warningCount} warning emails");
        }

        return 0;
    }
}
