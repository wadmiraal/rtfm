
var image = require( '../rtfm-image' );

var imageHtml = image.extend({
    
    output: function( string ) {
        var parts = string.split( '::::ALT::::' ),
            tag = '<img ';
            
        if ( parts[ 0 ].length ) {
            tag += 'alt="' + parts[ 0 ].replace( /"/g, '\\"' ) + '" ';
        }

        return tag + 'src="' + parts[ 1 ].replace( /"/g, '\\"' ) + '">';
    }

});

module.exports = imageHtml;
