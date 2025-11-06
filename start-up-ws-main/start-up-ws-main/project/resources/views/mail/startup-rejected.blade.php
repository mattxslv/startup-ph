@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-rejected.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">After careful review and evaluation by our assessment team, we regret to inform you that your application for verification under the Philippine Startup Development Program (PSDP) has been <strong>REJECTED</strong>.</p>
    <p style="line-height: 140%"> </p>
    @if($remarks || $assessmentTags)
        <p style="line-height: 140%"><strong>Assessment Details:</strong></p>
        @if($remarks)
            <p style="line-height: 140%; margin-left: 20px; font-style: italic;">
                "{{ $remarks }}"
            </p>
        @endif
        @if($assessmentTags && count($assessmentTags) > 0)
            <p style="line-height: 140%"><strong>Specific Areas of Concern:</strong></p>
            <ul style="line-height: 140%; margin-left: 20px;">
            @foreach($assessmentTags as $tag)
                @if(is_array($tag))
                    <li>{{ $tag['description'] ?? $tag['code'] ?? 'Assessment Tag' }}@if(isset($tag['notes'])) - {{ $tag['notes'] }}@endif</li>
                @else
                    <li>{{ $tag }}</li>
                @endif
            @endforeach
            </ul>
        @endif
        <p style="line-height: 140%"> </p>
    @endif
    <p style="line-height: 140%">Please note that this decision is final and the application cannot be resubmitted. However, we encourage you to carefully review the program requirements and eligibility criteria. You may consider applying again in the future when your startup's circumstances better align with the PSDP guidelines.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We appreciate your interest in the Philippine Startup Development Program and wish you success in your entrepreneurial endeavors.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,</p>
    <p style="line-height: 140%"><strong>Philippine Startup Development Program Team</strong></p>
@endsection