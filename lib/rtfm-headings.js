
var rtfm = require( '../lib/rtfm' );

var headings = rtfm.BlockPlugin.extend({

    register: function( string ) {
        if ( /^\s*\!+/.test( string ) ) {
            return [{
                plugin: 'rtfm-headings',
                string: string
            }];
        }

        return false;
    }

});

module.exports = headings;