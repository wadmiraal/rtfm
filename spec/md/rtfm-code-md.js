
var code = require( '../../lib/md/rtfm-code-md' );

describe( 'rtfm code markdown plugin', function() {

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

        it( 'it correctly converts it to markdown', function() {
            var plugin = new code();
            var testStrings = {
                '!!poidsa': '`!!poidsa`',
                '!$èé$àa8798dsa!': '`!$èé$àa8798dsa!`',
                '!!!!!! salkdjla sad': '`!!!!!! salkdjla sad`',
                '!!! a !!!': '`!!! a !!!`',
                '  !!!!!sadsad!!!!': '`  !!!!!sadsad!!!!`',
                '!!!!!!!!!!!!!sadasdas': '`!!!!!!!!!!!!!sadasdas`',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
