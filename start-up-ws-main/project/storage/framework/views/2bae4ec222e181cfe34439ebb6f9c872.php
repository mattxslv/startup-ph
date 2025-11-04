<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-returned.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We hope this message finds you well. We would like to inform you that certain aspects of
        your submission for verification under the Philippine Startup Development Program (PSDP) have been brought to our
        attention by the system administrator. You're application has been tagged FOR RESUBMISSION.</p>
    <p style="line-height: 140%"> </p>
    <?php if($remarks || $assessmentTags): ?>
        <p style="line-height: 140%"><b>Remarks:</b></p>
        <p style="line-height: 140%">
        <?php if($remarks): ?>
            <ul>
                <li>
                    <p style="line-height: 140%"><?php echo e($remarks); ?></p>
                </li>
            </ul>
        <?php endif; ?>

        <?php if($assessmentTags): ?>
            <?php $__currentLoopData = $assessmentTags; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <ul>
                <li>
                    <p style="line-height: 140%"><?php echo e($tag['description']); ?></p>
                </li>
            </ul>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        <?php endif; ?>
        </p>
    <?php endif; ?>

    <p style="line-height: 140%">We look forward to your prompt action and continued collaboration. Should you have any
        further inquiries please feel free to reach out to us at
        <span><strong><?php echo e(config('mail.support_email')); ?></strong></span>. We are here to assist you and provide the
        necessary support.
    </p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/startup-returned-for-resubmission.blade.php ENDPATH**/ ?>