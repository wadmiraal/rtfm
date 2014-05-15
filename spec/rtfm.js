

var rtfm = require( '../lib/rtfm' );

describe( 'rtfm', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( rtfm ).toBeDefined();
        });

        it( 'its methods are chainable', function() {
            expect( rtfm
                        .reset()
                        .registerBlockPlugin( 'plugin', {} )
                        .registerInlinePlugin( 'plugin', {} )
            ).toEqual( rtfm );
        });

        it( 'can be reset', function() {
            rtfm.registerBlockPlugin( 'plugin1', {} );
            rtfm.registerInlinePlugin( 'plugin2', {} );
            expect( rtfm.blockPlugins.plugin1 ).toBeDefined();
            expect( rtfm.inlinePlugins.plugin2 ).toBeDefined();

            rtfm.reset();
            expect( rtfm.blockPlugins.plugin1 ).not.toBeDefined();
            expect( rtfm.inlinePlugins.plugin2 ).not.toBeDefined();
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
            rtfm.registerBlockPlugin( 'plugin', {} );
            expect( rtfm.blockPlugins.plugin ).toBeDefined();
        });

        it( 'should be registered for specific blocks', function() {
            rtfm.registerBlockPlugin( 'plugin', mock.createBlockPlugin() );
            expect( rtfm.findBlockPlugins( 'String' ) ).toEqual([{
                plugin: 'plugin',
                string: 'String'
            }]);
        });

    });

    describe( 'When registering an inline plugin', function() {

        it( 'should be stored', function() {
            rtfm.registerInlinePlugin( 'plugin', {} );
            expect( rtfm.inlinePlugins.plugin ).toBeDefined();
        });

        it( 'should be registered for specific strings', function() {
            rtfm.registerInlinePlugin( 'plugin', mock.createInlinePlugin() );
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

            rtfm.registerBlockPlugin( 'plugin', mock.createBlockPlugin() );
            rtfm.registerInlinePlugin( 'bold', mock.createInlinePlugin() );

            expect( rtfm.constructTree( string ) ).toEqual( expected );
        });

    });

    describe( 'When rendering an array of inline elements', function() {

        it( 'should construct the string', function() {
            rtfm.registerInlinePlugin( 'bold', mock.createInlinePlugin() );
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
        },

        createBlockPlugin: function() {
            return {
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
        }
    };

});