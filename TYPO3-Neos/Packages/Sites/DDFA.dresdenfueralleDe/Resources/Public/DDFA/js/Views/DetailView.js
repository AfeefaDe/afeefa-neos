qx.Class.define("DetailView", {
    
    extend : qx.core.Object,
	type: "singleton",

    construct: function(){
    	var that = this;

    	that.render();
    },

    members : {
        
    	render: function(){
    		var that = this;

    		$('body').append('<div id="detailView"></div>');
    	}
    }

});