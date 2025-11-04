<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-approved.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Congratulations! We are thrilled to inform you that your application with Startup PH has been verified!</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">At Startup PH, we believe in the power of startups to drive innovation and economic growth. We are delighted to have you join our community of talented entrepreneurs and innovators.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Your approved application signifies our confidence in your potential and our commitment to supporting your startup journey. We are dedicated to providing you with the necessary resources, guidance, and opportunities to thrive in the dynamic startup ecosystem.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/startup-verified-mail.blade.php ENDPATH**/ ?>