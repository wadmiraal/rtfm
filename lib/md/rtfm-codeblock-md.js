
var codeBlock = require( '../rtfm-codeblock' );

var codeBlockMarkdown = codeBlock.extend({
    
    output: function( string ) {
        return string
                .replace( /^[\t ]*\{{3,}\n?/, '````\n' )
                .replace( /\n?[\t ]*\}{3,}\s*$/, '\n````' );
    }

});

module.exports = codeBlockMarkdown;
