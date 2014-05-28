
var link = require( '../lib/rtfm-link' );

describe( 'rtfm link plugin', function() {

    describe( 'when loaded', function() {

        it( 'it is defined', function() {
            expect( link ).toBeDefined();
        });

        it( 'can correctly be instanciated', function() {
            var plugin = new link();
            expect( plugin.register ).toBeDefined();
        });

    });

    describe( 'when registering a string', function() {

        it( 'ignores strings it should not handle', function() {
            var plugin = new link();
            var testStrings = [
                '098*!!po)idsa',
                '$èé$\\(àa879)8dsa!',
                '?!!!!(!! sa*lkdjla sad',
            ];
            for ( var i = 0, len = testStrings.length; i < len; ++i ) {
                expect( plugin.register( testStrings[ i ] ) ).toEqual( false );
            }
        });

        it( 'registers strings it should handle', function() {
            var plugin = new link();
            var testStrings = {
                '!!po(id)sa': [{
                    string: '!!po',
                    register: false
                }, {
                    string: '::::ALT::::id',
                    register: true
                }, {
                    string: 'sa',
                    register: false
                }],
                '!$(èé:$àa)879(8dsa!': [{
                    string: '!$',
                    register: false
                }, {
                    string: 'èé::::ALT::::$àa',
                    register: true
                }, {
                    string: '879(8dsa!',
                    register: false
                }],
                '!!!!(!! sa**lk**:djl/a/?"&!: s:)ad': [{
                    string: '!!!!',
                    register: false
                }, {
                    string: '!! sa**lk**::::ALT::::djl/a/?"&!: s:',
                    register: true
                }, {
                    string: 'ad',
                    register: false
                }],
                '  !!!!!s\\(ads:a**)d(!!!!)': [{
                    string: '  !!!!!s(ads:a**)d',
                    register: false
                }, {
                    string: '::::ALT::::!!!!',
                    register: true
                }, {
                    string: '',
                    register: false
                }],
                '!!!(!**!!!:sadas\\**)d(as)': [{
                    string: '!!!',
                    register: false
                }, {
                    string: '!**!!!::::ALT::::sadas\\**',
                    register: true
                }, {
                    string: 'd',
                    register: false
                }, {
                    string: '::::ALT::::as',
                    register: true
                }, {
                    string: '',
                    register: false
                }],
                '!!!(!**!!!:sadas\\**)(as)': [{
                    string: '!!!',
                    register: false
                }, {
                    string: '!**!!!::::ALT::::sadas\\**',
                    register: true
                }, {
                    string: '',
                    register: false
                }, {
                    string: '::::ALT::::as',
                    register: true
                }, {
                    string: '',
                    register: false
                }],
                '(èé $à;.asd :http://lk/asdasd.dom/a87-_98d?a=&asd)(èé $à;.asd :file:\\\\/lk/asdasd.dom/a87-_98d?a=&asd)sad': [{
                    string: '',
                    register: false
                }, {
                    string: 'èé $à;.asd ::::ALT::::http://lk/asdasd.dom/a87-_98d?a=&asd',
                    register: true
                }, {
                    string: '',
                    register: false
                }, {
                    string: 'èé $à;.asd ::::ALT::::file:\\\\/lk/asdasd.dom/a87-_98d?a=&asd',
                    register: true
                }, {
                    string: 'sad',
                    register: false
                }]
            };
            for ( var string in testStrings ) {
                expect( plugin.register( string ) ).toEqual( testStrings[ string ] );
            }
        });

    });

});
