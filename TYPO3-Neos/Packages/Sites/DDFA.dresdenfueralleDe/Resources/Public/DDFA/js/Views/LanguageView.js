qx.Class.define("LanguageView", {
    
    extend : View,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('languageView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // plus button
            that.rootBtn = $("<div />");
            that.rootBtn.addClass('btn root-btn ' + APP.getLM().getCurrentLang() );
            that.view.append(that.rootBtn);

            // add language buttons
            var remainingLanguages = _.without( APP.getConfig().languages, APP.getLM().getCurrentLang() );
            _.each( remainingLanguages, function(lang){
                var langBtn = $("<div />");
                langBtn.addClass('btn ' + lang);

                langBtn.click(function(){
                    that.say('languageChanged', lang);
                });

                that.view.append(langBtn);
            });
            
            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // that.listen('mapclicked', function(){
            //     that.close();
            // });

            // that.plusBtn.click(function(){
            //     $('#main-container').toggleClass('shifted');
            // });

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