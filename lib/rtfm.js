
/**
 * Main parser namespace.
 */
var rtfm = {};

/**
 * Normalize a string newlines.
 *
 * Normalize new lines from a string to UNIX new lines.
 * This facilitates the block parsing.
 *
 * @param {String} string
 *
 * @returns {String}
 */
rtfm.normalize = function( string ) {
    return string.replace( /\r\n/g, '\n' ).replace( /\r/g, '\n' );
}

/**
 * Blockify a string.
 *
 * Split a string into block elements. Returns an array.
 *
 * @param {String} string
 *
 * @returns {Array}
 */
rtfm.blockify = function( string ) {
    return string
                .split( /\n{2,}/ )
                .map( function( element ) {
                    return element.trim();  
                });
}

module.exports = rtfm;
