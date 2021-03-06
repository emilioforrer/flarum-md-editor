<?php
namespace EmilioForrer\MdEditor\Listener;
use DirectoryIterator;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureLocales;
use Flarum\Event\ConfigureWebApp;
// use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
class AddClientAssets{

    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addForumAssets']);
        // $events->listen(ConfigureWebApp::class, [$this, 'addAdminAssets']);
        // $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }
    public function addForumAssets(ConfigureWebApp $app)
    {
        if ($app->isForum()) {
            $app->addAssets([
              __DIR__.'/../../js/forum/dist/vendor.js',
              __DIR__.'/../../js/forum/dist/extension.js',
              __DIR__.'/../../less/forum/extension.less',
            ]);
            $app->addBootstrapper('emilioforrer/mdeditor/main');
        }
    }



    public function addAdminAssets(ConfigureWebApp $event)
    {
        // if ($event->isAdmin()) {
        //     $event->addAssets([
        //         __DIR__ . '/../../js/admin/dist/extension.js'
        //     ]);
        //     $event->addBootstrapper('ganuonglachanh/mdeditor/main');
        // }
    }
    /**
    * Provides i18n files.
    *
    * @param ConfigureLocales $event
    */
    // public function addLocales(ConfigureLocales $event)
    // {
    //     foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
    //         if ($file->isFile() && $file->getExtension() === 'yaml') {
    //             $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
    //         }
    //     }
    // }

}
