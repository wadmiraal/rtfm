
var link = require( '../rtfm-link' );

var linkHtml = link.extend({
    
    output: function( string ) {
        var parts = string.split( '::::ALT::::' ),
            label;
            
        if ( parts[ 0 ].length ) {
            label = parts[ 0 ];
        } else {
            label = parts[ 1 ];
        }

        return '<a href="' + parts[ 1 ].replace( /"/g, '\\"' ) + '">' + label + '</a>';
    }

});

module.exports = linkHtml;
