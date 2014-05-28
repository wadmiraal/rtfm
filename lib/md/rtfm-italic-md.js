
var italic = require( '../rtfm-italic' );

var italicMarkdown = italic.extend({
    
    output: function( string ) {
        return '*' + string + '*';
    }

});

module.exports = italicMarkdown;
