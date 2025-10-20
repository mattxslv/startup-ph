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
    <p style="line-height: 140%">Thank you for registering at StartUp PH! We're excited to have you as a new member of our community. To get started, please activate your account by entering the OTP provided below:</p>
    <p style="line-height: 140%">OTP Code:</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%"><b style="font-weight: bold; font-size: 24px">{{ $pin }}</b></p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Please note that the OTP code is valid for the specified period only. If the OTP
        code expires, you will need to request a new one.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are committed to offering you the best possible service and look forward to providing you with a seamless experience.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
