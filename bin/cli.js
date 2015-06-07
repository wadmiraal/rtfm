#!/usr/bin/env node

"use strict";

var fs = require( 'fs' ),
    path = require( 'path' ),
    lib = path.join( path.dirname( fs.realpathSync( __filename ) ), '../lib' ),
    rtfm = require( lib + '/rtfm' );

if ( process.argv.length > 2 ) {
    var inputFile = process.argv[ 2 ],
        format = process.argv[3] !== undefined ? process.argv[3] : 'html',
        plugins;

    switch ( format ) {
        case 'html':
        case 'md':
            var plugins = {
                    inline: [
                        'bold',
                        'code',
                        'image',
                        'italic',
                        'link',
                        'strikeThrough',
                        'underline'
                    ],
                    block: [
                        'codeBlock',
                        'headings'
                    ]
                },
                definition;

            for ( var type in plugins ) {
                for (var i = plugins[ type ].length-1; i >= 0; --i) {
                    definition = require( lib + '/' + format + '/rtfm-' + plugins[ type ][ i ].toLowerCase() + '-' + format );
                    switch ( type ) {
                        case 'inline':
                            rtfm.registerInlinePlugin( plugins[ type ][ i ], definition );
                            break;

                        case 'block':
                            rtfm.registerBlockPlugin( plugins[ type ][ i ], definition );
                            break;
                    }
                }
            }
            break;

        default:
            console.error( "The format '" + format + "' is not supported." );
            return 1;
    }

    if ( fs.existsSync( inputFile) ) {
        var content = fs.readFileSync( inputFile, 'utf8' );
        console.log( rtfm( content ) );
    } else {
        console.log( "File does not exist - " + inputFile );
    }
} else {
    console.error( "Please provide an input file as the first argument." );
}
