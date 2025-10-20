@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-returned.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">As we carefully examine each application, we also require complete, accurate, and up-to-date
        information as to make an informed decision.
        Kindly check the information and/or documents that you have provided once again. We have found the information
        provided to be lacking with the following remarks:</p>
    <p style="line-height: 140%">
    <ul>
        <li>
            <p style="line-height: 140%">{{ $remarks }}</p>
        </li>
    </ul>
    </p>
    <p style="line-height: 140%">After complying with the required information and/or documents, please click the <strong>“Resubmit”</strong>
        button for us to re-evaluate your application. We strongly encourage your compliance with this request in order to
        increase your likelihood of success.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
