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

			var userDevice = APP.getUserDevice();

			that.steps = {
				step1: {
					stepName: 'search',
					el: (userDevice == 'mobile')? that.view : APP.getSearchView().view,
					placement: (userDevice == 'mobile')? 'top' : 'right',
					preAction: function(){
						APP.getSearchView().loadResults();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.search.title',
						text: 'intro.step.search.text'
					},
					buttons: ['next', 'cancelForever']
				},
				step2: {
					stepName: 'map',
					el: APP.getMapView().view,
					placement: 'top',
					preAction: function(){
						APP.getMapView().showCurtain(true);
					},
					afterAction: function(){
						APP.getMapView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.map.title',
						text: 'intro.step.map.text'
					},
					buttons: ['next', 'cancel']
				},
				step3: {
					stepName: 'language',
					el: APP.getLanguageView().view,
					placement: 'right',
					preAction: function(){
						APP.getLanguageView().showCurtain(true);
					},
					afterAction: function(){
						APP.getLanguageView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.language.title',
						text: 'intro.step.language.text'
					},
					buttons: ['finish']
				},
				step4: {
					stepName: 'legend',
					el: APP.getLegendView().view,
					placement: 'left',
					preAction: function(){
						APP.getLegendView().showCurtain(true);
						// APP.getLegendView().show();
					},
					afterAction: function(){
						APP.getLegendView().showCurtain(false);
						// APP.getLegendView().close();
					},
					phraseAppKeys: {
						heading: 'intro.step.legend.title',
						text: 'intro.step.legend.text'
					},
					buttons: ['next', 'cancel']
				},
				step5: {
					stepName: 'plus',
					el: APP.getPlusView().plusBtn,
					placement: 'left',
					preAction: function(){
						APP.getPlusView().show();
					},
					afterAction: function(){
						APP.getPlusView().close();
					},
					phraseAppKeys: {
						heading: 'intro.step.plus.title',
						text: 'intro.step.plus.text'
					},
					buttons: ['next', 'cancel']
				},
				step6: {
					stepName: 'guide',
					el: APP.getSearchView().refugeeBtn,
					placement: 'bottom',
					preAction: function(){
						APP.getSearchView().close();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.guide.title',
						text: 'intro.step.guide.text'
					},
					buttons: ['next', 'cancel']
				}
			};
		},

		start: function(){
			var that = this;
			
			that.view.addClass('active');
			that.isActive(true);
			that.next();
		},

		stop: function(){
			var that = this;
			
			if( that.currentTooltip ) that.currentTooltip.destroy();
			if( that.currentStep ) that.currentStep.afterAction();
			that.currentTooltip = null;
			that.currentStep = null;
			
			that.view.removeClass('active');
			that.isActive(false);
		},

		saveIntroDecision: function(){
			var that = this;
			
			localStorage.setItem("introIsKnown", 1);
		},

		next: function(){
			var that = this;

			var nextStep;
			if( !that.currentStep ) {
        nextStep = that.steps.step1;
      } else {
				switch(that.currentStep.stepName) {
				    case 'search':
				        nextStep = that.steps.step2;
				        break;
	        	case 'map':
				        nextStep = that.steps.step4;
				        break;
		        case 'language':
			        nextStep = that.steps.step1;
			        break;
		       	case 'legend':
			        nextStep = that.steps.step5;
			        break;
			      case 'plus':
			        nextStep = that.steps.step6;
			        break;
			      case 'guide':
			        nextStep = that.steps.step3;
			        break;
				    default:
				      nextStep = that.steps.step1;
				}
      }

			// destroy existing tooltip
			if( that.currentTooltip ) that.currentTooltip.destroy();

			// do afterAction
			if( that.currentStep ) that.currentStep.afterAction();

			// create next tooltip
			nextStep.preAction();
			var tooltip = that.createTooltip(
				nextStep.el,
				that.renderContent(nextStep),
				null,
				nextStep.placement,
				// 'desktop',
				null,
				['intro'],
				'node'
			);
			that.currentTooltip = tooltip;
			that.currentStep = nextStep;
		},

		renderContent: function(step){
			var that = this;

			var contentContainer = $("<div />")
						
			var heading = $("<h2 />")
				.append(that.getWording(step.phraseAppKeys.heading));

			var text = $("<p />")
				.append(that.getWording(step.phraseAppKeys.text));
			
			contentContainer.append(heading);
			contentContainer.append(text);

			_.each(step.buttons, function(value, i){
				var labelKey, action;
				
				// define button types
				switch(value){
					case 'next':
						labelKey = 'intro.button.next';
						action = function(){that.next()};
						break;

					case 'cancel':
						labelKey = 'intro.button.cancel';
						action = function(){that.stop()};
						break;

					case 'cancelForever':
						labelKey = 'intro.button.cancel.forever';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;

					case 'finish':
						labelKey = 'intro.button.finish';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;
				}

				// generate the button
				var button = $("<button />")
					.addClass('block')
					.append(that.getWording(labelKey))
					.click(action);

				// make secondary buttons
				if(i>0) button.addClass('btn-secondary');
				
				contentContainer.append(button);
			});

			return contentContainer;
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