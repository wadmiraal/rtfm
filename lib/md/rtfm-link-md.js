
var link = require( '../rtfm-link' );

var linkMarkdown = link.extend({
    
    output: function( string ) {
        var parts = string.split( '::::ALT::::' );
        if ( parts[ 0 ].length ) {
            return '[' + parts[ 0 ] + '](' + parts[ 1 ] + ')';
        } else {
            return '(' + parts[ 1 ] + ')';
        }
    }

});

module.exports = linkMarkdown;
