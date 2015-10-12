qx.Class.define("APPDDFA", {
    extend : Daddy,
    type: "singleton",

    // extend: "Daddy",

    construct: function(){
        var that = this;

        that.setTitle('connecteDD');
        that.setDataManager(new DataManager());
        that.setRouter(new Router());
        that.setLM(new LanguageManager());

        that.setConfig(
            {
                languages: ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'],
                categoriesIni: ["consultation", "medic", "german", "jobs", "leisure", "translation", "children", "donation", "community"],
                categoriesMarket: ["consultation", "medic", "german", "jobs", "leisure", "translation", "children", "donation", "community"],
                categoriesEvent: [],
                categoriesBasic: ["housing", "christian", "islam", "jewish", 'public', 'wifi', 'shop'],
                simpleProperties: ['description', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'openingHours', 'dateFrom', 'dateTo'],
                imgPath: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/img/'
            }
        );

        that.setActiveFilter(null);
    },

    properties : {
        title: {},
        DataManager: {},
        Router: {},
        LM: {},
        data: {},
        mapView: {},
        detailView: {},
        menuView: {},
        legendView: {},
        plusView: {},
        languageView: {},
        formView: {},
        includeView: {},
        userDevice: {},
        config: {},
        currentLang: {},
        activeFilter: {}
    },

    members : {
        

        init: function( cb ){
            var that = this;
            
            // analyse user device
            that.detectUserDevice();

            // analyse user language
            that.getLM().init();

            var allData = {};

            // fetch only necessary data for app startup
            that.getDataManager().fetchInitialData(function( data ){
                
                console.debug('fetchedInitialData', data);
                cb();
                
            });

            // fetch other data (e.g. that takes a long time loading)
            that.getDataManager().getAllLocations(function(data){
                    
                allData.locations = data.locations;
                that.setData(allData);
                that.say('fetchedNewData');

            });
        },

        detectUserDevice: function(){
            var that = this;

            // analyse user device
            // $('body').restive({
            //     breakpoints: ['768', '1280'],
            //     classes: ['768-c', '1280-c'],
            //     force_dip: true
            // });

            // if( $('body').hasClass('768-c') ) APP.setUserDevice('phone');
            // else if( $('body').hasClass('1280-c') ) APP.setUserDevice('tablet');
            // else APP.setUserDevice('desktop');

            // $('body').addClass( APP.getUserDevice() );

            $('body').restive({
                  breakpoints: ['10000'],
                  classes: ['nb'],
                  turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_landscape=landscape'
            });

            APP.setUserDevice('desktop');
            if( $('body').hasClass('mobi') || $('body').hasClass('phone') ) APP.setUserDevice('mobile');
            if( $('body').hasClass('tablet') ) APP.setUserDevice('tablet');
            
            $('body').addClass( APP.getUserDevice() );
        }
    }

});