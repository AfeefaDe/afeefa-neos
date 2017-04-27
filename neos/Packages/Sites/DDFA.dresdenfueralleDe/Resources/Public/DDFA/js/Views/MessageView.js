qx.Class.define("MessageView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('messageView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			that.title = $('<h3 />');
			that.content = $("<p />");
			that.actions = $("<div />");

			that.view.append(that.title);
			that.view.append(that.content);
			that.view.append(that.actions);

			$('#main-container').append(that.view);

			this.base(arguments);

			that.defineTemplates();
		},

		defineTemplates: function(){
			var that = this;

			that.templates = {
				'survey': {
					title: that.getWording('message.survey.title'),
					contentNode: that.getWording('message.survey.text'),
					cssClass: '',
					actions: 
						[
							{
								label: 'Zur 3-Minuten-Umfrage',
								externalLink: 'https://afeefade.typeform.com/to/csN7YQ'
							},
							{
								label: 'Nicht jetzt',
								close: true,
								cssClass: 'margin-top'
							}
						]
				},
				'about': {
					title: 'Du möchtest mehr über Afeefa erfahren?',
					contentNode: 'Auf unseren Infoseiten erfährst du mehr über unser Konzept, das Team, Kooperationspartner und vieles mehr.',
					cssClass: '',
					actions: 
						[
							{
								label: 'Erzähl mir mehr!',
								externalLink: 'https://about.afeefa.de',
								cssClass: 'block'
							},
							{
								label: 'Nicht jetzt',
								close: true,
								cssClass: 'btn-secondary block margin-top'
							}
						]
				}
			}
		},
		
		// param options Object {key, title, contentNode, actions, cssClass}
		load: function(options){
			var that = this;
			
			// don't show while intro
			if( APP.getIntroView().isActive() ) return;
			if( APP.getLanguageView().isActive() ) return;
			if( APP.getFormView().isActive() ) return;

			if(options.key) {

				that.registerOpening({key: options.key});

				// message was opened before?
				if( !options.force ){
					var counter = sessionStorage.getItem("messageOpened_" + options.key);
					if( counter < 50 ) return;
					if( counter > 50 ) return;
					// if( counter < 10 ) return;
					// if( counter > 2 && counter < 10 ) return;
					// if( counter > 1 && counter < 10 ) return;
					// if( counter > 10 ) return;
				}
				
				// message followed before?
				if(localStorage.getItem("messageFollowed_" + options.key) == 1) return;
			}

			that.reset();

			// the message data (may come from template)
			var message = options.key? that.templates[options.key] : options;
			
			// build
			that.title.append(message.title);
			that.content.append(message.contentNode);
			
			_.each(message.actions, function(action){
				var btn;
				
				if(action.externalLink){
					btn = $('<a />')
						.addClass('btn')
						.attr('target', '_blank')
						.attr('href', action.externalLink)
						.append(action.label)
						.click(function(){
							that.close();
							that.registerOpening({key: options.key, messageFollowed: true});
						});
				}
				else if(action.close){
					btn = $('<button />')
						.addClass('btn btn-flat')
						.append(action.label)
						.click(function(){
							that.close();
						});
				}
				else {
					btn = $('<button />')
						.append(action.label)
						.click(action.action);
				}

				if(action.cssClass) btn.addClass(action.cssClass);
				
				that.actions.append(btn);
			});

			that.view.addClass(message.cssClass);
			that.showCurtain(true);
			that.view.addClass('active');
		},

		registerOpening: function(options){
			var that = this;
			
			// count opening attempts in current session
			var counter = sessionStorage.getItem("messageOpened_" + options.key) ? sessionStorage.getItem("messageOpened_" + options.key) : 0;
			counter++;
			sessionStorage.setItem("messageOpened_" + options.key, counter);

			// save to localstorage if user executed the message's primary action (e.g. followed the external link)
			if(options.messageFollowed) {
				localStorage.setItem("messageFollowed_" + options.key, 1);
				localStorage.setItem("messageFollowed_" + options.key + '_month', new Date().getMonth()+1);
			}

			// reset localstorage a month later
			var savedMonth = localStorage.getItem("messageFollowed_" + options.key + '_month');
			if( savedMonth < new Date().getMonth()+1 || savedMonth == 12 ){
				localStorage.removeItem("messageFollowed_" + options.key);
				localStorage.removeItem("messageFollowed_" + options.key + '_month');
			}
		},

		close: function(){
			var that = this;

			that.view.removeClass('active');
			that.showCurtain(false);
			that.reset();
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);

			setTimeout(function(){
				that.load({key: 'survey', force: true});
			}, 240000);

			// that.listen('detailViewOpened', function(){
			// 	setTimeout(function(){
			// 		that.load({key: 'survey'});
			// 	}, 5000);
   //    });
		},

		reset: function(){
			var that = this;

			that.title.empty();
			that.content.empty();
			that.actions.empty();
		},

		changeLanguage: function(){
			var that = this;

			// that.reset();
			// that.load();
		}
	}

});