qx.Class.define("LanguageManager", {
    extend : Daddy,
    type: "singleton",

    construct: function(){
        var that = this;

    },

    properties : {
        bib: {},
        currentLang: {}
    },

    members : {
        

        init: function( cb ){
            var that = this;

            var browserLang = navigator.language.split('-')[0];
            if( _.contains( APP.getConfig().languages, browserLang) )
                that.setCurrentLang( browserLang );
            else
                that.setCurrentLang( APP.getConfig().languages[0] );

            $('body').addClass(that.getCurrentLang());
            
            that.addEvents();
        },

        // param (key, [locale])
        // @key bib key
        // @locale get wording in a specific ignoring the current app language
        resolve: function( key, locale ){
            var that = this;

            if( that.getBib()[ key ] === undefined ) return 'XXX';
            
            var wording;
            if(locale)
                wording = that.getBib()[ key ][ locale ];
            else
                wording = that.getBib()[ key ][ that.getCurrentLang() ];

            // if( wording && _.contains(['ar', 'fa', 'ur'], that.getCurrentLang() ) ){
            //     // reverse string
                
            // }

            if(!wording) wording = that.getBib()[ key ][ APP.getConfig().languages[1] ];
            if(!wording) wording = that.getBib()[ key ][ APP.getConfig().languages[0] ];
            if(!wording) wording = 'XXX';

            return wording;
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(e){
                
                that.setCurrentLang( e.customData );
                
                APP.getDataManager().fetchAllData(function( data ){
                  that.say('fetchedNewData');
                });

                _.each(APP.getConfig().languages, function(lang){
                    $('body').removeClass(lang);
                });
                
                $('body').addClass(that.getCurrentLang());
                
                $('body').attr('lang', that.getCurrentLang());

            });
        }

    }

});