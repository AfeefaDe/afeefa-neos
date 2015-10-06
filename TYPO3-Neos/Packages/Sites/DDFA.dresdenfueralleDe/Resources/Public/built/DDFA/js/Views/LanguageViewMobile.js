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

            // menu button
            that.rootBtn  = $("<div />");
            that.rootBtn.addClass('root-btn');
            // that.rootBtn.click(function(){
            //     that.view.toggleClass('open');
            // });
            that.view.append(that.rootBtn);

            that.menu  = $("<div />");
            that.menu.attr('id', 'lang-menu');
            that.view.append(that.menu);

            that.buttons = [];

            // add other language buttons
            _.each( APP.getConfig().languages, function(lang){
                var langBtn = $("<div />");
                langBtn.addClass('btn ' + lang);

                langBtn.click(function(){
                    that.say('languageChanged', lang);
                    that.close();
                });

                that.buttons.push(langBtn);

                that.menu.append(langBtn);
            });
            
            $('#main-container').append(that.view);

            that.addEvents();
            
            that.load();
        },

        load: function(){
            var that = this;
            
            that.rootBtn.addClass( APP.getLM().getCurrentLang() );
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);

            that.rootBtn.click(function(){
                $('#main-container').addClass('shifted-small');
                that.say('languageMenuOpened');
            });

            that.listen('curtainclicked', function(){
                that.close();
            });
            
            // interferring with other left shifting menus
            that.listen('mainMenuOpened', function(){
                that.menu.addClass('hidden');
            });
            that.listen('shiftMenuClosed', function(){
                that.menu.removeClass('hidden');
            });

        },

        reset: function(){
            var that = this;

            // reset root btn
            _.each( APP.getConfig().languages, function(lang){
                that.rootBtn.removeClass(lang);
            });

        },

        close: function(){
            var that = this;

            $('#main-container').removeClass('shifted-small');
            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
            that.say('shiftMenuClosed');
        }
    }

});