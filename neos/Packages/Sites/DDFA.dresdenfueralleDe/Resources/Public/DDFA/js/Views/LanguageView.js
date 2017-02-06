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

			// that.buttons = [];

			// circle button to open
			var langBtn = $("<div />")
				.addClass(APP.getLM().getCurrentLang())
				.attr('id', 'lang-btn')
				.click(function(){
					that.open();
				});

			that.view.append(langBtn);

			// list container
			that.listContainer = $("<div />")
				.attr('id', 'list-container')
				.append( $("<ul />") );
			
			// list
			that.list = $("<ul />");

			that.listContainer.append(that.list);
			that.view.append(that.listContainer);

			// all the languages as list items
			_.each( APP.getConfig().languages, function(lang){
				var langItem = $("<li />")
					.addClass(lang)
					.append(that.getWording('lan.'+lang))
					.click(function(){
						that.close();

						APP.getDataManager().getUITranslations(lang, function(data){
	            APP.getLM().setBib(data);
							that.say('languageChanged', lang);
						});
					});

				// that.buttons.push( {el: langItem, lang: lang} );

				that.list.append(langItem);
			});
			
			$('#main-container').append(that.view);

			this.base(arguments);
		},

		open: function(){
			var that = this;

			that.view.addClass('active');
			that.showCurtain(true);
			
			// highlight current language
			_.each( that.listItems, function(item){
				if( item.el.hasClass( APP.getLM().getCurrentLang() ) )
					item.el.addClass('active');
			});

		},

		addEvents: function(){
			var that = this;

			// that.listen('curtainclicked', function(){
   //      	if( that.view.hasClass('active') ) that.close();
  	// 	});

			that.listen('LanguageViewRendered', function(){
				// alert('Willkommen auf Afeefa.de! Wähle deine Sprache:');
				console.log('Willkommen auf Afeefa.de! Wähle deine Sprache:');
			});

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;

			// reset all buttons
			// _.each( that.buttons, function(btn) {
			// 	btn.el.removeClass('active');
			// });

		},

		changeLanguage: function(){
			var that = this;

			// that.reset();
			// that.load();
		},

		close: function(){
			var that = this;
			
			that.view.removeClass('active');
			that.showCurtain(false);
		}
	}

});