
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

            stride += string[ i ];

            // If we find a valid opening tag, we start a new stride
            // and add everything we had till now the previous part.
            if ( /.?\{\{/.test( part ) ) {
                // Make sure it was not escaped.
                if ( /[^\\]\{\{/.test( part ) || /^\{\{/.test( part ) ) {
                    // If the first character was not our pattern, add it to
                    // the stride.
                    console.log('AAAA part:', part, 'stride:', stride)
                    if ( !/^\{/.test( part ) ) {
                        stride += part[ 0 ];
                    }
                    console.log('BBBB part:', part, 'stride:', stride)

                    // Already opened?
                    if ( open ) {
                        parts[ parts.length-1 ] += stride;
                    } else {
                        parts.push( stride );
                    }

                    open = true;
                    stride = '';
                } else {
                    // Remove the escape character, and put the tag there again.
                    stride = stride.substring( 0, stride.length-1 );
                    stride += '{{';
                }

                // Skip 2 characters ahead, even if it was escaped.
                i += 2;
                continue;
            } else if ( open && /[^\\]?\}\}/.test( part ) ) {
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

        console.log( string, parts )

        if ( parts.length > 1 ) {
            var registered = /^\{\{/.test( string ),
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
