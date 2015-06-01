qx.Class.define("MenuView", {
    
    extend : View,
	type: "singleton",

    construct: function(){
    	var that = this;

        that.setViewId('menuView');
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // menu button
            that.menuBtn = $("<div />");
            that.menuBtn.addClass('menu-btn');
            that.view.append(that.menuBtn);

            // menu
            that.menu  = $("<div />");
            that.menu.attr('id', 'main-menu');
            that.view.append(that.menu);

            // logo
            var a = $('<a />').attr('href', 'http://afeefa.de');
            that.logo  = $('<img />').attr('src', APP.getConfig().imgPath + 'afeefa_light.svg');
            that.logo.attr('id', 'logo');
            a.append(that.logo);
            that.menu.append(a);
            
            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.menuBtn.click(function(){
                $('#main-container').addClass('shifted');
                that.say('mainMenuOpened');
            });
            
            that.listen('curtainclicked', function(){
                $('#main-container').removeClass('shifted');
            });

            // interferring with other left shifting menus
            that.listen('languageMenuOpened', function(){
                that.menu.addClass('hidden');
            });
            that.listen('shiftMenuClosed', function(){
                that.menu.removeClass('hidden');
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