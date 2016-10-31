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

			// curtain
			// that.introCurtain = $("<div />")
			// 	.attr('id', 'introCurtain');
				// .on('click', function(e) {
				// 	that.say('curtainclicked');
				// });
  		// $('#main-container').append(curtain);
  		// that.view(introCurtain);

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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_search'));
						var button = $("<button />")
							.append(that.getWording('intro_button_next'))
							.click(function(){
								that.next();
							});

						var buttonCancel = $("<button />")
							// .addClass('btn-secondary')
							.append(that.getWording('intro_button_cancel'))
							.click(function(){
								that.stop();
								that.saveIntroDecision();
							});

						contentContainer.append(text);
						contentContainer.append(button);
						contentContainer.append(buttonCancel);
						return contentContainer;
					}()
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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_map'));
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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_language'));
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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_legend'));
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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_plus'));
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
					content: function(){
						var contentContainer = $("<div />")
						var text = $("<div />")
							.append(that.getWording('intro_step_guide'));
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
			
			that.view.addClass('active');
			that.next();
		},

		stop: function(){
			var that = this;
			
			if( that.currentTooltip ) that.currentTooltip.destroy();
			if( that.currentStep ) that.currentStep.afterAction();
			that.currentTooltip = null;
			that.currentStep = null;
			
			that.view.removeClass('active');
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
				nextStep.content,
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