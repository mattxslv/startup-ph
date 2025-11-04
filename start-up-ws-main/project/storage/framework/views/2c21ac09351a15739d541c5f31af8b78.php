<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-returned.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">As we carefully examine each application, we also require complete, accurate, and up-to-date
        information as to make an informed decision.
        Kindly check the information and/or documents that you have provided once again. We have found the information
        provided to be lacking with the following remarks:</p>
    <p style="line-height: 140%">
    <ul>
        <li>
            <p style="line-height: 140%"><?php echo e($remarks); ?></p>
        </li>
    </ul>
    </p>
    <p style="line-height: 140%">After complying with the required information and/or documents, please click the <strong>“Resubmit”</strong>
        button for us to re-evaluate your application. We strongly encourage your compliance with this request in order to
        increase your likelihood of success.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/application-returned-for-resubmission.blade.php ENDPATH**/ ?>