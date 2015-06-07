
var codeBlock = require( '../../lib/html/rtfm-codeblock-html' );

describe( 'rtfm codeBlock markdown plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( codeBlock ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new codeBlock();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when outputting a string', function() {

        it( 'it correctly converts it to markdown', function() {
            var plugin = new codeBlock();
            var testStrings = {
                '{{{poidsa': '<pre><code>\npoidsa',
                '{{{poidsa}}}': '<pre><code>\npoidsa\n</code></pre>',
                'poidsa}}}': 'poidsa\n</code></pre>',
                '{{{\npoidsa': '<pre><code>\npoidsa',
                '{{{\npoidsa\n}}}': '<pre><code>\npoidsa\n</code></pre>',
                'poidsa\n}}}': 'poidsa\n</code></pre>',
                '{{{\n\n\npoidsa': '<pre><code>\n\n\npoidsa',
                '{{{\n\n\npoidsa\n\n\n}}}': '<pre><code>\n\n\npoidsa\n\n\n</code></pre>',
                'poidsa\n\n\n}}}': 'poidsa\n\n\n</code></pre>',
                '{{{\n\n\npoidsa\n\n\n}}}   ': '<pre><code>\n\n\npoidsa\n\n\n</code></pre>',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
