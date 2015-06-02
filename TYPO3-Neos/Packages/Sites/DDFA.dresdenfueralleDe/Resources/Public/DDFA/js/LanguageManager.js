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

            if( _.contains(APP.getConfig().languages, navigator.language) )
                that.setCurrentLang( navigator.language );
            else
                that.setCurrentLang( that.getConfig().languages[0] );

            $('body').addClass(that.getCurrentLang());
            
            that.addEvents();
        },

        resolve: function( key ){
            var that = this;

            return that.getBib()[ that.getCurrentLang() ][ key ];
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(e){
                
                that.setCurrentLang( e.customData );
                
                APP.getDataManager().fetchAllData(function( data ){

                  console.debug('fetchedAllData in ' + that.getCurrentLang(), data);

                  APP.setData(data);

                });

                _.each(APP.getConfig().languages, function(lang){
                    $('body').removeClass(lang);
                });
                
                $('body').addClass(that.getCurrentLang());

            });
        }

    }

});