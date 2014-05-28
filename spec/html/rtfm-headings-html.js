
var headings = require( '../../lib/html/rtfm-headings-html' );

describe( 'rtfm headings html plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( headings ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new headings();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to html', function() {
            var plugin = new headings();
            var testStrings = {
                '!!poidsa': '<h5>poidsa</h5>',
                '!$èé$àa8798dsa!': '<h6>$èé$àa8798dsa!</h6>',
                '!!!!!! salkdjla sad': '<h1>salkdjla sad</h1>',
                '!!! a !!!': '<h4>a !!!</h4>',
                '  !!!!!sadsad!!!!': '<h2>sadsad!!!!</h2>',
                '!!!!!!!!!!!!!sadasdas': '<h1>!!!!!!!sadasdas</h1>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});