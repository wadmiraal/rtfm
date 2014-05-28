
var italic = require( '../../lib/html/rtfm-italic-html' );

describe( 'rtfm italic HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( italic ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new italic();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new italic();
            var testStrings = {
                '!!poidsa': '<em>!!poidsa</em>',
                '!$èé$àa8798dsa!': '<em>!$èé$àa8798dsa!</em>',
                '!!!!!! salkdjla sad': '<em>!!!!!! salkdjla sad</em>',
                '!!! a !!!': '<em>!!! a !!!</em>',
                '  !!!!!sadsad!!!!': '<em>  !!!!!sadsad!!!!</em>',
                '!!!!!!!!!!!!!sadasdas': '<em>!!!!!!!!!!!!!sadasdas</em>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});