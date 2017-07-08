<?php
use Illuminate\Contracts\Events\Dispatcher;
use EmilioForrer\MdEditor\Listener;
return function (Dispatcher $events) {
    $events->subscribe(Listener\AddClientAssets::class);
};
