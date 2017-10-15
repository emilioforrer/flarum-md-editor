var flarum = require('flarum-gulp');

flarum({
    files: [
      'node_modules/to-markdown/dist/to-markdown.js',
      'node_modules/markdown-it/dist/markdown-it.js',
      'node_modules/trumbowyg/dist/trumbowyg.js',
      'node_modules/trumbowyg/dist/plugins/preformatted/trumbowyg.preformatted.js',
      'node_modules/trumbowyg/dist/plugins/noembed/trumbowyg.noembed.js',
      'node_modules/trumbowyg/dist/plugins/insertaudio/trumbowyg.insertaudio.js',
    ],
    outputFile: "dist/vendor.js"
});

// flarumVendorCss({
//     files: [
//       'node_modules/trumbowyg/dist/ui/trumbowyg.css',
//
//     ],
//     outputFile: "../../less/forum/vendor.css"
// });
