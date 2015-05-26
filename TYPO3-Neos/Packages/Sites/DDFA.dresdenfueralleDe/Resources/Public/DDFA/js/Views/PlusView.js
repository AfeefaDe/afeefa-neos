qx.Class.define("PlusView", {
    
    extend : View,
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
            that.addRequestBtn = $("<div />");
            that.addRequestBtn.addClass('btn addRequestBtn');
            that.addRequestBtn.append('?');
            view.append(that.addRequestBtn);

            that.addOfferBtn = $("<div />");
            that.addOfferBtn.addClass('btn addOfferBtn');
            that.addOfferBtn.append('!');
            view.append(that.addOfferBtn);
            
            // plus button
            var plusBtn = $("<div />");
            plusBtn.addClass('btn plusBtn');
            view.append(plusBtn);
            
            $('body').append(view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

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