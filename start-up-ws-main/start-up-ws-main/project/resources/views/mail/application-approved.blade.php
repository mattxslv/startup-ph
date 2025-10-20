@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-approved.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We are excited to inform you that your startup, <strong>{{ $startup->name }}</strong>, has been selected for the <strong>{{ $program->name }}</strong> program!</p>
    <p style="line-height: 140%">
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We believe your startup's potential and alignment with the program's goals made it a strong candidate.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We will be sending you more information regarding the next steps and program details in a separate email.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Thank you for your interest, and we look forward to supporting your startup's growth.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
