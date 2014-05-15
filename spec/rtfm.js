

var rtfm = require( '../lib/rtfm' );

describe( 'rtfm', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( rtfm ).toBeDefined();
        });

        it( 'its methods are chainable', function() {
            expect( rtfm.reset().registerBlockPlugin( 'plugin', {} ).registerInlinePlugin( 'plugin', {} ) ).toEqual( rtfm );
        });

        it( 'can be reset', function() {
            rtfm.registerBlockPlugin( 'plugin', {} );
            rtfm.registerInlinePlugin( 'plugin', {} );
            expect( rtfm.blockPlugins.plugin ).toBeDefined();
            expect( rtfm.inlinePlugins.plugin ).toBeDefined();

            rtfm.reset();
            expect( rtfm.blockPlugins.plugin ).not.toBeDefined();
            expect( rtfm.inlinePlugins.plugin ).not.toBeDefined();
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
                register: function( string ) {
                    return [{
                        plugin: 'plugin',
                        string: string
                    }];
                }
            };
            rtfm.registerBlockPlugin( 'plugin', plugin );
            expect( rtfm.findBlockPlugins( 'String' ) ).toEqual([{
                plugin: 'plugin',
                string: 'String'
            }]);
        });

    });

    describe( 'When registering an inline plugin', function() {

        it( 'should be stored', function() {
            var plugin = {};
            rtfm.registerInlinePlugin( 'plugin', plugin );
            expect( rtfm.inlinePlugins.plugin ).toBeDefined();
        });

        it( 'should be registered for specific strings', function() {
            var plugin = mock.createInlinePlugin();
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

    describe( 'When constructing a syntax tree', function() {

        it( 'should work, dammit', function() {
            var string = 'My first block\n\n   My second *bold text* containing block';
            var expected = {
                originalString: string,
                blocks: [
                    {
                        blockString: 'My first block',
                        blockPlugin: 'plugin',
                        children: [{
                            string: 'My first block',
                            inlinePlugin: 'plain/text'
                        }]
                    },
                    {
                        blockString: 'My second *bold text* containing block',
                        blockPlugin: 'plugin',
                        children: [
                            {
                                string: 'My second ',
                                inlinePlugin: 'plain/text'
                            },
                            {
                                string: 'bold text',
                                inlinePlugin: 'bold',
                                children: [{
                                    string: 'bold text',
                                    inlinePlugin: 'plain/text'
                                }]
                            },
                            {
                                string: ' containing block',
                                inlinePlugin: 'plain/text'
                            }
                        ]
                    }
                ]
            };

            rtfm.reset();

            var blockPlugin = {
                register: function( string ) {
                    return [{
                        plugin: 'plugin',
                        string: string
                    }];
                },
                output: function( string ) {
                    return '<p>' + string + '</p>';
                }
            };
            rtfm.registerBlockPlugin( 'plugin', blockPlugin );

            var inlinePlugin = mock.createInlinePlugin();
            rtfm.registerInlinePlugin( 'bold', inlinePlugin );

            expect( rtfm.constructTree( string ) ).toEqual( expected );
        });

    });

    describe( 'When rendering an array of inline elements', function() {

        it( 'should construct the string', function() {
            var inlinePlugin = mock.createInlinePlugin();
            rtfm.registerInlinePlugin( 'bold', inlinePlugin );
            var elements = [
                {
                    string: 'My second ',
                    inlinePlugin: 'plain/text'
                },
                {
                    string: 'bold text',
                    inlinePlugin: 'bold',
                    children: [{
                        string: 'bold text',
                        inlinePlugin: 'plain/text'
                    }]
                },
                {
                    string: ' containing block',
                    inlinePlugin: 'plain/text'
                }
            ];
            expect( rtfm.outputInlineElements( elements ) ).toEqual( 'My second <strong>bold text</strong> containing block' );
        });

    });

    var mock = {
        createInlinePlugin: function() {
            return {
                register: function( string ) {
                    var parts = string.split( '*' ),
                        elements = [],
                        registered = false;

                    if (  parts.length === 1 ) {
                        return false;
                    }

                    for ( var i = 0, len = parts.length; i < len; ++i ) {
                        elements.push({
                            string: parts[ i ],
                            register: registered
                        });
                        registered = !registered;
                    }

                    return elements;
                },
                output: function( string ) {
                    return '<strong>' + string + '</strong>';
                }
            };
        }
    };

});