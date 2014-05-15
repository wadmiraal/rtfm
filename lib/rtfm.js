
/**
 * Main parser namespace.
 */
var rtfm = {};

rtfm.normalize = function( string ) {
    return string.replace( /\r\n/g, '\n' ).replace( /\r/g, '\n' );
}

rtfm.blockify = function( string ) {
    return [];
}

module.exports = rtfm;
