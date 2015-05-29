qx.Class.define("PlusView", {
    
    extend : View,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('plusView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // add buttons
            that.addRequestBtn = $("<div />");
            that.addRequestBtn.addClass('btn addRequestBtn');
            that.addRequestBtn.append('?');
            that.view.append(that.addRequestBtn);

            that.addOfferBtn = $("<div />");
            that.addOfferBtn.addClass('btn addOfferBtn');
            that.addOfferBtn.append('!');
            that.view.append(that.addOfferBtn);
            
            // plus button
            that.plusBtn = $("<div />");
            that.plusBtn.addClass('btn plusBtn');
            that.view.append(that.plusBtn);
            
            $('body').append(that.view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.listen('mapclicked', function(){
                that.close();
            });

            // that.plusBtn.click(function(){
            //    that.$addOfferBtn.addClass('active');
            // });
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        }
    }

});