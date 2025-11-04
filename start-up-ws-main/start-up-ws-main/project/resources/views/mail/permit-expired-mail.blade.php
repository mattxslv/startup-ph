@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-returned.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We hope this message finds you well. We are writing to inform you that your business permit, which expired on <strong>{{ $expiryDate->format('F d, Y') }}</strong>, needs to be renewed to maintain your verified status on the StartUp Philippines platform.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Your startup's status has been temporarily changed to <strong>"For Resubmission"</strong> until a valid, up-to-date business permit is uploaded.</p>
    
    <p style="line-height: 140%"><strong>What you need to do:</strong></p>
    <ul style="line-height: 140%">
        <li>Log in to your StartUp PH account</li>
        <li>Navigate to your startup profile</li>
        <li>Upload your renewed/updated business permit</li>
        <li>Update the permit expiration date</li>
        <li>Submit for verification</li>
    </ul>
    
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Maintaining an active and valid business permit is essential for:</p>
    <ul style="line-height: 140%">
        <li>Keeping your verified status</li>
        <li>Remaining eligible for government programs and opportunities</li>
        <li>Ensuring compliance with Philippine Startup Development Program (PSDP) requirements</li>
    </ul>
    
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">If you have already renewed your permit, please upload it as soon as possible. If you have any questions or need assistance, please don't hesitate to contact our support team at <strong>{{ config('mail.support_email') }}</strong>.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for your prompt attention to this matter.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
