
var rtfm = require( '../lib/rtfm' );

var underline = rtfm.InlinePlugin.extend({

    register: function( string ) {
        this.pattern = '__';
        return rtfm.InlinePlugin.prototype.register.call( this, string );
    }

});

module.exports = underline;
