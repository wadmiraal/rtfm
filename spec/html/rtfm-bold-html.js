
var bold = require( '../../lib/html/rtfm-bold-html' );

describe( 'rtfm bold HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( bold ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new bold();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new bold();
            var testStrings = {
                '!!poidsa': '<strong>!!poidsa</strong>',
                '!$èé$àa8798dsa!': '<strong>!$èé$àa8798dsa!</strong>',
                '!!!!!! salkdjla sad': '<strong>!!!!!! salkdjla sad</strong>',
                '!!! a !!!': '<strong>!!! a !!!</strong>',
                '  !!!!!sadsad!!!!': '<strong>  !!!!!sadsad!!!!</strong>',
                '!!!!!!!!!!!!!sadasdas': '<strong>!!!!!!!!!!!!!sadasdas</strong>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});