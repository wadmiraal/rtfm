
var code = require( '../lib/rtfm-code' );

describe( 'rtfm code plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( code ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new code();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new code();
            var testStrings = [
                '098{!!po}idsa',
                '$èé$\\{{àa879}8dsa!',
                '?!!!!{!! sa}lkdjla sad',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new code();
            var testStrings = {
                '!!po{{id}}sa': [{
                    string: '!!po',
                    register: false
                }, {
                    string: 'id',
                    register: true
                }, {
                    string: 'sa',
                    register: false
                }],
                '!${{èé}}$àa{{879}}8dsa!': [{
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
                '{{!! sa\\{{lk}}djla sad': [{
                    string: '',
                    register: false
                }, {
                    string: '!! sa{{lk',
                    register: true
                }, {
                    string: 'djla sad',
                    register: false
                }],
                '{{!! sa\\{{lk}}': [{
                    string: '',
                    register: false
                }, {
                    string: '!! sa{{lk',
                    register: true
                }, {
                    string: '',
                    register: false
                }],
                '!!!!{{!! sa\\{{lk}}djla sad': [{
                    string: '!!!!',
                    register: false
                }, {
                    string: '!! sa{{lk',
                    register: true
                }, {
                    string: 'djla sad',
                    register: false
                }],
                '!!!!{{!! sb\\}}lk}}djla sad': [{
                    string: '!!!!',
                    register: false
                }, {
                    string: '!! sb}}lk',
                    register: true
                }, {
                    string: 'djla sad',
                    register: false
                }],
                '  !!!!!s{{adsa}}d!!!!': [{
                    string: '  !!!!!s',
                    register: false
                }, {
                    string: 'adsa',
                    register: true
                }, {
                    string: 'd!!!!',
                    register: false
                }],
                '  !!!!!s{{adsa}}d!!\\}}!!': [{
                    string: '  !!!!!s',
                    register: false
                }, {
                    string: 'adsa',
                    register: true
                }, {
                    string: 'd!!}}!!',
                    register: false
                }],
                '!!!{{!}}!!!sadas\\{{das': [{
                    string: '!!!',
                    register: false
                }, {
                    string: '!',
                    register: true
                }, {
                    string: '!!!sadas{{das',
                    register: false
                }],
                'a code example {{\\{{code here\\}}}} that contains the {{\\{{tags\\}}}}': [{
                    string: 'a code example ',
                    register: false
                }, {
                    string: '{{code here}}',
                    register: true
                }, {
                    string: ' that contains the ',
                    register: false
                }, {
                    string: '{{tags}}',
                    register: true
                }, {
                    string: '',
                    register: false
                }],
                'a non-closed {{code sample': [{
                    string: 'a non-closed ',
                    register: false
                }, {
                    string: 'code sample',
                    register: true
                }]
            };
            for ( var string in testStrings ) {
                expect( plugin.register( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
