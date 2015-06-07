
var code = require( '../rtfm-code' );

var codeMarkdown = code.extend({
    
    output: function( string ) {
        return '`' + string + '`';
    }

});

module.exports = codeMarkdown;
