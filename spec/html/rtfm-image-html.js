
var image = require( '../../lib/html/rtfm-image-html' );

describe( 'rtfm image HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( image ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new image();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new image();
            var testStrings = {
                '::::ALT::::s': '<img src="s">',
                'èé $à;.as"d ::::ALT::::http://lk/asd"asd.dom/a87-_98d?a=&asd': '<img alt="èé $à;.as\\"d " src="http://lk/asd\\"asd.dom/a87-_98d?a=&asd">',
                'sal::::ALT::::kdj:la': '<img alt="sal" src="kdj:la">',
                'èé $à;.asd ::::ALT::::http://lk/asdasd.dom/a87-_98d?a=&asd': '<img alt="èé $à;.asd " src="http://lk/asdasd.dom/a87-_98d?a=&asd">',
                'èé $à;.asd ::::ALT::::file:////lk/asdasd.dom/a87-_98d?a=&asd': '<img alt="èé $à;.asd " src="file:////lk/asdasd.dom/a87-_98d?a=&asd">'
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});