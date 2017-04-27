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
				.addClass('button locateBtn')
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

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function(){
			var that = this;
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		changeLanguage: function(){
			var that = this;

			that.load();
		}
	}

});