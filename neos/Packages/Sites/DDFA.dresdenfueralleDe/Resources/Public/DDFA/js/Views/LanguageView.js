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

			that.languageTranslations = {
				de: 'Deutsch',
				'en': 'English',
				ar: 'العربية',
				'fa': 'فارسی',
				'fr': 'Français',
				'ru': 'русский',
				'ps': 'پښتو',
				'ku': 'کوردی',
				'es': 'español',
				'sq': 'Shqip',
				'sr': 'Српски',
				'ti': 'ቋንቋ ትግርኛ',
				'tr': 'Türkçe',
				'ur': 'اردو'
			}

			// circle button to open
			that.langBtn = $("<div />")
				.attr('id', 'lang-btn')
				.addClass(APP.getLM().getCurrentLang())
				.click(function(){
					that.open();
				});

				that.createTooltip(
	        that.langBtn,
	        function(){
	          return that.getWording('languageselection.button.main');
	        }(),
	        'hover',
	        'left',
	        'desktop'
	      );

				that.view.append(that.langBtn);

			// list container
			that.listContainer = $("<div />")
				.attr('id', 'list-container');
			
	  	if( APP.getUserDevice() == 'desktop') that.listContainer.perfectScrollbar();
			that.view.append(that.listContainer);

			// all the languages as list items
			that.listItems = [];

			_.each( APP.getConfig().languages, function(lang){
				var langItem = $("<div />")
					.addClass('lang-item ' + lang)
					.click(function(){
						that.close();

						sessionStorage.setItem("languageFrozen", 1);

						APP.getDataManager().getUITranslations(lang, function(data){
	            APP.getLM().setBib(data);
							
							// change language if different from currently selected one
							if( lang != APP.getLM().getCurrentLang() )
								that.say('languageChanged', lang);
						});
					});
				
				var flag = $("<div />")
					.addClass('lang-item-flag ' + lang);
					
				var label = $("<div />")
					.addClass('lang-item-label');

				langItem.append(flag);
				langItem.append(label);

				that.listItems.push( {el: langItem, label: label, lang: lang} );

				that.listContainer.append(langItem);
			});
			
			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function(){
			var that = this;

			_.each( that.listItems, function(item){
				// highlight current language
				item.el.removeClass('active');
				if( item.el.hasClass( APP.getLM().getCurrentLang() ) )
					item.el.addClass('active');
				
				// make labels
				item.label
					.empty()
					.append( that.languageTranslations[item.lang] )
					.append( $("<span />").append(that.getWording('lan.'+item.lang)) );
			});
		},

		open: function( cb ){
			var that = this;

			// set optional callback to call after language was selected from the list
			if(cb) that.cb = cb;

			that.isActive(true);
			that.load();

			that.view.addClass('active');
			that.showCurtain(true);

      if( APP.getUserDevice() == 'desktop') that.listContainer.perfectScrollbar('update');
		},

		addEvents: function(){
			var that = this;

			// that.listen('curtainclicked', function(){
   //      	if( that.view.hasClass('active') ) that.close();
  	// 	});

			that.listen('LanguageViewRendered', function(){
				if( !localStorage.getItem("languageFrozen") ){
					// that.open();
				}
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

			that.langBtn
				.attr('class', null)
				.addClass(APP.getLM().getCurrentLang());
		},

		close: function(){
			var that = this;
			
			that.view.removeClass('active');
			that.showCurtain(false);

			// callback may have been defined when view was opened
			if(that.cb) that.cb();
			that.cb = null;
		
			that.isActive(false);
		}
	}

});