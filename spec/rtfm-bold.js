
var bold = require( '../lib/rtfm-bold' );

describe( 'rtfm bold plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( bold ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new bold();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new bold();
            var testStrings = [
                '098*!!po*idsa',
                '$èé$\\**àa879*8dsa!',
                '?!!!!*!! sa*lkdjla sad',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new bold();
            var testStrings = {
                '!!po**id**sa': [{
                    string: '!!po',
                    register: false
                }, {
                    string: 'id',
                    register: true
                }, {
                    string: 'sa',
                    register: false
                }],
                '!$**èé**$àa**879**8dsa!': [{
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
                '!!!!**!! sa\\**lk**djla sad': [{
                    string: '!!!!',
                    register: false
                }, {
                    string: '!! sa**lk',
                    register: true
                }, {
                    string: 'djla sad',
                    register: false
                }],
                '  !!!!!s**adsa**d!!!!': [{
                    string: '  !!!!!s',
                    register: false
                }, {
                    string: 'adsa',
                    register: true
                }, {
                    string: 'd!!!!',
                    register: false
                }],
                '!!!**!**!!!sadas\\**das': [{
                    string: '!!!',
                    register: false
                }, {
                    string: '!',
                    register: true
                }, {
                    string: '!!!sadas**das',
                    register: false
                }],
            };
            for ( var string in testStrings ) {
                expect( plugin.register( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
