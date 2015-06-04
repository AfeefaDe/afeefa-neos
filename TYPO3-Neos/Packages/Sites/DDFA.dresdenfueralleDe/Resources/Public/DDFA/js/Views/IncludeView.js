qx.Class.define("IncludeView", {
    
    extend : View,
	type: "singleton",

    properties: {
    },

    construct: function(){
    	var that = this;

        that.setViewId('includeView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // legend
            that.legend  = $("<div />");
            that.legend.attr('id', 'legend');
            that.view.append(that.legend);

            $('#main-container').append(that.view);

            this.base(arguments);

            that.load();
    	},

        load: function(){
            var that = this;

        },

        reset: function(){
            var that = this;

        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            // that.menuBtn.click(function(){
            //     $('#main-container').addClass('shifted-left');
            // });

            // that.listen('curtainclicked', function(){
            //     $('#main-container').removeClass('shifted-left');
            // });
            
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        },

        changeLanguage: function(){
            var that = this;

            that.reset();
            that.load();
        }
    }

});