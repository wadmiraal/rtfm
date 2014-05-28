
var rtfm = require( '../lib/rtfm' );

var bold = rtfm.InlinePlugin.extend({

    register: function( string ) {
        this.pattern = '**';
        return rtfm.InlinePlugin.prototype.register.call( this, string )
    }

});

module.exports = bold;
