qx.Class.define("APPAFEEFA", {
    extend : Daddy,
    type: "singleton",

    // extend: "Daddy",

    construct: function(){
        var that = this;

        that.setTitle('Afeefa.de - Networking platform for refugees and supporters');
        that.setDataManager(new DataManager());
        that.setRouter(new Router());
        that.setLM(new LanguageManager());

        that.setConfig(
            {
                languages: ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'],
                categories: [
                    {
                        name: 'language',
                        id: '1',
                        sub: [
                            { name: 'german-course', id: '1-1' },
                            { name: 'learning-place', id: '1-2' },
                            { name: 'tandem', id: '1-3' }
                        ]
                    },
                    {
                        name: 'medic',
                        id: '2',
                        sub: [
                            { name: 'a', id: '2-1' },
                            { name: 'b', id: '2-2' },
                            { name: 'c', id: '2-3' }
                        ]
                    },
                    {
                        name: 'jobs',
                        id: '3',
                        sub: [
                            { name: 'a', id: '3-1' },
                            { name: 'b', id: '3-2' },
                            { name: 'c', id: '3-3' }
                        ]

                    },
                    {
                        name: 'consultation',
                        id: '4',
                        sub: [
                            { name: 'a', id: '4-1' },
                            { name: 'b', id: '4-2' },
                            { name: 'c', id: '4-3' }
                        ]
                    },
                    {
                        name: 'leisure',
                        id: '5',
                        sub: [
                            { name: 'a', id: '5-1' },
                            { name: 'b', id: '5-2' },
                            { name: 'c', id: '5-3' }
                        ]
                    },
                    {
                        name: 'community',
                        id: '6',
                        sub: [
                            { name: 'network', id: '6-1' },
                            { name: 'meeting-place', id: '6-2' },
                            { name: 'welcome-festival', id: '6-3' },
                            { name: 'workshop-room', id: '6-4' }
                        ]
                    },
                    {
                        name: 'donation',
                        id: '7',
                        sub: [
                            { name: 'a', id: '7-1' },
                            { name: 'b', id: '7-2' },
                            { name: 'c', id: '7-3' }
                        ]
                    }
                ],
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