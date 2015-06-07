#!/usr/bin/env node

"use strict"

var fs = require( 'fs' ),
    path = require( 'path' );

var lib = path.join( path.dirname( fs.realpathSync( __filename ) ), '../lib' );


if ( process.argv.length > 2 ) {
    var inputFile = process.argv[ 2 ];

    if ( fs.existsSync( inputFile) ) {
        var content = fs.readFileSync( inputFile, 'utf8' );
        console.log('done');
    } else {
        console.log( "File does not exist - " + inputFile );
    }
} else {
    console.error( "Please provide an input file as the first argument." );
}
