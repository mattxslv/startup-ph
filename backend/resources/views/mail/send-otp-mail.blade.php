<x-mail::message>
# Hello

Your ONE TIME PIN is __{{ $otp->pin }}__. 

This will expire in 5 minutes.

DO NOT SHARE THIS WITH ANYONE.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
