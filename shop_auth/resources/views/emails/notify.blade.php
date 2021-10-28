@component('mail::message')
# You have a new request

У вас новый запрос на запчасти, проверьте.

{{--@component('mail::button', ['url' => ''])--}}
{{--Button Text--}}
{{--@endcomponent--}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
