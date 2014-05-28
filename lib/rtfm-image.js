
var rtfm = require( '../lib/rtfm' );

var image = rtfm.InlinePlugin.extend({

    register: function( string ) {
        var regEx = new RegExp( /\[([^:]*)?:?([^\]]*)\]/g );
        if ( regEx.test( string ) ) {            
            string = string.replace( regEx, function( match ) {
                var ps = Array.prototype.slice.call( arguments, 1, -2 ),
                    offset = arguments[ ps.length + 1 ];

                // If we have more than 2 matches, we don't know how to handle
                // it (would be strange). If we have less, we don't handle it at
                // all.
                if ( ps.length === 2 ) {
                    // Make sure it's not being escaped.
                    if ( string[ offset - 1 ] === '\\' ) {
                        // Add a flag, so we can easily remove the preceding slash
                        // later.
                        return '::::REMOVE_PRECEDING_SLASH::::' + match;
                    } else {
                        var alt, path;
                        // If the second parentheses cought someting, it means
                        // the first is the alt text. Else, there's no defined
                        // alt text.
                        if ( ps[ 1 ].length ) {
                            alt = ps[ 0 ];
                            path = ps[ 1 ];
                        } else {
                            alt = '';
                            path = ps[ 0 ];
                        }
                        return '::::SPLIT::::' + alt + '::::ALT::::' + path + '::::SPLIT::::';
                    }
                }
                return match;
            });

            // Cleanup.
            string = string.replace( '\\::::REMOVE_PRECEDING_SLASH::::', '' );

            var split = string.split( '::::SPLIT::::' );

            if ( split.length > 1 ) {
                var registered = false,
                    elements = [];
                for ( var i = 0, len = split.length; i < len; ++i ) {
                    elements.push({
                        string: split[ i ],
                        register: registered
                    });
                    registered = !registered;
                }
                return elements;
            }
        }
        return false;
    }

});

module.exports = image;
