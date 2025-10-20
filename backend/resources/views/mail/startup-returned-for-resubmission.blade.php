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
    <p style="line-height: 140%">We hope this message finds you well. We would like to inform you that certain aspects of
        your submission for verification under the Philippine Startup Development Program (PSDP) have been brought to our
        attention by the system administrator. You're application has been tagged FOR RESUBMISSION.</p>
    <p style="line-height: 140%"> </p>
    @if($remarks || $assessmentTags)
        <p style="line-height: 140%"><b>Remarks:</b></p>
        <p style="line-height: 140%">
        @if($remarks)
            <ul>
                <li>
                    <p style="line-height: 140%">{{ $remarks }}</p>
                </li>
            </ul>
        @endif

        @if($assessmentTags)
            @foreach($assessmentTags as $tag)
            <ul>
                <li>
                    <p style="line-height: 140%">{{ $tag['description'] }}</p>
                </li>
            </ul>
            @endforeach
        @endif
        </p>
    @endif

    <p style="line-height: 140%">We look forward to your prompt action and continued collaboration. Should you have any
        further inquiries please feel free to reach out to us at
        <span><strong>{{ config('mail.support_email') }}</strong></span>. We are here to assist you and provide the
        necessary support.
    </p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
