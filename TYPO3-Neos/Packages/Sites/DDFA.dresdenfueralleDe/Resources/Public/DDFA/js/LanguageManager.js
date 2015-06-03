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

        resolve: function( key ){
            var that = this;

            var wording = that.getBib()[ that.getCurrentLang() ][ key ];
            
            if(!wording) wording = that.getBib()[ APP.getConfig().languages[1] ][ key ];
            if(!wording) wording = that.getBib()[ APP.getConfig().languages[0] ][ key ];
            if(!wording) wording = 'XXX';

            return wording;
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(e){
                
                that.setCurrentLang( e.customData );
                
                APP.getDataManager().fetchAllData(function( data ){

                  console.debug('fetchedAllData in ' + that.getCurrentLang(), data);

                  APP.setData(data);

                  that.say('fetchedNewData');

                });

                _.each(APP.getConfig().languages, function(lang){
                    $('body').removeClass(lang);
                });
                
                $('body').addClass(that.getCurrentLang());

            });
        }

    }

});