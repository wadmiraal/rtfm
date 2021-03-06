
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
            var tree = mock.createSyntaxTree();

            rtfm.reset();

            rtfm.registerBlockPlugin( 'plugin', mock.createBlockPlugin() );
            rtfm.registerInlinePlugin( 'bold', mock.createInlinePlugin() );

            expect( rtfm.constructTree( tree.originalString ) ).toEqual( tree );
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

    describe( 'When rendering a syntax tree', function() {

        it( 'should also work dammit', function() {
            var tree = mock.createSyntaxTree();

            rtfm.reset();

            rtfm.registerBlockPlugin( 'plugin', mock.createBlockPlugin() );
            rtfm.registerInlinePlugin( 'bold', mock.createInlinePlugin() );

            expect( rtfm.output( tree ) ).toEqual( '<p>My first block</p><p>My second <strong>bold text</strong> containing block</p>' );

            var documentPlugin = {
                output: function( string ) {
                    return '<body>' + string + '</body>';
                }
            }

            expect( rtfm.output( tree, documentPlugin ) ).toEqual( '<body><p>My first block</p><p>My second <strong>bold text</strong> containing block</p></body>' );
        });

    });

    describe( 'When extending the base rtfm.Plugin', function() {

        it( 'it should expose new properties and methods', function() {
            var NewPlugin = rtfm.Plugin.extend({}),
                plugin = new NewPlugin();

            expect( NewPlugin ).toBeDefined();
            expect( NewPlugin.extend ).toBeDefined();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'When extending the base rtfm.BlockPlugin', function() {

        it( 'it should expose new properties and methods', function() {
            var NewPlugin = rtfm.BlockPlugin.extend({}),
                plugin = new NewPlugin();

            expect( NewPlugin ).toBeDefined();
            expect( NewPlugin.extend ).toBeDefined();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'When extending the base rtfm.InlinePlugin', function() {

        it( 'it should expose new properties and methods', function() {
            var NewPlugin = rtfm.InlinePlugin.extend({}),
                plugin = new NewPlugin();

            expect( NewPlugin ).toBeDefined();
            expect( NewPlugin.extend ).toBeDefined();
            expect( plugin.register ).toBeDefined();
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
        },

        createSyntaxTree: function() {
            return {
                originalString: 'My first block\n\n   My second *bold text* containing block',
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
        }
    };

});