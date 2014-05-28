
var underline = require( '../../lib/md/rtfm-underline-md' );

describe( 'rtfm underline markdown plugin', function() {

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

        it( 'it correctly converts it to markdown', function() {
            var plugin = new underline();
            var testStrings = {
                '!!poidsa': '<span style="text-decoration:underline;">!!poidsa</span>',
                '!$èé$àa8798dsa!': '<span style="text-decoration:underline;">!$èé$àa8798dsa!</span>',
                '!!!!!! salkdjla sad': '<span style="text-decoration:underline;">!!!!!! salkdjla sad</span>',
                '!!! a !!!': '<span style="text-decoration:underline;">!!! a !!!</span>',
                '  !!!!!sadsad!!!!': '<span style="text-decoration:underline;">  !!!!!sadsad!!!!</span>',
                '!!!!!!!!!!!!!sadasdas': '<span style="text-decoration:underline;">!!!!!!!!!!!!!sadasdas</span>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});