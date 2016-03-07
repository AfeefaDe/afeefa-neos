qx.Class.define("PlusView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('plusView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());
			
			// plus button
			that.plusBtn = $("<div />")
				.addClass('btn plusBtn');
			that.view.append(that.plusBtn);

			// entry button
			that.entryLabel = $("<label />");
			that.entryBtn = $("<div />")
			 	.addClass('btn entryBtn');
			var container = $("<div />")
				.addClass('btn-container btn-container-entry')
				.append(that.entryLabel)
				.append(that.entryBtn);
			that.view.append(container);

			// feedback button
			that.feedbackLabel = $("<label />");
			that.feedbackBtn = $("<div />")
			 .addClass('btn feedbackBtn')
			 .append(that.feedbackLabel);
			var container = $("<div />")
				.addClass('btn-container btn-container-feedback')
				.append(that.feedbackLabel)
				.append(that.feedbackBtn);
			that.view.append(container);
			
			$('#main-container').append(that.view);

			this.base(arguments);

			that.load();
		},

		load: function(){
			var that = this;

			that.entryLabel.empty().append( that.getWording( 'plus_entry' ) );
			that.feedbackLabel.empty().append( that.getWording( 'plus_feedback' ) );
		},

		show: function(){
			var that = this;

		  that.showCurtain(true);  
	    that.view.addClass( "active" );
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
			
			that.entryBtn.click(function(){
				that.close();
				APP.getIncludeView().load( APP.getIncludeView().getIncludes().entryFormGuide );
			});
			
			that.feedbackBtn.click(function(){
				that.close();
		   	APP.getFormView().load( APP.getFormView().getFormTypes().feedback );
			});

			// show on hover
			that.view.hover(
			  function() {
			  	that.show();
			  }, function() {
			  	// only fire mouseleave if plusView is really active
			  	if( that.view.hasClass('active') ) that.close();
			  }
			);
		},

		close: function(){
			var that = this;

			that.showCurtain(false);  
	    that.view.removeClass( "active" );
		},

		changeLanguage: function(){
			var that = this;

			that.load();
		}
	}

});