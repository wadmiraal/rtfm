
var rtfm = require( '../lib/rtfm' );

var strikeThrough = rtfm.InlinePlugin.extend({

    register: function( string ) {
        this.pattern = '--';
        return rtfm.InlinePlugin.prototype.register.call( this, string );
    }

});

module.exports = strikeThrough;
