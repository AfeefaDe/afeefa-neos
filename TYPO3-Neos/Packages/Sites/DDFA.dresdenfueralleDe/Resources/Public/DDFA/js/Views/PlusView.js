qx.Class.define("PlusView", {
    
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
            view.attr('id', 'plusView');

            // add buttons
            var addRequestBtn = $("<div />");
            addRequestBtn.addClass('btn addRequestBtn');
            addRequestBtn.append('?');
            view.append(addRequestBtn);

            var addOfferBtn = $("<div />");
            addOfferBtn.addClass('btn addOfferBtn');
            addOfferBtn.append('!');
            view.append(addOfferBtn);
            
            // plus button
            var plusBtn = $("<div />");
            plusBtn.addClass('btn plusBtn');
            plusBtn.append('+');
            view.append(plusBtn);
            
    		
            $('body').append(view);
    	},

        addEvents: function(){
            var that = this;

            // that.plusBtn.click(function(){
            //    that.$addOfferBtn.addClass('active');
            // });
        }
    }

});