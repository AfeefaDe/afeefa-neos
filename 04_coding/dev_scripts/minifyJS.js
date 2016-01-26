// -------------------------
// Utility tasks with the help of node
// -------------------------

/*	
	notes
		~ node needs to be installed
		~ also all node modules, that are required further down, need to be installed from command line: 'npm install modulename'	
	#1
		~ run this script from cmd to start all utility tasks:
		'node "[path]\script.js'
*/

// ---------------------------
//	minify + compress
// ---------------------------

// install from cmd: 'npm install uglify-js'
var UglifyJS = require("uglify-js");

// ---------------------------
//	combine scripts
// ---------------------------

// ...