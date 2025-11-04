<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/one-time-pin.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($administrator->first_name ?? 'StartUp User'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are pleased to inform you that your Startup PH account has been successfully set up. To
        get started, or if your password has been reset by an administrator, we have generated a temporary password for you.
    </p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Password: <b style="font-weight: bold; font-size: 18px"><?php echo e($password); ?></b></p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Please use this temporary password to log in to your account. For security reasons, we
        recommend that you change this temporary password to a new, unique password as soon as possible after logging in.
        Here are the steps to change your password:</p>

    <p style="line-height: 140%">
    <ul>
        <li>
            <p style="line-height: 140%">Log in to your Startup PH account using the temporary password.</p>
        </li>
        <li>
            <p style="line-height: 140%">Enter the temporary password as your current password.</p>
        </li>
        <li>
            <p style="line-height: 140%">Create a new password and confirm it.</p>
        </li>
        <li>
            <p style="line-height: 140%">Click Change Password to proceed.</p>
        </li>
    </ul>
    </p>
    <p style="line-height: 140%">We are dedicated to providing you with the best possible service and ensuring the security of your account.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/temporary-password-mail.blade.php ENDPATH**/ ?>