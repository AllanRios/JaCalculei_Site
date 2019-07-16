const elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');
require('laravel-elixir-spritesmith');

elixir.config.publicPath = 'public/assets/';

elixir.config.css.autoprefix.options.browsers = ['Last 4 versions', 'IE 9'];

elixir((mix) => {
    mix.sass('style.scss')
    .imagemin()
    .webpack('util.js')
    .spritesmith(
        'resources/assets/images/sprites',
        {
            imgPath: '../images/sprites/sprite.png',
            imgOutput: 'public/assets/images/sprites',
            cssOutput: 'resources/assets/sass/helpers',
            cssName: '_sprite.scss'
        }
    )

});
