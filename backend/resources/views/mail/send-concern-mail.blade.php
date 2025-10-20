<x-mail::message>
---

## {{ $concern->subject }}

{{ $concern->body }}

---

<x-mail::table>
| Sender Details|               |
|:------------- |--------------:|
| Name          | {{ $concern->name }}      |
| Email         | {{ $concern->email }}     |
| Mobile        | {{ $concern->mobile_no }} |
| Submitted at  | {{ $concern->created_at }}|
</x-mail::table>

---

</x-mail::message>
