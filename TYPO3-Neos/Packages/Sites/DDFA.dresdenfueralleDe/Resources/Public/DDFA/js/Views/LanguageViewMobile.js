qx.Class.define("LanguageViewMobile", {
    
    extend : LanguageView,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('languageViewMobile');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            that.shiftMenu  = $("<div />");
            that.shiftMenu.addClass('shiftMenu');
            that.view.append(that.shiftMenu);

            that.rootBtn  = $("<div />");
            that.rootBtn.addClass('btn root-btn');
            that.rootBtn.click(function(){
                that.view.toggleClass('open');
            });
            that.view.append(that.rootBtn);

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
                    
                    that.view.removeClass('open');
                    // if( that.view.hasClass('open') ){

                    //     $('#map-curtain').addClass('active');
                    // }
                    // else {
                    //     $('#map-curtain').removeClass('active');
                    // }

                });

                that.buttons.push(langBtn);

                that.shiftMenu.append(langBtn);
            });
            
            $('#main-container').append(that.view);

            that.addEvents();
            
            that.load();
        },

        load: function(){
            var that = this;

            that.rootBtn.addClass( APP.getLM().getCurrentLang() );
        },

        // addEvents: function(){
        //     var that = this;

        //     // call superclass
        //     this.base(arguments);

        // },

        reset: function(){
            var that = this;

            // reset root btn
            _.each( APP.getConfig().languages, function(lang){
                that.rootBtn.removeClass(lang);
            });

        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        }
    }

});