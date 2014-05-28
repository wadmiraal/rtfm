
var underline = require( '../rtfm-underline' );

var underlineHtml = underline.extend({
    
    output: function( string ) {
        return '<u>' + string + '</u>';
    }

});

module.exports = underlineHtml;
