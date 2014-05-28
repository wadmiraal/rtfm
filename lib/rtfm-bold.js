
var rtfm = require( '../lib/rtfm' );

var bold = rtfm.InlinePlugin.extend({

    register: function( string ) {
        // If only JS supported zero-width negative look aheads...
        var split = string.split( /\*\*/g );

        if ( split.length > 1 ) {
            // We must ignore ** that are escaped with \. But as JS has a limited
            // set of Regex abilities, we need to iterate over each part, make sure
            // it does not end with \. If it does, we append the next part to it.
            // We reconstruct a new array representing our split this way.
            var newSplit = [];
            for ( var i = -1, len = split.length - 1; i < len; ++i ) {
                // Was the next part supposed to be ignored ?
                if ( i >= 0 && /\\$/.test( split[ i ] ) ) {
                    newSplit[ newSplit.length - 1 ] += '**' + split[ i+1 ];
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

module.exports = bold;
