

var rtfm = require( '../lib/rtfm' );

describe( 'rtfm', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( rtfm ).toBeDefined();
        });

        it( 'its methods are chainable', function() {
            expect( rtfm.registerBlockPlugin( 'plugin', {} ).registerInlinePlugin( 'plugin', {} ) ).toEqual( rtfm );
        });

    });

    describe( 'when normalizing a string', function() {

        it( 'should standardize all new lines and returns', function() {
            var tests = {
                'Hi all\nyou\npeople.': 'Hi all\nyou\npeople.',
                'Hi all\nyou\rpeople.': 'Hi all\nyou\npeople.',
                'Hi all\ryou\rpeople.': 'Hi all\nyou\npeople.',
                'Hi all\ryou\r\npeople.': 'Hi all\nyou\npeople.',
                'Hi all\r\nyou\r\npeople.': 'Hi all\nyou\npeople.',
                'Hi all\ryou\n\rpeople.': 'Hi all\nyou\n\npeople.'
            }

            for ( var string in tests ) {
                expect( rtfm.normalize( string ) ).toEqual( tests[ string ] );
            }
        });

    });

    describe( 'When blockifying a string', function() {

        it( 'should split all paragraphs and return an array', function() {
            var tests = {
                'Hi all': [ 'Hi all' ],
                'Hi\nall': [ 'Hi\nall' ],
                'Hi\n\nall': [ 'Hi', 'all' ],
                'Hi\n\n\nall': [ 'Hi', 'all' ],
                '     Hi\nall': [ 'Hi\nall' ],
                '    Hi\n\n\n    all': [ 'Hi', 'all' ],
                'Hi\n\n\nall\n\nthere\n\n   people': [ 'Hi', 'all', 'there', 'people' ]
            };

            for ( var string in tests ) {
                expect( rtfm.blockify( string ) ).toEqual( tests[ string ] );
            }
        });

    });

    describe( 'When registering a block plugin', function() {

        it( 'should be stored', function() {
            var plugin = {};
            rtfm.registerBlockPlugin( 'plugin', plugin );
            expect( rtfm.blockPlugins.plugin ).toBeDefined();
        });

        it( 'should be registered for specific blocks', function() {
            var plugin = {
                register: function( string ) { return true; }
            };
            rtfm.registerBlockPlugin( 'plugin', plugin );
            expect( rtfm.findBlockPlugin( 'String' ) ).toEqual( plugin );
        });

    });

    describe( 'When registering an inline plugin', function() {

        it( 'should be stored', function() {
            var plugin = {};
            rtfm.registerInlinePlugin( 'plugin', plugin );
            expect( rtfm.inlinePlugins.plugin ).toBeDefined();
        });

        it( 'should be registered for specific strings', function() {
            var plugin = {
                register: function( string ) {
                    if ( string === '*bold*' ) {
                        return [
                            { string: '', register: false },
                            { string: 'bold', register: true },
                            { string: '', register: false }
                        ];
                    }
                }
            };
            rtfm.registerInlinePlugin( 'plugin', plugin );
            expect( rtfm.findInlinePlugins( '*bold*' ) ).toEqual([
                {
                    string: '',
                    inlinePlugin: 'plain/text'
                },
                {
                    string: 'bold',
                    inlinePlugin: 'plugin',
                    children: [{
                        string: 'bold',
                        inlinePlugin: 'plain/text'
                    }]
                },
                {
                    string: '',
                    inlinePlugin: 'plain/text'
                }
            ]);
        });

    });

});