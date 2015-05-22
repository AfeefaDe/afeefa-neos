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
            that.view = $("<div />");
            that.view.attr('id', 'detailView');

            // heading
            var headingContainer = $("<div />");
            headingContainer.addClass('heading');
            
            that.heading = $("<h1 />");
            headingContainer.append(that.heading);
            
            that.view.append(headingContainer);

            
            $('body').append(that.view);
    	},

        load: function( entry ){
            var that = this;

            // already loaded > close
            if(that.entry === entry) {
                that.entry = null;
                that.view.hide();
                return;              
            }
            
            that.entry = entry;
            that.heading.empty().append(entry.name);


            that.view.show();
        }
    }

});