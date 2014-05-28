
var bold = require( '../rtfm-bold' );

var boldHtml = bold.extend({
    
    output: function( string ) {
        return '<strong>' + string + '</strong>';
    }

});

module.exports = boldHtml;
