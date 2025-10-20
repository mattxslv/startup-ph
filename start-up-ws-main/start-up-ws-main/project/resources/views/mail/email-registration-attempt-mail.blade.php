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
    <p style="line-height: 140%">We noticed that your email address was recently used to register a new account on StartUp PH. If this was you, please disregard this message and enjoy using our platform.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">If you did not initiate this registration, it’s possible that someone mistakenly entered your email address. Your current account remains secure, and no action is required on your part.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
