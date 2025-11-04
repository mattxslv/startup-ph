<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-submitted.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Welcome to Start Up PH! It's a pleasure to have you as a part of our community. We would
        like to inform you that we have received your application.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">At Start Up PH, we receive a substantial number of applications daily, and our team is
        diligently evaluating each one. Your application is an important part of this process, and we are committed to
        giving it the attention it deserves. Please be patient with us as we complete a thorough assessment based on our
        established rubrics, ensuring that each proposal is evaluated fairly and comprehensively.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We will notify you of the outcome of your grant application as soon as possible. In the
        meantime, we encourage you to explore our website at 
        <strong>
            <a rel="noopener" href="https://startup.e.gov.ph" target="_blank" style="color: #120ff7">startup.e.gov.ph</a>
        </strong>
        to learn more about our initiatives, programs, and the thriving community that you are now a part of.
    </p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/application-submitted-mail.blade.php ENDPATH**/ ?>