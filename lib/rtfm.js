
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

/**
 * Register a block plugin.
 *
 * Register a plugin for a block element.
 */
rtfm.registerBlockPlugin = function( name, plugin ) {
    if ( this.blockPlugins === undefined ) {
        this.blockPlugins = {};
    }

    this.blockPlugins[ name ] = plugin;

    return this;
}

/**
 * Find block plugin.
 *
 * Find the block plugin that want to register the passed string.
 * If no plugin is found, returns false.
 *
 * @param {String} string
 *
 * @returns {Object}|false
 */
rtfm.findBlockPlugin = function( string ) {
    for ( var plugin in this.blockPlugins ) {
        if ( this.blockPlugins[ plugin ].register( string ) ) {
            return this.blockPlugins[ plugin ];
        }
    }

    return false;
}

module.exports = rtfm;
