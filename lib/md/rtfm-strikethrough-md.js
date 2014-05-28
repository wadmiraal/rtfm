
var strikeThrough = require( '../rtfm-strikethrough' );

var strikeThroughMarkdown = strikeThrough.extend({
    
    output: function( string ) {
        return '<del>' + string + '</del>';
    }

});

module.exports = strikeThroughMarkdown;
