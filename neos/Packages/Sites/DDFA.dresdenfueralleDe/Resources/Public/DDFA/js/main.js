require.config({

    // baseUrl: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/js',

    paths: {
        modernizr: '../../H5BP/js/vendor/modernizr-2.8.3.min',
        domReady: '../../requirejs/domReady',
        jquery: '../../jquery/jquery-2.2.2.min',
        perfectScrollbarJQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.7/js/min/perfect-scrollbar.jquery.min',
        momentjs: '../../momentjs/moment.min',
        restive: '../../restive/restive.min',
        qx: '../../qooxdoo/qx-oo-4.1.min',
        underscore: '../../underscore/underscore-min',
        hammerjs: '../../hammerjs/hammer.min',
        mapbox: 'https://api.mapbox.com/mapbox.js/v3.0.1/mapbox',
        mc: '../../leafletPlugins/leaflet.markercluster',
        popper: '../../popperjs/popper.min',
        d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.0/d3',
        materialize: '../../materialize/js/materialize'
    },

    // define dependencies via shim because of use of old javascript libs, which do not define a module and therefore do not define their dependencies themselves (defined modules in javascript define other dependencies)
    shim: {
        // 'mapbox': {
        // //     These script dependencies should be loaded before loading
        // //     mapbox.js
        //     deps: ['underscore', 'jquery'],
        // //     Once loaded, use the global 'L' as the
        // //     module value.
        //     exports: 'L'
        // },
        
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

    // enforceDefine: true,

    waitSeconds: 0	// disable "Load timeout for modules" error
});

// define(function (require) {
    // var domReady = require('domReady');
    require([
        // requiring here loads the mentioned file as well as its dependencies defined via shim (see above)
        'domReady',
        'APPAFEEFA',
        'DataManager',
        'Router',
        'LanguageManager',
        'Utility',
        'Views/MapView',
        'Views/SearchView',
        'Views/DetailView',
        'Views/MenuView',
        'Views/LegendView',
        'Views/LanguageView',
        'Views/PlusView',
        'Views/FormView',
        'Views/IncludeView',
        'Views/MessageView',
        'Views/IntroView'
    ], function(domReady){

        // if dependencies don't become available everywhere within the app, then define them here again as global var
        Hammer = require('hammerjs');
        Popper = require('popper');
        // d3 = require('d3');
        
        domReady(function () {
            APP = new APPAFEEFA();


            APP.init(function () {
                if (APP.getUserDevice() === 'mobile') {
                    require(['Views/DetailViewMobile'], function () {
                        APP.getRouter().initialNavigate();
                    });
                } else {
                    APP.getRouter().initialNavigate();
                }

                APP.say('appInitialized');
            });
        });
    });
// });
