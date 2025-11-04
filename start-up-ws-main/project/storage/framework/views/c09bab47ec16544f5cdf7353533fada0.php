<?php $__env->startSection('banner'); ?>
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-rejected.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <p style="line-height: 140%">Dear <strong><?php echo e($startup->name ?? 'StartUp'); ?></strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We regret to inform you that your application was not successful with the following remarks:
    </p>
    <p style="line-height: 140%">
    <ul>
        <li>
            <p style="line-height: 140%"><?php echo e($remarks); ?></p>
        </li>
    </ul>
    </p>
    <p style="line-height: 140%">Start Up PH receives several applications daily and our programs have limited slots, so we
        unfortunately cannot accommodate all applicants.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Regardless, we invite you to please check our existing and future grant offerings. You may
        find success with our other offerings that are more in line with your industry and business model.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We hope to see you again soon!</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('mail/mail-layout', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/mail/application-rejected.blade.php ENDPATH**/ ?>