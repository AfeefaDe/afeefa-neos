qx.Class.define("IntroView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('introView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			this.base(arguments);

			that.defineSteps();
			// that.load();
		},

		defineSteps: function(){
			var that = this;

			that.steps = {
				step1: {
					el: APP.getSearchView().view,
					preAction: function(){
						APP.getSearchView().loadResults();
					}(),
					content: function(){
						var html = searchView.getWording('intro_step_1');
						html += "<button>" +searchView.getWording('intro_button_next')+ "</button>";
						return html;
					}()
				}
			};
		},

		start: function(){
			var that = this;

			that.showCurtain(true);

			var searchView = APP.getSearchView();
				searchView.loadResults();
				searchView.createTooltip(
					searchView.view,
					function(){
						var html = searchView.getWording('intro_step_1');
						html += "<button>" +searchView.getWording('intro_button_next')+ "</button>";
						return html;
					}(),
					null,
					'right',
					'desktop',
					['intro']
				);

		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;
		},

		changeLanguage: function(){
			var that = this;

			// that.reset();
			// that.load();
		},

		close: function(){
			var that = this;

			// TODO: only do in mobile version
			// that.addRequestBtn.css('display', 'none');
			// that.addOfferBtn.css('display', 'none');
		}
	}

});