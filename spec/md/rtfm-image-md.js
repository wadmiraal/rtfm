
var image = require( '../../lib/md/rtfm-image-md' );

describe( 'rtfm image markdown plugin', function() {

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

        it( 'it correctly converts it to markdown', function() {
            var plugin = new image();
            var testStrings = {
                '::::ALT::::s': '!(s)',
                'èé $à;.asd ::::ALT::::http://lk/asdasd.dom/a87-_98d?a=&asd': '![èé $à;.asd ](http://lk/asdasd.dom/a87-_98d?a=&asd)',
                'sal::::ALT::::kdj:la': '![sal](kdj:la)',
                'èé $à;.asd ::::ALT::::http://lk/asdasd.dom/a87-_98d?a=&asd': '![èé $à;.asd ](http://lk/asdasd.dom/a87-_98d?a=&asd)',
                'èé $à;.asd ::::ALT::::file:////lk/asdasd.dom/a87-_98d?a=&asd': '![èé $à;.asd ](file:////lk/asdasd.dom/a87-_98d?a=&asd)'
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});