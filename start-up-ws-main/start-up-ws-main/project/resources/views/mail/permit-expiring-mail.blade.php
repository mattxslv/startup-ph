@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-submitted.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">This is a friendly reminder that your business permit is set to expire on <strong>{{ $expiryDate->format('F d, Y') }}</strong>, which is <strong>{{ $daysRemaining }} {{ $daysRemaining == 1 ? 'day' : 'days' }}</strong> from now.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">To maintain your verified status on the StartUp Philippines platform and continue benefiting from government programs and opportunities, please ensure that you renew your business permit before it expires.</p>
    
    <p style="line-height: 140%"><strong>Action Required:</strong></p>
    <p style="line-height: 140%">Once you have renewed your business permit, please:</p>
    <ul style="line-height: 140%">
        <li>Log in to your StartUp PH account</li>
        <li>Navigate to your startup profile</li>
        <li>Upload your renewed business permit</li>
        <li>Update the permit expiration date</li>
        <li>Submit for verification</li>
    </ul>
    
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%"><strong>Important:</strong> If your permit expires without being renewed, your startup's verified status will be temporarily suspended until a valid permit is uploaded.</p>
    
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">If you have any questions or need assistance with the renewal process, please contact our support team at <strong>{{ config('mail.support_email') }}</strong>.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for your attention to this matter.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
