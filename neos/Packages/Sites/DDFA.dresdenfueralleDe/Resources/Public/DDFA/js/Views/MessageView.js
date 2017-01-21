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

			that.title = $('<h2 />');
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
					title: 'Wie nutzt du Afeefa.de?',
					contentNode: 'Mit einem kurzen Feedback unterstützt du das Afeefa Projekt und dessen Weiterentwicklung!',
					cssClass: '',
					actions: 
						[
							{
								label: 'Zur 3-Minuten-Umfrage 🙂',
								externalLink: 'https://afeefade.typeform.com/to/csN7YQ',
								cssClass: 'block'
							},
							{
								label: 'Nicht jetzt',
								close: true,
								cssClass: 'btn-secondary margin-top'
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
			
			if(options.key) that.registerOpening(options.key);

			// was opened before?
			if(options.key) {
				var counter = sessionStorage.getItem("messageOpened_" + options.key);
				if( counter > 1 && counter < 10 ) return;
				if( counter > 10 ) return;
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
						.addClass('button')
						.attr('target', '_blank')
						.attr('href', action.externalLink)
						.append(action.label)
						.click(function(){
							that.close();
						});
				}
				else if(action.close){
					btn = $('<button />')
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

		registerOpening: function(key){
			var that = this;
			
			var counter = sessionStorage.getItem("messageOpened_" + key) ? sessionStorage.getItem("messageOpened_" + key) : 0;
			counter++;
			sessionStorage.setItem("messageOpened_" + key, counter);
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
				that.load({key: 'survey'});
			}, 20000);

			that.listen('detailViewOpened', function(){
				setTimeout(function(){
					that.load({key: 'survey'});
				}, 5000);
      });
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