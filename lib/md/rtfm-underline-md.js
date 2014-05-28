
var underline = require( '../rtfm-underline' );

var underlineMarkdown = underline.extend({
    
    output: function( string ) {
        return '<span style="text-decoration:underline;">' + string + '</span>';
    }

});

module.exports = underlineMarkdown;
