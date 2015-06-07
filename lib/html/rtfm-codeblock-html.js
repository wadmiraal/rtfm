
var codeBlock = require( '../rtfm-codeblock' );

var codeBlockHtml = codeBlock.extend({
    
    output: function( string ) {
        return string
                .replace( /^[\t ]*\{{3,}\n?/, '<pre><code>\n' )
                .replace( /\n?[\t ]*\}{3,}\s*$/, '\n</code></pre>' );
    }

});

module.exports = codeBlockHtml;
