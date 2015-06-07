
var code = require( '../../lib/html/rtfm-code-html' );

describe( 'rtfm code HTML plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( code ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new code();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to HTML', function() {
            var plugin = new code();
            var testStrings = {
                '!!poidsa': '<code>!!poidsa</code>',
                '!$èé$àa8798dsa!': '<code>!$èé$àa8798dsa!</code>',
                '!!!!!! salkdjla sad': '<code>!!!!!! salkdjla sad</code>',
                '!!! a !!!': '<code>!!! a !!!</code>',
                '  !!!!!sadsad!!!!': '<code>  !!!!!sadsad!!!!</code>',
                '!!!!!!!!!!!!!sadasdas': '<code>!!!!!!!!!!!!!sadasdas</code>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
