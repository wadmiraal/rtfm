
var underline = require( '../lib/rtfm-underline' );

describe( 'rtfm underline plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( underline ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new underline();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new underline();
            var testStrings = [
                '098_!!po_idsa',
                '$èé$\\__àa879_8dsa!',
                '?!!!!_!! sa_lkdjla sad',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new underline();
            var testStrings = {
                '!!po__id__sa': [{
                    string: '!!po',
                    register: false
                }, {
                    string: 'id',
                    register: true
                }, {
                    string: 'sa',
                    register: false
                }],
                '!$__èé__$àa__879__8dsa!': [{
                    string: '!$',
                    register: false
                }, {
                    string: 'èé',
                    register: true
                }, {
                    string: '$àa',
                    register: false
                }, {
                    string: '879',
                    register: true
                }, {
                    string: '8dsa!',
                    register: false
                }],
                '!!!!__!! sa\\__lk__djla sad': [{
                    string: '!!!!',
                    register: false
                }, {
                    string: '!! sa__lk',
                    register: true
                }, {
                    string: 'djla sad',
                    register: false
                }],
                '  !!!!!s__adsa__d!!!!': [{
                    string: '  !!!!!s',
                    register: false
                }, {
                    string: 'adsa',
                    register: true
                }, {
                    string: 'd!!!!',
                    register: false
                }],
                '!!!__!__!!!sadas\\__das': [{
                    string: '!!!',
                    register: false
                }, {
                    string: '!',
                    register: true
                }, {
                    string: '!!!sadas__das',
                    register: false
                }],
            };
            for ( var string in testStrings ) {
                expect( plugin.register( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
