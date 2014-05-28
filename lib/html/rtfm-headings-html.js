
var headings = require( '../rtfm-headings' );

var headingHtml = headings.extend({
    
    output: function( string ) {
        var matches = string.match( /^\s*(\!{1,6})/ );

        if ( matches[ 1 ] !== undefined ) {
            var i = 7 - matches[ 1 ].length;
            return string.replace( /^\s*\!{1,6}\s*/, '<h' + i + '>' ) + '</h' + i + '>';
        }

        return string; // @todo - error of some sorts ?
    }

});

module.exports = headingHtml;
