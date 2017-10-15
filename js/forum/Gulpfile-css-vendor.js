var flarum = require('flarum-gulp');



flarum({
    files: [
      'node_modules/trumbowyg/dist/ui/trumbowyg.css',

    ],
    outputFile: "../../less/forum/vendor.css"
});
