
var codeBlock = require( '../lib/rtfm-codeblock' );

describe( 'rtfm codeBlock plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( codeBlock ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new codeBlock();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new codeBlock();
            var testStrings = [
                '098{{poidsa',
                '$èé$àa8798dsa{',
                '?{{{ salkdjla sad',
                '098}}poidsa',
                '$èé$àa8798dsa}',
                '?}}} salkdjla sad',
                '}}} a asldkj asd',
                '  }}}sadsad asdkjhsad kjhasd',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new codeBlock();
            var testStrings = [
                '{{{ a asldkj asd',
                '  {{{sadsad asdkjhsad kjhasd',
                '}}}',
                '  }}}',
                '\n\n  }}}',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).not.toEqual( false );
            }
        });

    });

});
