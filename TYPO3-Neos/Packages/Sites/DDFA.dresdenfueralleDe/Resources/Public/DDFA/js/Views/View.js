qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {}
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;
            
            that.addEvents();
        },

        getWording: function( key ){
            var that = this;

            return APP.getLM().resolve(key);
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
                that.changeLanguage();
            });
        },

        changeLanguage: function(){
            
        }
    }

});