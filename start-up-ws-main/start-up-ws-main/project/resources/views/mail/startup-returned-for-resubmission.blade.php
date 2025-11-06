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
    <p style="line-height: 140%">Thank you for your application to the Philippine Startup Development Program (PSDP). After our initial review, we have identified certain areas that require additional attention and clarification. Your application has been marked <strong>FOR RESUBMISSION</strong> to allow you the opportunity to address these concerns.</p>
    <p style="line-height: 140%"> </p>
    @if($remarks || $assessmentTags)
        <p style="line-height: 140%"><strong>Areas Requiring Attention:</strong></p>
        @if($remarks)
            <p style="line-height: 140%; margin-left: 20px; font-style: italic;">
                "{{ $remarks }}"
            </p>
            <p style="line-height: 140%"> </p>
        @endif

        @if($assessmentTags)
            <p style="line-height: 140%"><strong>Specific Requirements:</strong></p>
            <ul style="line-height: 140%; margin-left: 20px;">
            @foreach($assessmentTags as $tag)
                <li>{{ $tag['description'] }}</li>
            @endforeach
            </ul>
            <p style="line-height: 140%"> </p>
        @endif
    @endif

    <p style="line-height: 140%">Please review the feedback provided above and update your application accordingly. Once you have addressed all the mentioned points, you may resubmit your application through our online portal.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We appreciate your commitment to the Philippine Startup Development Program and look forward to receiving your revised submission.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
