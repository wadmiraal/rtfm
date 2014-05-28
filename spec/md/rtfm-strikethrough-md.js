
var strikeThrough = require( '../../lib/md/rtfm-strikethrough-md' );

describe( 'rtfm strikeThrough markdown plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( strikeThrough ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new strikeThrough();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to markdown', function() {
            var plugin = new strikeThrough();
            var testStrings = {
                '!!poidsa': '<del>!!poidsa</del>',
                '!$èé$àa8798dsa!': '<del>!$èé$àa8798dsa!</del>',
                '!!!!!! salkdjla sad': '<del>!!!!!! salkdjla sad</del>',
                '!!! a !!!': '<del>!!! a !!!</del>',
                '  !!!!!sadsad!!!!': '<del>  !!!!!sadsad!!!!</del>',
                '!!!!!!!!!!!!!sadasdas': '<del>!!!!!!!!!!!!!sadasdas</del>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});