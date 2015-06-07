
var code = require( '../rtfm-code' );

var codeHtml = code.extend({
    
    output: function( string ) {
        return '<code>' + string + '</code>';
    }

});

module.exports = codeHtml;
