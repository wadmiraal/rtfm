
var headings = require( '../rtfm-headings' );

var headingsMarkdown = headings.extend({
    
    output: function( string ) {
        var matches = string.match( /^\s*(\!{1,6})/ );

        if ( matches[ 1 ] !== undefined ) {
            var replace = ' ';
            for ( var i = 0, len = 7 - matches[ 1 ].length; i < len; ++i ) {
                replace = '#' + replace;
            }

            return string.replace( /^\s*\!{1,6}\s*/, replace );
        }

        return string; // @todo - error of some sorts ?
    }

});

module.exports = headingsMarkdown;
