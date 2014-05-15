
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
 *
 * @param {String} name
 *              The name of the plugin.
 * @param {Object} plugin
 *              The plugin itself, which should extend
 *              rtfm.BlockPlugin.
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

/**
 * Register an inline plugin.
 *
 * Register a plugin for an inline element.
 *
 * @param {String} name
 *              The name of the plugin.
 * @param {Object} plugin
 *              The plugin itself, which should extend
 *              rtfm.InlinePlugin.
 */
rtfm.registerInlinePlugin = function( name, plugin ) {
    if ( this.inlinePlugins === undefined ) {
        this.inlinePlugins = {};
    }

    this.inlinePlugins[ name ] = plugin;

    return this;
}

/**
 * Find inline plugins.
 *
 * Find the inline plugins that want to have a say in the rendering
 * of the passed string. If no plugin is interested, returns false.
 *
 * This function recursively constructs a tree of inline elements,
 * each being part of one array. Each array item contains an object
 * with a 'string', 'children' and a 'inlinePlugin' key. This will be used by the
 * parser to construct the final output.
 *
 * @param {String} string
 *
 * @returns {Object}|null
 */
rtfm.findInlinePlugins = function( string ) {
    var parts = [],
        result, merge;

    // Iterate through all registered inline plugins.
    for ( var plugin in rtfm.inlinePlugins ) {
        // Get the result from the register method for this plugin.
        // If it returns a non-null value, we know at least one plugin
        // is interested. Get the parts, and recursively check if any other
        // plugins have a saying for the sub parts.
        result = rtfm.inlinePlugins[ plugin ].register( string );
        if ( result ) {
            // Iterate over the different parts of the string. For the ones
            // that are flagged as registered, store them, and recursively
            // check for other plugins. For the others, we give the other
            // plugins the opportunity to register them as well, concatenating
            // the results (instead of adding them as children).
            for ( var i = 0, len = result.length; i < len; ++i ) {
                // This part was registered. Store it, and check if there
                // are any children (there is always at least one plain/text
                // child).
                if ( result[ i ].register ) {
                    parts.push({
                        string: result[ i ].string,
                        inlinePlugin: plugin,
                        children: rtfm.findInlinePlugins( result[ i ].string )
                    });
                } else {
                    // Check if other plugins are interested, at this same level,
                    // to register a part of a string.
                    merge = rtfm.findInlinePlugins( result[ i ].string );
                    parts = parts.concat( merge );
                }
            }
        } else {
            parts.push({
                string: string,
                inlinePlugin: 'plain/text'
            });
        }
    }

    return parts.length ? parts : null;
}

module.exports = rtfm;
