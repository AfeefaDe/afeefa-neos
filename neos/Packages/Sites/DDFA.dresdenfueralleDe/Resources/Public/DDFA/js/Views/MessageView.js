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

			that.title = $('<div />');
			that.content = $("<div />");
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
				'survey':
					{
						title: 'Wie nutzt du Afeefa.de?',
						contentNode: 'Mit einem kurzen Feedback...',
						cssClass: 'survey',
						actions: 
							[
								{
									label: 'Zur 5-Minuten-Umfrage',
									action: function(){
										
									},
									cssClass: ''
								}

							]
					}
			}
		},
		
		// param options Object {key, title, contentNode, actions, cssClass}
		load: function(options){
			var that = this;
			
			that.reset();

			// the message data
			var message = options.key? that.templates[options.key] : options;
			
			// build
			that.title.append(message.title);
			that.content.append(message.contentNode);
			
			_.each(message.actions, function(action){
				var btn = $('<button />')
					.append(action.label)
					.click(action.action);
				
				that.actions.append(btn);
			});

			that.view.addClass(message.cssClass);
			that.view.addClass('active');
		},

		// saveIntroDecision: function(){
		// 	var that = this;
			
		// 	localStorage.setItem("introIsKnown", 1);
		// },

		close: function(){
			var that = this;

			that.view.removeClass('active');
			that.reset();
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
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