var flarum = require('flarum-gulp');

flarum({
    modules: {
        'emilioforrer/mdeditor': [
            'src/**/*.js',
        ]
    }
});
