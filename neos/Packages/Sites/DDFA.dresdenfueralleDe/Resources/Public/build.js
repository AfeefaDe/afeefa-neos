/*
 * This is an example build file that demonstrates how to use the build system for
 * require.js.
 *
 * THIS BUILD FILE WILL NOT WORK. It is referencing paths that probably
 * do not exist on your machine. Just use it as a guide.
 *
 *
 */

({  
    //The top level directory that contains your app. If this option is used
    //then it assumed your scripts are in a subdirectory under this path.
    //This option is not required. If it is not specified, then baseUrl
    //below is the anchor point for finding things. If this option is specified,
    //then all the files from the app directory will be copied to the dir:
    //output area, and baseUrl will assume to be a relative path under
    //this directory.
    appDir: "./",

    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.
    baseUrl: 'DDFA/js',

    //By default all the configuration for optimization happens from the command
    //line or by properties in the config file, and configuration that was
    //passed to requirejs as part of the app's runtime "main" JS file is *not*
    //considered. However, if you prefer the "main" JS file configuration
    //to be read for the build so that you do not have to duplicate the values
    //in a separate configuration, set this property to the location of that
    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
    //or require.config({}) call found in that file will be used.
    //As of 2.1.10, mainConfigFile can be an array of values, with the last
    //value's config take precedence over previous values in the array.
    mainConfigFile: 'DDFA/js/main.js',

    modules: [
        {
            name: 'main'
        }
    ],
    
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,

    //Set paths for modules. If relative paths, set relative to baseUrl above.
    //If a special value of "empty:" is used for the path value, then that
    //acts like mapping the path to an empty file. It allows the optimizer to
    //resolve the dependency to path, but then does not include it in the output.
    //Useful to map module names that are to resources on a CDN or other
    //http: URL when running in the browser and during an optimization that
    //file should be skipped because it has no dependencies.
    paths: {
        modernizr: '../../H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: '../../requirejs/domReady',
        jquery: '../../jquery/jquery-2.2.2.min',
        perfectScrollbarJQuery: 'empty:',
        momentjs: '../../momentjs/moment.min',
        combodate: '../../combodate/combodate',
        restive: '../../restive/restive.min',
        qx: '../../qooxdoo/qx-oo-4.1.min',
        underscore: '../../underscore/underscore-min',
        hammerjs: '../../hammerjs/hammer.min',
        mapbox: 'empty:',
        // skip markercluster in building, because otherwise "L is not defined" in markercluster initialization (dont know why)
        mc: 'empty:',
        popper: '../../popperjs/popper.min',
        d3: 'empty:',
        materialize: 'empty:'
    },

    //Sets up a map of module IDs to other module IDs. For more details, see
    //the http://requirejs.org/docs/api.html#config-map docs.
    map: {},

    //Configure CommonJS packages. See http://requirejs.org/docs/api.html#packages
    //for more information.
    packages: [],

    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "./built",

    //As of RequireJS 2.0.2, the dir above will be deleted before the
    //build starts again. If you have a big build and are not doing
    //source transforms with onBuildRead/onBuildWrite, then you can
    //set keepBuildDir to true to keep the previous dir. This allows for
    //faster rebuilds, but it could lead to unexpected errors if the
    //built code is transformed in some way.
    keepBuildDir: false,

    //If shim config is used in the app during runtime, duplicate the config
    //here. Necessary if shim config is used, so that the shim's dependencies
    //are included in the build. Using "mainConfigFile" is a better way to
    //pass this information though, so that it is only listed in one place.
    //However, if mainConfigFile is not an option, the shim config can be
    //inlined in the build config.
    shim: {
        'mapbox': {
            exports: 'L'
        },

        "mc": ["mapbox"],

        // depending on jquery
        "restive": ["jquery"],
        'perfectScrollbarJQuery': ["jquery"],
        "materialize": ["hammerjs"],

        // app files
        "Daddy": ['qx', 'jquery', 'underscore', 'restive', 'perfectScrollbarJQuery', 'mapbox', 'mc', 'hammerjs', 'modernizr', 'popper', 'materialize'],
        'APPAFEEFA': ['Daddy'],
        'DataManager': ['APPAFEEFA'],
        'Router': ['APPAFEEFA'],
        'LanguageManager': ['APPAFEEFA'],
        'Utility': ['APPAFEEFA'],
        'Views/View': ['DataManager', 'Router', 'LanguageManager', 'Utility'],
        'Views/MapView': ['Views/View'],
        'Views/SearchView': ['Views/View'],
        'Views/DetailView': ['Views/View'],
        'Views/MenuView': ['Views/View'],
        'Views/LegendView': ['Views/View'],
        'Views/LanguageView': ['Views/View'],
        'Views/PlusView': ['Views/View'],
        'Views/FormView': ['Views/View'],
        'Views/IncludeView': ['Views/View'],
        'Views/MessageView': ['Views/View'],
        'Views/IntroView': ['Views/View']
    },

    //As of 2.1.11, shimmed dependencies can be wrapped in a define() wrapper
    //to help when intermediate dependencies are AMD have dependencies of their
    //own. The canonical example is a project using Backbone, which depends on
    //jQuery and Underscore. Shimmed dependencies that want Backbone available
    //immediately will not see it in a build, since AMD compatible versions of
    //Backbone will not execute the define() function until dependencies are
    //ready. By wrapping those shimmed dependencies, this can be avoided, but
    //it could introduce other errors if those shimmed dependencies use the
    //global scope in weird ways, so it is not the default behavior to wrap.
    //More notes in http://requirejs.org/docs/api.html#config-shim
    wrapShim: false,

    //Used to inline i18n resources into the built file. If no locale
    //is specified, i18n resources will not be inlined. Only one locale
    //can be inlined for a build. Root bundles referenced by a build layer
    //will be included in a build layer regardless of locale being set.
    locale: "en-us",

    //How to optimize all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code.
    //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: "uglify"
})
