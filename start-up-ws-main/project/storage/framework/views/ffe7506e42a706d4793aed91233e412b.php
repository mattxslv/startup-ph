<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-submitted.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for submitting your application to Startup PH. We are pleased to inform you that we have received your application and it is currently under review.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Your application represents an exciting opportunity for us to support and empower the startup ecosystem in the Philippines. Our dedicated team is diligently reviewing your application to ensure a thorough evaluation and provide you with the best possible support.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We appreciate your patience and understanding as we carefully assess your application. Rest assured that we are committed to maintaining a fair and transparent review process.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for choosing Startup PH. We are excited about the potential of your application and look forward to working with you to bring your startup vision to life.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/startup-submitted-for-verification-mail.blade.php ENDPATH**/ ?>