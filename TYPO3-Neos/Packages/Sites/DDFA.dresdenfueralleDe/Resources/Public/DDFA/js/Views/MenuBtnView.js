qx.Class.define("MenuBtnView", {
    
    extend : View,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('menuBtnView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // menu button
            that.menuBtn = $("<div />");
            that.menuBtn.addClass('btn');
            that.view.append(that.menuBtn);

            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.menuBtn.click(function(){
                $('#main-container').toggleClass('shifted');
            });
            
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        },

        changeLanguage: function(){
            var that = this;
        }
    }

});