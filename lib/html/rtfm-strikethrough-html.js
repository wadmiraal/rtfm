
var strikeThrough = require( '../rtfm-strikethrough' );

var strikeThroughHtml = strikeThrough.extend({
    
    output: function( string ) {
        return '<del>' + string + '</del>';
    }

});

module.exports = strikeThroughHtml;
