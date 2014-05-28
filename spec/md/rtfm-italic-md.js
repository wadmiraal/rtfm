
var italic = require( '../../lib/md/rtfm-italic-md' );

describe( 'rtfm italic markdown plugin', function() {

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

        it( 'it correctly converts it to markdown', function() {
            var plugin = new italic();
            var testStrings = {
                '!!poidsa': '*!!poidsa*',
                '!$èé$àa8798dsa!': '*!$èé$àa8798dsa!*',
                '!!!!!! salkdjla sad': '*!!!!!! salkdjla sad*',
                '!!! a !!!': '*!!! a !!!*',
                '  !!!!!sadsad!!!!': '*  !!!!!sadsad!!!!*',
                '!!!!!!!!!!!!!sadasdas': '*!!!!!!!!!!!!!sadasdas*',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});