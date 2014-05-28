
var italic = require( '../rtfm-italic' );

var italicHtml = italic.extend({
    
    output: function( string ) {
        return '<em>' + string + '</em>';
    }

});

module.exports = italicHtml;
