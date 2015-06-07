
var rtfm = require( '../lib/rtfm' );

var codeBlock = rtfm.BlockPlugin.extend({

    register: function( string ) {
        if ( /^\s*(\{\{\{|\}\}\}$)/.test( string ) ) {
            return [{
                plugin: 'rtfm-codeBlock',
                string: string
            }];
        }

        return false;
    }

});

module.exports = codeBlock;
