qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.addEvents();
        }
    }

});