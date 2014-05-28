
var headings = require( '../lib/rtfm-headings' );

describe( 'rtfm headings plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( headings ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new headings();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new headings();
            var testStrings = [
                '098!!poidsa',
                '$èé$àa8798dsa!',
                '?!!!!!! salkdjla sad',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new headings();
            var testStrings = [
                '!!poidsa',
                '!$èé$àa8798dsa!',
                '!!!!!! salkdjla sad',
                '!!! a !!!',
                '  !!!!!sadsad!!!!',
                '!!!!!!!!!!!!!sadasdas',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).not.toEqual( false );
            }
        });

    });

});
