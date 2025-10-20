@extends('mail/mail-layout')

@section('banner')
    <img align="center" border="0" src="https://egov-email-template-assets.s3.amazonaws.com/startup/startup-rejected.png"
        alt="" title=""
        style=" outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 33%; max-width: 174.9px;"
        width="174.9" />
@endsection

@section('content')
    <p style="line-height: 140%">Dear <strong>{{ $startup->name ?? 'StartUp' }}</strong>,</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">We hope this message finds you well. We would like to inform you that certain aspects of
        your submission for verification under the Philippine Startup Development Program (PSDP) have been brought to our
        attention by the system administrator. These specific areas have been flagged due to identified:</p>
    <p style="line-height: 140%">
    <ul>
        @foreach ($flag as $remark)
            @if (isset($remark['concern']))
                <li>
                    <p style="line-height: 140%">{{ $remark['concern'] }}</p>
                </li>
            @endif
        @endforeach
    </ul>
    </p>
    <p style="line-height: 140%">In order to ensure the smooth processing of your submission and to address these concerns,
        we kindly recommend that you:</p>
    <p style="line-height: 140%">
    <ul>
        @foreach ($flag as $remark)
            @if (isset($remark['recommendation']) || isset($remark['remarks']))
                <li>
                    <p style="line-height: 140%">{{ $remark['concern'] ?? $remark['remarks'] }}</p>
                </li>
            @endif
        @endforeach
    </ul>
    </p>
    <p style="line-height: 140%">We look forward to your prompt action and continued collaboration. Should you have any
        further inquiries please feel free to reach out to us at
        <span><strong>{{ config('mail.support_email') }}</strong></span>. We are here to assist you and provide the
        necessary support.</p>
    <p style="line-height: 140%"> </p>
    <p style="line-height: 140%">Best regards,<br /><strong>StartUp PH Team</strong></p>
@endsection
