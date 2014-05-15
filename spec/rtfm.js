

var rtfm = require( '../lib/rtfm' );

describe( 'rtfm', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( rtfm ).toBeDefined();
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
                'Hi\n\n\nall\n\nthere\n\n   people': [ 'Hi', 'all', 'there', 'poeple' ]
            };

            for ( var string in tests ) {
                expect( rtfm.blockify( string ) ).toEqual( tests[ string ] );
            }
        });

    });

});