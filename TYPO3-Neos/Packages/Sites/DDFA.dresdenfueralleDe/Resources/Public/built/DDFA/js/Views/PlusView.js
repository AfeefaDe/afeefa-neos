qx.Class.define("PlusView", {
    
    extend : View,
	type: "singleton",

    properties: {
        propertiesMarket: {},
        propertiesFeedback: {},
        inputTypes: {}
    },

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
            that.feedbackBtn = $("<div />");
            that.feedbackBtn.addClass('btn feedbackBtn');
            that.view.append(that.feedbackBtn);

            that.requestBtn = $("<div />");
            that.requestBtn.addClass('btn requestBtn');
            that.view.append(that.requestBtn);

            that.offerBtn = $("<div />");
            that.offerBtn.addClass('btn offerBtn');
            that.view.append(that.offerBtn);
            
            // plus button
            that.plusBtn = $("<div />");
            that.plusBtn.addClass('btn plusBtn');
            that.view.append(that.plusBtn);
            
            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            // that.listen('mapclicked', function(){
            //     that.close();
            // });
            
            that.offerBtn.click(function(){
               APP.getFormView().load( APP.getFormView().getFormTypes().marketOffer );
            });
            
            that.requestBtn.click(function(){
               APP.getFormView().load( APP.getFormView().getFormTypes().marketRequest );
            });

            that.feedbackBtn.click(function(){
               APP.getFormView().load( APP.getFormView().getFormTypes().feedback );
            });

            ///////////////////////
            // bootstrap tooltip //
            ///////////////////////
            that.offerBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_newMarketOffer')
            });
            that.requestBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_newMarketRequest')
            });
            that.feedbackBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_feedback')
            });

        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.requestBtn.css('display', 'none');
            // that.offerBtn.css('display', 'none');
        },

        changeLanguage: function(){
            var that = this;

            ///////////////////////
            // bootstrap tooltip //
            ///////////////////////
            that.offerBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_newMarketOffer')
            });
            that.requestBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_newMarketRequest')
            });
            that.feedbackBtn.attr({
                // 'data-toggle': 'tooltip',
                // 'data-placement': "left",
                'title': that.getWording('form_feedback')
            });
        }
    }

});