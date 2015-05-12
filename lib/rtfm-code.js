
var rtfm = require( '../lib/rtfm' );

var code = rtfm.InlinePlugin.extend({

    register: function( string ) {
        var parts = [],
            stride = '',
            open = false,
            part;

        // We analyze the string, character by character. When we find an
        // unescaped opening tag, we start piling all the characters until we
        // find a unescaped closing tag.
        for ( var i = 0, len = string.length; i < len; ++i ) {
            // Construct a 3 character pattern.
            part = string[ i ];

            if ( string[ i+1 ] !== undefined ) {
                part += string[ i+1 ];
            }

            if ( string[ i+2 ] !== undefined ) {
                part += string[ i+2 ];
            }

            if ( !/^\{\{/.test( part ) ) {
                stride += string[ i ];
            }

            // If we find a valid opening tag, we start a new stride and add
            // everything we had until now the previous part.
            if ( /.?\{\{/.test( part ) ) {
                // Was the tag was escaped, or at the beginning of the string?
                if ( /[^\\]\{\{/.test( part ) || /^\{\{/.test( part ) ) {
                    if ( open ) {
                        // Already opened?
                        parts[ parts.length-1 ] += stride;
                    } else {
                        parts.push( stride );
                    }

                    open = true;
                    stride = '';

                    // Was the tag the first part?
                    if ( /^\{\{/.test( part ) ) {
                        // Skip 1 character ahead, because the tag was at the
                        // start of the string.
                        i += 1;
                        continue;
                    }
                } else {
                    // Remove the escape character, and put the tag there again.
                    stride = stride.substring( 0, stride.length-1 );
                    stride += '{{';
                }

                // Skip 2 characters ahead, even if it was escaped.
                i += 2;
                continue;
            } else if ( open && /[^\\]?\}\}/.test( part ) ) {
                if ( /[^\\]\}\}/.test( part ) ) {
                    // Remove the escape character, and put the tag there again.
                    stride = stride.substring( 0, stride.length-1 );
                    stride += '}}';
                }

                // If we find a closing tag, we close again and start anew.
                parts.push( stride );
                open = false;
                stride = '';

                // Skip 2 characters ahead.
                i += 2;
                continue;
            }
        }

        // Add the last part.
        parts.push( stride );

        if ( parts.length > 1 ) {
            var registered = false,
                elements = [];
            for ( i = 0, len = parts.length; i < len; ++i ) {
                elements.push({
                    string: parts[ i ],
                    register: registered
                });
                registered = !registered;
            }
            return elements;
        }

        return false;
    }

});

module.exports = code;
