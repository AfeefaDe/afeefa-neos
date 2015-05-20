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

    		// view container
            var view = $("<div />");
            view.attr('id', 'detailView');

            // heading
            var headingContainer = $("<div />");
            headingContainer.addClass('heading');
            
            that.heading = $("<h1 />");
            headingContainer.append(that.heading);
            
            view.append(headingContainer);

            
            $('body').append(view);
    	},

        load: function( entry ){
            var that = this;

            that.heading.empty().append(entry.name);
        }
    }

});