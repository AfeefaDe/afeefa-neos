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
                languages: ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur'],
                categories: ["advice", "medic", "german", "jobs", "leisure", "translation", "kids", "donation", "community", "housing", "church", "mosque", "synagogue"],
                simpleProperties: ['speaker', 'spokenLanguages', 'phone', 'mail', 'web', 'openingHours', 'description'],
                imgPath: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/img/'
            }
        );
    },

    properties : {
        title: {},
        DataManager: {},
        Router: {},
        LM: {},
        data: {},
        detailView: {},
        menuView: {},
        plusView: {},
        languageView: {},
        userDevice: {},
        config: {},
        currentLang: {}
    },

    members : {
        

        init: function( cb ){
            var that = this;
            
            // analyse user device
            that.detectUserDevice();

            // analyse user language
            that.getLM().init();

            // fetch necessary data
            that.getDataManager().fetchAllData(function( data ){
              console.debug('fetchedAllData', data);

              that.setData(data);

              cb();
            });
        },

        detectUserDevice: function(){
            var that = this;

            // analyse user device
            $('body').restive({
                breakpoints: ['768', '1280'],
                classes: ['768-c', '1280-c'],
                force_dip: true
            });
            if( $('body').hasClass('768-c') ) APP.setUserDevice('phone');
            else if( $('body').hasClass('1280-c') ) APP.setUserDevice('tablet');
            else APP.setUserDevice('desktop');

            $('body').addClass( APP.getUserDevice() );
        }
    }

});