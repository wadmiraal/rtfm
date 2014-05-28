
var underline = require( '../../lib/html/rtfm-underline-html' );

describe( 'rtfm underline HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( underline ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new underline();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new underline();
            var testStrings = {
                '!!poidsa': '<u>!!poidsa</u>',
                '!$èé$àa8798dsa!': '<u>!$èé$àa8798dsa!</u>',
                '!!!!!! salkdjla sad': '<u>!!!!!! salkdjla sad</u>',
                '!!! a !!!': '<u>!!! a !!!</u>',
                '  !!!!!sadsad!!!!': '<u>  !!!!!sadsad!!!!</u>',
                '!!!!!!!!!!!!!sadasdas': '<u>!!!!!!!!!!!!!sadasdas</u>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});