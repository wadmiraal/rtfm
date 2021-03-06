
/**
 * Main parser namespace.
 *
 * @param {String} string
 *              String to parse and convert.
 *
 * @return {String}
 *              The converted string.
 */
var rtfm = function( string ) {
    var tree = rtfm.constructTree( string );
    return rtfm.output( tree );
}

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
 * Find the block plugins that want to register the passed string.
 * If a plugin is interested, it must return the block in form of
 * an array of registration objects. This usually contains only one
 * item, with the name of the plugin and the entire block string, but
 * can also be used by list style blocks to register an entire block
 * for several plugins (like an ordered list).
 *
 * If no plugin is found, returns false.
 *
 * @param {String} string
 *
 * @returns {Object}|false
 */
rtfm.findBlockPlugins = function( string ) {
    var result;
    for ( var plugin in this.blockPlugins ) {
        if ( result = this.blockPlugins[ plugin ].register( string ) ) {
            return result;
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
 * @returns {Object}|false
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

    return parts.length ? parts : false;
}

/**
 * Constructs a syntax tree.
 *
 * Constructs a tree of block elements, containing a sub tree
 * of inline elements (with leafs being plain/text elements).
 *
 * @param {String} string
 *              The string to parse. Expects it to be already
 *              normalized.
 *
 * @returns {Object}
 */
rtfm.constructTree = function( string ) {
    var blocks = rtfm.blockify( string ),
        blockDefinitions = [];

    for ( var i = 0, iLen = blocks.length; i < iLen; ++i ) {
        var registeredBlocks = this.findBlockPlugins( blocks[ i ] );
        for ( var j = 0, jLen = registeredBlocks.length; j < jLen; ++j ) {
            blockDefinitions.push({
                blockString: registeredBlocks[ j ].string,
                blockPlugin: registeredBlocks[ j ].plugin,
                children: this.findInlinePlugins( registeredBlocks[ j ].string )
            });
        }
    }

    var tree = {
        originalString: string,
        blocks: blockDefinitions,
    };

    return tree;
}

/**
 * Outputs the syntax tree as a string.
 *
 * Goes recursively through the syntax tree, constructing
 * the desired output. If a document plugin is provided, the
 * result will be passed through its 'output' method before
 * being returned. Otherwise, only the end result is returned.
 *
 * @param {Object} tree
 * @param {Object} documentPlugin
 *
 * @returns {String}
 */
rtfm.output = function( tree, documentPlugin ) {
    var string = '',
        blockString;

    for ( var i = 0, len = tree.blocks.length; i < len; ++i ) {
        blockString = this.outputInlineElements( tree.blocks[ i ].children );
        string += this.blockPlugins[ tree.blocks[ i ].blockPlugin ].output( blockString );
    }

    return documentPlugin !== undefined ? documentPlugin.output( string ) : string;
}

/**
 * Outputs the inline sub-tree.
 *
 * Recursively goes through the inline element
 * tree and renders it.
 *
 * @param {Array} elements
 *
 * @returns {String}
 */
rtfm.outputInlineElements = function( elements ) {
    var string = '',
        subString;

    for ( var i = 0, len = elements.length; i < len; ++i ) {
        // If the plugin is plain/text, just output the string as is.
        if ( elements[ i ].inlinePlugin === 'plain/text' ) {
            string += elements[ i ].string;
        } else {
            // Else, recursively render the child elements.
            subString = this.outputInlineElements( elements[ i ].children );

            // Pas the result to the inline plugin for output.
            string += this.inlinePlugins[ elements[ i ].inlinePlugin ].output( subString );
        }
    }

    return string;
}

/**
 * Resets the module internals.
 */
rtfm.reset = function() {
    this.inlinePlugins = {};
    this.blockPlugins = {};

    return this;
}

/**
 * Extend helper.
 *
 * Helper method to extend an object or class.
 * Almost verbatim copy of Underscore and Backbone extend() methods.
 */
rtfm.extend = function( object ) {
    var inheritFrom = Array.prototype.slice.call( arguments, 1 );
    for ( var i = 0, len = inheritFrom.length; i < len; ++i ) {
      if ( inheritFrom[ i ] ) {
        for ( var prop in inheritFrom[ i ] ) {
          object[ prop ] = inheritFrom[ i ][ prop ];
        }
      }
    }

    return object;
};

/**
 * Plugin base class.
 *
 * All plugins inherit from this base class.
 * It defines "abstract" methods all plugins must implement.
 * This serves as the base class for rtfm.BlockPlugin as well
 * as rtfm.InlinePlugin.
 */
rtfm.Plugin = function() {
    // noop.
};

// Define the Plugin prototype.
rtfm.extend( rtfm.Plugin.prototype, {

    /**
     * Register a string.
     *
     * If a plugin decides to register a string, it must
     * return an array of parts that it's interested in.
     * Otherwise, it can just return false.
     *
     * @param {String} string
     *
     * @returns {Array}|false
     */
    register: function( string ) {
        return false;
    },

    /**
     * Output a string.
     *
     * Output the passed string, adding formatting if needed.
     *
     * @param {String} string
     *
     * @returns {String}
     */
    output: function( string ) {
        return string;
    }
});

// Define the Plugin static methods.
rtfm.extend( rtfm.Plugin, {

    /**
     * Extend the plugin with new methods and properties, creating a
     * new object.
     *
     * @param {Object} props
     *              A hash of properties to add to the new element
     *              prototype chain.
     *
     * @returns {Object}
     */
    extend: function( props ) {
        var _super = this.prototype,
            prototype = new this();

        rtfm.extend( prototype, props );

        // The dummy class constructor
        var Class = function() {};

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    }
});

/**
 * BlockPlugin base class.
 */
rtfm.BlockPlugin = rtfm.Plugin.extend({});

/**
 * InlinePlugin base class.
 */
rtfm.InlinePlugin = rtfm.Plugin.extend({

    register: function( string ) {
        if ( this.pattern === undefined ) {
            return false;
        }

        // If only JS supported zero-width negative look aheads...
        var split = string.split( new RegExp( this.pattern.replace( /(\*|\-|\\|\/)/g, '\\$1' ) ) )  ;

        if ( split.length > 1 ) {
            // We must ignore patterns that are escaped with \. But as JS has a limited
            // set of Regex abilities, we need to iterate over each part, make sure
            // it does not end with \. If it does, we append the next part to it.
            // We reconstruct a new array representing our split this way.
            var newSplit = [];
            for ( var i = -1, len = split.length - 1; i < len; ++i ) {
                // Was the next part supposed to be ignored ?
                if ( i >= 0 && /\\$/.test( split[ i ] ) ) {
                    newSplit[ newSplit.length - 1 ] += this.pattern + split[ i+1 ];
                } else {
                    newSplit.push( split[ i+1 ].replace( /\\$/, '') );
                }
            }

            if ( newSplit.length > 1 ) {
                var registered = false,
                    elements = [];
                for ( var i = 0, len = newSplit.length; i < len; ++i ) {
                    elements.push({
                        string: newSplit[ i ],
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

module.exports = rtfm;
