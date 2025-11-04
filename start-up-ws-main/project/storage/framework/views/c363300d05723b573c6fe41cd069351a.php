<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/one-time-pin.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($user->first_name ?? 'StartUp User'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We noticed that your email address was recently used to register a new account on StartUp PH. If this was you, please disregard this message and enjoy using our platform.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">If you did not initiate this registration, it’s possible that someone mistakenly entered your email address. Your current account remains secure, and no action is required on your part.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/email-registration-attempt-mail.blade.php ENDPATH**/ ?>