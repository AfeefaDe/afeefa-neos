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
            $('#main-container').append(that.view);

            // menu
            that.menu  = $("<div />");
            that.menu.attr('id', 'main-menu');
            that.view.append(that.menu);

            // logo
            var a = $('<a />')
                .attr('href', 'https://afeefa.de')
                .attr('id', 'logo');
            that.logo  = $('<img />').attr({
                'src': APP.getConfig().imgPath + 'afeefa_light.svg',
                alt: 'Afeefa Logo',
                title: 'Afeefa Logo'
            });
            a.append(that.logo);
            that.menu.append(a);
            
            // btn refugee guide
            // that.refugeeBtn = $('<div />').addClass('item refugee-guide');
            // that.refugeeLBtnLabel = $('<span />');
            // that.refugeeBtn.append(that.refugeeLBtnLabel);
            // that.menu.append(that.refugeeBtn);

            // btn supporter guide
            // that.supporterBtn = $('<div />').addClass('item supporter-guide');
            // that.supporterBtnLabel = $('<span />');
            // that.supporterBtn.append(that.supporterBtnLabel);
            // that.menu.append(that.supporterBtn);
            
            
            // btn about
            that.aboutBtn = $('<div />').addClass('item about');
            that.aboutBtnLabel = $('<a />')
                .attr('href', 'https://about.afeefa.de')
                .attr('target', '_blank');
            that.aboutBtn.append(that.aboutBtnLabel);
            that.menu.append(that.aboutBtn);

            // btn press
            that.pressBtn = $('<div />').addClass('item press');
            that.pressBtnLabel = $('<span />');
            that.pressBtn.append(that.pressBtnLabel);
            that.menu.append(that.pressBtn);

            // btn imprint
            that.imprintBtn = $('<div />').addClass('item imprint');
            that.imprintBtnLabel = $('<span />');
            that.imprintBtn.append(that.imprintBtnLabel);
            that.menu.append(that.imprintBtn);

            // btn facebook
            that.facebookBtn = $('<div />').addClass('item facebook');
            that.facebookBtnLabel = $('<a />')
                .attr('href', 'https://www.facebook.com/afeefa.de')
                .attr('target', '_blank');
            that.facebookBtn.append(that.facebookBtnLabel);
            that.menu.append(that.facebookBtn);

            // logo
            var a = $('<a />').attr({
                'id': 'dfa-logo',
                'href': 'http://dresdenfueralle.de',
                'target': '_blank'
            });
            that.dfaLogo  = $('<img />').attr({
                'src': APP.getConfig().imgPath + 'icon_37.svg',
                alt: 'Dresden für Alle Logo',
                title: 'Dresden für Alle Logo'
            });
            a.append(that.dfaLogo);
            that.menu.append(a);

            // fb like btn
            // that.menu.append('<div class="fb-like" data-href="https://www.facebook.com/afeefa.de" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>');

            this.base(arguments);
    	},

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            // that.refugeeBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
            // });

            // that.supporterBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().supporterGuide );
            // });

            // that.aboutBtn.click(function(){
            //     that.close();
            //     APP.getIncludeView().load( APP.getIncludeView().getIncludes().about );
            // });

            that.pressBtn.click(function(){
                that.close();
                APP.getIncludeView().load('press');
            });

            that.imprintBtn.click(function(){
                that.close();
                APP.getIncludeView().load('imprint');
            });

            that.listen('curtainclicked', function(){
                that.close();
            });

            that.listen('mainMenuBtnClicked', function(){
                that.load();
            });

            // interferring with other left shifting menus
            that.listen('languageMenuOpened', function(){
                that.menu.addClass('hidden');
            });

            that.listen('shiftMenuClosed', function(){
                that.menu.removeClass('hidden');
            });
            
            // that.listen('includeViewClosed', function(){
            //     that.load();    
            //     that.say('mainMenuOpened');
            // });

            ////////////////////
            // swipe gestures //
            ////////////////////
            var hammer = new Hammer(that.view[0]);
            hammer.on('swipeleft', function(ev){
                that.close();
            });

        },

        load: function(){
            var that = this;

            that.reset();

            $('#main-container').addClass('shifted');

            that.aboutBtnLabel.append( that.getWording('menu.about') );
            that.pressBtnLabel.append( that.getWording('menu.press') );
            that.imprintBtnLabel.append( that.getWording('menu.imprint') );
            that.facebookBtnLabel.append( that.getWording('menu.facebook') );

        },

        reset: function(){
            var that = this;

            that.aboutBtnLabel.empty();
            that.pressBtnLabel.empty();
            that.imprintBtnLabel.empty();
            that.facebookBtnLabel.empty();

        },

        close: function(){
            var that = this;

            $('#main-container').removeClass('shifted');
        },

        changeLanguage: function(){
            var that = this;
        }
    }

});