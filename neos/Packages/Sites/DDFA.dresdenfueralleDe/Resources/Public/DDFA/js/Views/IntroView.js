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

			that.defineSteps();

			this.base(arguments);

			// that.load();
		},

		defineSteps: function(){
			var that = this;

			that.steps = {
				step1: {
					stepName: 'step1',
					el: APP.getSearchView().view,
					preAction: function(){
						APP.getSearchView().loadResults();
					},
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_1'));
						var button = $("<button />")
							.append(that.getWording('intro_button_next'))
							.click(function(){
								that.next();
							});

						contentContainer.append(text);
						contentContainer.append(button);
						return contentContainer;
					}()
				},
				step2: {
					stepName: 'step2',
					el: APP.getLanguageView().view,
					preAction: function(){
					},
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_2'));
						var button = $("<button />")
							.append(that.getWording('intro_button_next'))
							.click(function(){
								that.next();
							});

						contentContainer.append(text);
						contentContainer.append(button);
						return contentContainer;
					}()
				}
			};
		},

		start: function(){
			var that = this;

			that.showCurtain(true);
						
			that.next();
		},

		next: function(){
			var that = this;

			var nextStep;
			if( !that.currentStep ) {
        nextStep = that.steps.step1;
      } else {
				switch(that.currentStep.stepName) {
				    case 'step1':
				        nextStep = that.steps.step2;
				        break;
				    default:
				        nextStep = that.steps.step1;
				}
      }

			// destroy any existing tooltip
			if( that.currentTooltip ) that.currentTooltip.destroy();

			// create next tooltip
			nextStep.preAction();
			var tooltip = that.createTooltip(
				nextStep.el,
				nextStep.content,
				null,
				'right',
				'desktop',
				['intro'],
				'node'
			);
			that.currentTooltip = tooltip;
			that.currentStep = nextStep;
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