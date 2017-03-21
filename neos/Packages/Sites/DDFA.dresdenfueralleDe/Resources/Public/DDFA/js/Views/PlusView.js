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
			
			// locate btn
			that.locateBtn = $("<div />")
				.addClass('btn locateBtn')
				// .attr('id', 'locate-btn')
				.click(function(){
					APP.getMapView().locate(true);
				})
				.on('touchend', function(){
					APP.getMapView().locate(true);
				});
			that.view.append(that.locateBtn);

			that.createTooltip(
        that.locateBtn,
        function(){
          return that.getWording('button.locate');
        }(),
        'hover',
        'left',
        'desktop'
      );

			// feedback button
			that.feedbackBtn = $("<div />")
				.addClass('btn feedbackBtn');
			that.view.append(that.feedbackBtn);

			that.createTooltip(
        that.feedbackBtn,
        function(){
          return that.getWording('button.feedback');
        }(),
        'hover',
        'left',
        'desktop'
      );

			$('#main-container').append(that.view);

			this.base(arguments);

			// that.load();
		},

		load: function(){
			var that = this;
		},

		show: function(){
			var that = this;

		  that.showCurtain(true);
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
			
			that.feedbackBtn.click(function(){
				that.close();
		   	APP.getFormView().load( 'feedback' );
			});
		},

		close: function(){
			var that = this;

			that.showCurtain(false);  
		},

		changeLanguage: function(){
			var that = this;

			that.load();
		}
	}

});