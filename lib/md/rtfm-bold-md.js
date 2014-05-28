
var bold = require( '../rtfm-bold' );

var boldMarkdown = bold.extend({
    
    output: function( string ) {
        return '**' + string + '**';
    }

});

module.exports = boldMarkdown;
