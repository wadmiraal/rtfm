
var image = require( './rtfm-image' );

var link = image.extend({

    register: function( string ) {
        if ( this.regEx === undefined ) {
            this.regEx = new RegExp( /\(([^:]*)?:?([^\)]*)\)/g );
        }
        return image.prototype.register.call( this, string );
    }

});

module.exports = link;
