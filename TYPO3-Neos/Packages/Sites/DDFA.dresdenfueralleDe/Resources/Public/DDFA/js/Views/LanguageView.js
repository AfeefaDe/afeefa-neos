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

            that.buttons = [];

            // add root button
            // that.rootBtn = $("<div />");
            // that.rootBtn.addClass('btn root-btn ' + APP.getLM().getCurrentLang() );
            // that.view.append(that.rootBtn);
            // that.buttons.push(that.rootBtn);

            // add other language buttons
            // var remainingLanguages = _.without( APP.getConfig().languages, APP.getLM().getCurrentLang() );
            // _.each( remainingLanguages, function(lang){
            _.each( APP.getConfig().languages, function(lang){
                var langBtn = $("<div />");
                langBtn.addClass('btn ' + lang);

                langBtn.click(function(){
                    that.say('languageChanged', lang);
                });

                that.buttons.push(langBtn);

                that.view.append(langBtn);
            });
            
            $('#main-container').append(that.view);

            this.base(arguments);

            that.load();
        },

        load: function(){
            var that = this;

            _.each( that.buttons, function(btn){
                if( btn.hasClass( APP.getLM().getCurrentLang() ) )
                    btn.addClass('active');
            });

        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);

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

        reset: function(){
            var that = this;

            // reset all buttons
            _.each( that.buttons, function(btn) {
                btn.removeClass('active');
            });

        },

        changeLanguage: function(){
            var that = this;

            that.reset();
            that.load();
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        }
    }

});