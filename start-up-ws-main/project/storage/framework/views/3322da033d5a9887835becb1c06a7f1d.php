<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/one-time-pin.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($user->first_name ?? 'StartUp User'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for registering at StartUp PH! We're excited to have you as a new member of our community. To get started, please activate your account by entering the OTP provided below:</p>
    <p style="line-height: 140%">OTP Code:</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%"><b style="font-weight: bold; font-size: 24px"><?php echo e($pin); ?></b></p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Please note that the OTP code is valid for the specified period only. If the OTP
        code expires, you will need to request a new one.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are committed to offering you the best possible service and look forward to providing you with a seamless experience.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/email-verification-mail.blade.php ENDPATH**/ ?>