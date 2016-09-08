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

				// tooltip
				var thePopper;
				langBtn.hover(
					function(){
					  thePopper = new Popper(
							langBtn,
							{
								content: that.getWording('lan_' + lang, lang) + ' (' + that.getWording('lan_' + lang) + ')'
								// contentType: 'html'
							},
							{
								placement: 'top',
								removeOnDestroy: true
							}
						);
					},
					function(){
						thePopper.destroy();
					}
				);

				langBtn.click(function(){
					that.say('languageChanged', lang);
				});

				that.buttons.push( {el: langBtn, lang: lang} );

				that.view.append(langBtn);
			});
			
			$('#main-container').append(that.view);

			this.base(arguments);

			that.load();
		},

		load: function(){
			var that = this;

			_.each( that.buttons, function(btn){
				if( btn.el.hasClass( APP.getLM().getCurrentLang() ) )
					btn.el.addClass('active');
			});

		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;

			// reset all buttons
			_.each( that.buttons, function(btn) {
				btn.el.removeClass('active');
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