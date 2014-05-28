
var link = require( '../../lib/html/rtfm-link-html' );

describe( 'rtfm link HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( link ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new link();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new link();
            var testStrings = {
                '::::ALT::::s': '<a href="s">s</a>',
                'èé $à;.as"d ::::ALT::::http://lk/asd"asd.dom/a87-_98d?a=&asd': '<a href="http://lk/asd\\"asd.dom/a87-_98d?a=&asd">èé $à;.as"d </a>',
                'sal::::ALT::::kdj:la': '<a href="kdj:la">sal</a>',
                'èé $à;.asd ::::ALT::::http://lk/asdasd.dom/a87-_98d?a=&asd': '<a href="http://lk/asdasd.dom/a87-_98d?a=&asd">èé $à;.asd </a>',
                'èé $à;.asd ::::ALT::::file:////lk/asdasd.dom/a87-_98d?a=&asd': '<a href="file:////lk/asdasd.dom/a87-_98d?a=&asd">èé $à;.asd </a>'
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});