@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/one-time-pin.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $administrator->first_name ?? 'StartUp User' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are pleased to inform you that your Startup PH account has been successfully set up. To
        get started, or if your password has been reset by an administrator, we have generated a temporary password for you.
    </p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Password: <b style="font-weight: bold; font-size: 18px">{{ $password }}</b></p>
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
@endsection
