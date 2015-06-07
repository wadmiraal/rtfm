
var codeBlock = require( '../../lib/md/rtfm-codeblock-md' );

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
                '{{{poidsa': '````\npoidsa',
                '{{{poidsa}}}': '````\npoidsa\n````',
                'poidsa}}}': 'poidsa\n````',
                '{{{\npoidsa': '````\npoidsa',
                '{{{\npoidsa\n}}}': '````\npoidsa\n````',
                'poidsa\n}}}': 'poidsa\n````',
                '{{{\n\n\npoidsa': '````\n\n\npoidsa',
                '{{{\n\n\npoidsa\n\n\n}}}': '````\n\n\npoidsa\n\n\n````',
                'poidsa\n\n\n}}}': 'poidsa\n\n\n````',
                '{{{\n\n\npoidsa\n\n\n}}}   ': '````\n\n\npoidsa\n\n\n````',
            };

            for ( var string in testStrings ) {
                expect( plugin.output( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
