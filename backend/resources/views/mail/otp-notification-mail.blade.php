@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/one-time-pin.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $user->first_name ?? 'StartUp User' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We have received your request to Log In your account. To ensure the security of your account, we have generated a One-Time Password (OTP) that you can use.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">OTP Code:</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%"><b style="font-weight: bold; font-size: 24px">{{ $pin }}</b></p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Please note that the OTP code is valid for the specified period only. If the OTP
        code expires, you will need to request a new one.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for your continued support and trust in us. We look forward to serving you and providing you with the best possible government services and programs.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are committed to offering you the best possible service and look forward to providing you with a seamless experience.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
