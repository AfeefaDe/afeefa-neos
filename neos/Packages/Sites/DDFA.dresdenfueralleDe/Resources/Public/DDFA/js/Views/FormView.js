qx.Class.define("FormView", {
	
	extend : View,
	type: "singleton",

	properties: {
		currentFormType: {init: null},
		entryTypeEnum: {},
		properties: {},
		html5InputTypes: {},
		baseUrl: {}
	},

	construct: function(){
		var that = this;

		that.setViewId('formView');
		
		that.setLoadable(true);
		
		that.setBaseUrl( '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/inc/' );

		that.setEntryTypeEnum(
			{
				initiative: 0,
				marketentry: 1,
				event: 2
			}
		);

		var mainCategories = _.filter( APP.getData().categories, function(value, key){
			return value.type == 1;
		});

		that.setProperties(
			{
				initiative:
					{
						name: {name: 'name', type: 'text', intoOwner: true, intoLocation: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'text', intoOwner: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true}
					},
				marketentry:
					{
						offer: {name: 'offer', type: 'switch', intoOwner: true, values: [ [true, 'offer'], [false, 'request'] ]},
						name: {name: 'name', type: 'text', intoOwner: true, intoLocation: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'text', intoOwner: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true},
						dateFrom: {name: 'dateFrom', type: 'datetime-local', intoOwner: true},
						dateTo: {name: 'dateTo', type: 'datetime-local', intoOwner: true},
						datePeriodic: {name: 'datePeriodic', type: 'select', intoOwner: true, values: [ [0, 'daily'], [1, 'weekly'], [2, 'secondWeekly'], [3, 'monthly'] ] }
					},
				event:
					{
						name: {name: 'name', type: 'text', intoOwner: true, intoLocation: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'text', intoOwner: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true},
						dateFrom: {name: 'dateFrom', type: 'datetime-local', intoOwner: true},
						dateTo: {name: 'dateTo', type: 'datetime-local', intoOwner: true},
						datePeriodic: {name: 'datePeriodic', type: 'select', intoOwner: true, values: [ [0, 'daily'], [1, 'weekly'], [2, 'secondWeekly'], [3, 'monthly'] ] }
					},
				feedback:
					{
						author: {name: 'author', type: 'text', required: true},
						mail: {name: 'mail', type: 'email', required: true},
						message: {name: 'message', type: 'textarea', required: true}
					}
			}
		);

		that.setHtml5InputTypes( ['text', 'number', 'range', 'url', 'email', 'tel', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local'] );
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			 // heading
			var headingContainer = $("<div />").addClass('header');
			that.heading = $("<h1 />");
			headingContainer.append(that.heading);
			that.view.append(headingContainer);

			// form container
			that.formContainer = $("<div />")
				.addClass('form-container');
			if( APP.getUserDevice() == 'desktop') that.formContainer.perfectScrollbar();
			that.view.append(that.formContainer);

			// form container
			that.buttonContainer = $("<div />")
				.addClass('button-container')
				.append( $("<p />") );
			that.view.append(that.buttonContainer);
			
			that.forms = {};
			that.renderInitiativeForm();
			that.renderMarketEntryForm();
			that.renderEventForm();
			that.renderFeedbackForm();

			that.sendBtn = $("<button />")
				.addClass('sendBtn')
				.append( that.getWording('form_sendBtn') );
			that.buttonContainer.find('p').append(that.sendBtn);
			
			that.cancelBtn = $("<button />")
				.addClass('cancelBtn btn-secondary margin-left')
				.append( that.getWording('form_cancelBtn') );
			that.buttonContainer.find('p').append(that.cancelBtn);

			this.base(arguments);
		},

		createInput: function( property, type ){
			var that = this;

			var inputEl;					// will be returned
			var returnEl = null;  // optional alternative for return
			var labelEl = null;			// optional

			// if( property.type == 'datetime' || property.type == 'datetime-local' ){
			// 	inputEl = $("<input />")
			// 		.attr('type', 'text')
			// 		.attr('name', property.name)
			// 		.pickadate();
			// }
			if( _.contains( that.getHtml5InputTypes() , property.type ) ){
				inputEl = $("<input />")
					.attr('type', property.type)
					.attr('name', property.name);
			}
			else if( property.type == 'checkbox' ){
				var container = $("<div />")
					.addClass('form-checkbox');
				
				inputEl = $("<input />")
					.attr('type', property.type)
					.attr('name', property.name);
				container.append(inputEl);
				
				labelEl = $("<label />");
				container.append(labelEl);

				returnEl = container;
			} 
			// select
			else if( property.type == 'select' ){

				inputEl = $("<select />");
				
				// if(!property.required)
				// 	var emptyOption = $('<option />')
				// 		.attr('selected', true)
				// 		.attr('value', '');

				// inputEl.append(emptyOption);
				
				// _.each( property.values, function(value){
					
				// 	var option = $("<option />");

				// 	if( property.name == 'category')
				// 		option.attr('value', value.identifier);
				// 	else
				// 		option.attr('value', value[0]);
					
				// 	// TODO verarbeite select values as arrays [value, label]
				// 	if( property.name == 'category'){ option.append( that.getWording('cat_' + value.name) ); }
				// 	else if( property.name == 'datePeriodic'){ option.append( that.getWording('prop_' + property.name + '_' + value[1]) ); }
				// 	// else if( property.name == 'spokenLanguages'){ option.append( that.getWording('lang_' + value[1]) ); }
				// 	else { option.append( that.getWording('form_' + value[1]) ); }
					
				// 	inputEl.append(option);
				// });
				
				inputEl.attr('name', property.name);
			}
			// textarea
			else if( property.type == 'textarea' ){
				inputEl = $("<textarea />")
					.attr('name', property.name)
					.attr('rows', 5);
			}
			// switch
			else if( property.type == 'switch' ){
				var container = $("<div />").addClass('form-switch');
				var option1 = $("<span />").append(that.getWording('prop_' + property.name + '_' + property.values[0][1]) );
				var option2 = $("<span />").append(that.getWording('prop_' + property.name + '_' + property.values[1][1]) );
				container.append(option1);
				container.append(option2);

				inputEl = $("<input />")
					.attr('type', 'checkbox')
					.attr('name', property.name);
				container.append(inputEl);

				option1.click(function(){
					$(this).addClass('active');
					option2.removeClass('active');
					inputEl.prop("checked", property.values[0][0]);
				});

				option2.click(function(){
					$(this).addClass('active');
					option1.removeClass('active');
					inputEl.prop("checked", property.values[1][0]);
				});

				// initial value
				option1.addClass('active');
				inputEl.prop("checked", property.values[0][0]);

				// set alternative return element
				returnEl = container;
			}
			else {
				inputEl = $("<input />")
					.attr('type', 'text')
					.attr('name', property.name);
			}

			// required?
			if(property.required) inputEl.attr('required', true);
			// custom input element class
			inputEl.addClass(property.name);

			that.forms[type].fields[property.name] = inputEl;
			that.forms[type].fields[property.name + '_label'] = labelEl;
			
			if( returnEl !== null )
				return returnEl;
			else
				return inputEl;
		},

		renderInitiativeForm: function(){
			var that = this;

			var type = 'initiative';
			
			/////////////
			// general //
			/////////////
			var properties = that.getProperties()[type];
			that.forms[type] = {form: null, fields: {}};

			// create form element
			var form = that.createForm(type);
			that.formContainer.append(form);
			
			///////////////////
			// custom layout //
			///////////////////

			var nameEl = that.createInput(properties.name, type);
			form.append(nameEl);

			var catEl = that.createInput(properties.category, type);
			form.append(catEl);

			var subCatEl = that.createInput(properties.subCategory, type);
			form.append(subCatEl);

			var descEl = that.createInput(properties.description, type);
			form.append(descEl);

			var forChildrenEl = that.createInput(properties.forChildren, type);
			form.append(forChildrenEl);

			var supportWantedEl = that.createInput(properties.supportWanted, type);
			form.append(supportWantedEl);

			var sectionHeader = $('<h3 />').append('Ortsangaben');
			form.append(sectionHeader);

			var locationContainer = $('<div />').addClass('location-container');
			form.append(locationContainer);

			var buttonContainer = $('<p />');
			var addLocationBtn = $('<button />')
				.append('Ort hinzufügen')
				.click(function(e){
					e.preventDefault();
					locationContainer.toggleClass('active');
				});
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append('Deine Kontaktdaten werden veröffentlicht, damit Interessenten mit dir in Kontakt treten können. Bitte sei dir bewusst, welche Angaben du hier machen möchtest.');
			form.append(notice);

			var speakerEl = that.createInput(properties.speakerPublic, type);
			form.append(speakerEl);

			var spokenLanguagesEl = that.createInput(properties.spokenLanguages, type);
			form.append(spokenLanguagesEl);

			var mailEl = that.createInput(properties.mail, type);
			form.append(mailEl);

			var phoneEl = that.createInput(properties.phone, type);
			form.append(phoneEl);

			var webEl = that.createInput(properties.web, type);
			form.append(webEl);

			var facebookEl = that.createInput(properties.facebook, type);
			form.append(facebookEl);
		},

		renderMarketEntryForm: function(){
			var that = this;

			var type = 'marketentry';
			
			/////////////
			// general //
			/////////////
			var properties = that.getProperties()[type];
			that.forms[type] = {form: null, fields: {}};

			// create form element
			var form = that.createForm(type);
			that.formContainer.append(form);
			
			///////////////////
			// custom layout //
			///////////////////

			var switchEl = that.createInput(properties.offer, type);
			form.append(switchEl);

			var nameEl = that.createInput(properties.name, type);
			form.append(nameEl);

			var catEl = that.createInput(properties.category, type);
			form.append(catEl);

			var subCatEl = that.createInput(properties.subCategory, type);
			form.append(subCatEl);

			var dateFromEl = that.createInput(properties.dateFrom, type);
			form.append(dateFromEl);

			var dateToEl = that.createInput(properties.dateTo, type);
			form.append(dateToEl);

			var datePeriodicEl = that.createInput(properties.datePeriodic, type);
			form.append(datePeriodicEl);

			var descEl = that.createInput(properties.description, type);
			form.append(descEl);

			var forChildrenEl = that.createInput(properties.forChildren, type);
			form.append(forChildrenEl);

			var supportWantedEl = that.createInput(properties.supportWanted, type);
			form.append(supportWantedEl);

			var sectionHeader = $('<h3 />').append('Ortsangaben');
			form.append(sectionHeader);

			var locationContainer = $('<div />').addClass('location-container');
			form.append(locationContainer);

			var buttonContainer = $('<p />');
			var addLocationBtn = $('<button />')
				.append('Ort hinzufügen')
				.click(function(e){
					e.preventDefault();
					locationContainer.toggleClass('active');
				});
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append('Deine Kontaktdaten werden veröffentlicht, damit Interessenten mit dir in Kontakt treten können. Bitte sei dir bewusst, welche Angaben du hier machen möchtest.');
			form.append(notice);

			var speakerEl = that.createInput(properties.speakerPublic, type);
			form.append(speakerEl);

			var spokenLanguagesEl = that.createInput(properties.spokenLanguages, type);
			form.append(spokenLanguagesEl);

			var mailEl = that.createInput(properties.mail, type);
			form.append(mailEl);

			var phoneEl = that.createInput(properties.phone, type);
			form.append(phoneEl);

			var webEl = that.createInput(properties.web, type);
			form.append(webEl);

			var facebookEl = that.createInput(properties.facebook, type);
			form.append(facebookEl);
		},

		renderEventForm: function(){
			var that = this;

			var type = 'event';
			
			/////////////
			// general //
			/////////////
			var properties = that.getProperties()[type];
			that.forms[type] = {form: null, fields: {}};

			// create form element
			var form = that.createForm(type);
			that.formContainer.append(form);
			
			///////////////////
			// custom layout //
			///////////////////

			var nameEl = that.createInput(properties.name, type);
			form.append(nameEl);

			var catEl = that.createInput(properties.category, type);
			form.append(catEl);

			var subCatEl = that.createInput(properties.subCategory, type);
			form.append(subCatEl);

			var dateFromEl = that.createInput(properties.dateFrom, type);
			form.append(dateFromEl);

			var dateToEl = that.createInput(properties.dateTo, type);
			form.append(dateToEl);

			var datePeriodicEl = that.createInput(properties.datePeriodic, type);
			form.append(datePeriodicEl);

			var descEl = that.createInput(properties.description, type);
			form.append(descEl);

			var forChildrenEl = that.createInput(properties.forChildren, type);
			form.append(forChildrenEl);

			var supportWantedEl = that.createInput(properties.supportWanted, type);
			form.append(supportWantedEl);

			var sectionHeader = $('<h3 />').append('Ortsangaben');
			form.append(sectionHeader);

			var locationContainer = $('<div />').addClass('location-container');
			form.append(locationContainer);

			var buttonContainer = $('<p />');
			var addLocationBtn = $('<button />')
				.append('Ort hinzufügen')
				.click(function(e){
					e.preventDefault();
					locationContainer.toggleClass('active');
				});
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append('Deine Kontaktdaten werden veröffentlicht, damit Interessenten mit dir in Kontakt treten können. Bitte sei dir bewusst, welche Angaben du hier machen möchtest.');
			form.append(notice);

			var speakerEl = that.createInput(properties.speakerPublic, type);
			form.append(speakerEl);

			var spokenLanguagesEl = that.createInput(properties.spokenLanguages, type);
			form.append(spokenLanguagesEl);

			var mailEl = that.createInput(properties.mail, type);
			form.append(mailEl);

			var phoneEl = that.createInput(properties.phone, type);
			form.append(phoneEl);

			var webEl = that.createInput(properties.web, type);
			form.append(webEl);

			var facebookEl = that.createInput(properties.facebook, type);
			form.append(facebookEl);
		},

		renderFeedbackForm: function(){
			var that = this;

			var type = 'feedback';
			
			/////////////
			// general //
			/////////////
			var properties = that.getProperties()[type];
			that.forms[type] = {form: null, fields: {}};

			// create form element
			var form = that.createForm(type);
			that.formContainer.append(form);
			
			///////////////////
			// custom layout //
			///////////////////

			var authorEl = that.createInput(properties.author, type);
			form.append(authorEl);

			var mailEl = that.createInput(properties.mail, type);
			form.append(mailEl);

			var messageEl = that.createInput(properties.message, type);
			form.append(messageEl);
		},

		createForm: function(type){
			var that = this;

			var form = $("<form />")
				.attr('id', type + '-form')
				.submit(function(e){
					e.preventDefault();
					that.sendForm();
				});
			
			that.forms[type].form = form;

			return form;
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
			
			that.sendBtn.click(function(e){
				that.sendForm();
			});

			that.cancelBtn.click(function(e){
				e.preventDefault();
				that.close();
			});
		},

		load: function( type ){
			var that = this;

			that.reset();

			// activate loaded form type
			that.setCurrentFormType(type);
			that.forms[type].form.addClass('active');
			that.showCurtain(true);

			// set heading value
			that.heading.empty().append( that.getWording('form_' + type) );

			// set placeholders/ labels
			_.each( that.getProperties()[type], function(property){
				// set placeholder value
				that.forms[type].fields[property.name]
					.attr('placeholder', that.getWording('prop_' + property.name) );

				// set label value if a lable exists
				if( that.forms[type].fields[property.name + '_label'] )
					that.forms[type].fields[property.name + '_label']
						.empty()
						.append(that.getWording('prop_' + property.name) );

				if( property.type == 'select' ){
					// option fields
					// that.forms[type].fields[property.name].find('option')
					// 	.empty()
					// 	.append(that.getWording('cat_' + property.name));

					// empty option field
					// that.forms[type].fields[property.name].find('option').first()
					// 	.empty()
					// 	.append(that.getWording('form_emptyOption_' + property.name));

					// remove all options
					that.forms[type].fields[property.name].empty();
					
					// add empty option
					var emptyOption = $('<option />')
						.attr('selected', true)
						.attr('value', '')
						.append(that.getWording('form_emptyOption_' + property.name));
					that.forms[type].fields[property.name].append(emptyOption);
					
					_.each( property.values, function(value, key){
						
						var option = $("<option />");

						if( property.name == 'category') {
							option
								.attr('value', value.identifier)
								.append( that.getWording('cat_' + value.name) );
						}
						else if( property.name == 'subCategory') {
							option
								.attr('value', value.name)
								.append( that.getWording('cat_' + value.name) );
						}
						else { 
							option
								.attr('value', value[0])
								.append( that.getWording('prop_' + property.name + '_' + value[1]) );
						} 
						
						that.forms[type].fields[property.name].append(option);
					});
				}
			});

			that.view.addClass('active');

			// TODO dirty fix for IE
			if( !Modernizr.inputtypes.date ) that.view.find('.dateFrom, .dateTo, .datePeriodic').hide();
		},

		reset: function(){
			var that = this;

			that.setCurrentFormType(null);

			_.each( that.getProperties(), function(value, key){
				that.view.removeClass(key);
				that.forms[key].form.removeClass('active');
			});

			that.heading.empty();

			that.loading(false);
		},

		close: function(){
			var that = this;

			that.reset();
			that.view.removeClass('active');
			that.showCurtain(false);
		},

		changeLanguage: function(){
			var that = this;

			if( that.getCurrentFormType() ) that.load( that.getCurrentFormType() );
		},

		sendForm: function(){
			var that = this;

			that.loading(true);

			var type = that.getCurrentFormType();

			// create marketentry record + location record
			if( type == 'initiative' || type == 'marketentry' || type == 'event' ){
				var dataMarketEntry = { "marketentry": {} };
				var dataLocation = { "location": {} };

				// cycle through form fields and extract data
				_.each( that.getProperties()[type], function( property ){
					// read value from form element
					var value = that.forms[type].fields[property.name].val();
					
					// set to null where meant to be null
					if( value === '' ) value = null;
					
					// may handle special types
					if( value && (property.type == 'datetime' || property.type == 'datetime-local') ){
						// convert to sql datetime
						var d = new Date( value );
						// value = d.toISOString().slice(0, 19).replace('T', ' ');
						value = d.toISOString().slice(0, 19) + '+0200';
					}
					else if( property.type == 'checkbox' || property.type == 'switch' ){
						value = that.forms[type].fields[property.name].prop('checked');
					}

					
					if(property.intoOwner) dataMarketEntry.marketentry[property.name] = value;
					if(property.intoLocation) dataLocation.location[property.name] = value;
				});

				dataMarketEntry.marketentry.type = that.getEntryTypeEnum()[type];
				dataMarketEntry.marketentry.published = false;

				dataLocation.location.type = that.getEntryTypeEnum()[type];
				dataLocation.location.published = false;

				that.createMarketEntryAndLocation(dataMarketEntry, dataLocation);
			}
			// create feedback record
			else if( type == 'feedback' ){
				var data = { "feedback": {} };
				
				_.each( that.getProperties()[type], function( property ){
					data.feedback[property.name] = that.forms[type].fields[property.name].val();
				});

				data.feedback.metaData = L.Browser;

				that.createFeedback(data);
			}
		},

		createMarketEntryAndLocation: function( dataMarketEntry, dataLocation ){
			var that = this;

			APP.getDataManager().addMarketEntry(dataMarketEntry, function( response ){
					
				if(!response.marketentry){
					// that.thatResponseMessage().append( that.getWording('form_fail') );
					alert(that.getWording('form_fail'));
					that.loading(false);
					return;
				}

				// that.responseMessage.append( that.getWording('form_success') );
				alert(that.getWording('form_success'));
				that.close();

				dataLocation.location['marketEntry'] = response.marketentry.persistenceObjectIdentifier;
				APP.getDataManager().addLocation(dataLocation, function(){
					// alert('marketLocation sent, thanks');
				});

			});

			// to github
			APP.getDataManager().githubCreateIssue({
				type: 'marketentry',
				data: _.extend({}, dataMarketEntry.marketentry, dataLocation.location)
			});

			// to slack
			var type = (dataMarketEntry.marketentry.offer) ? 'Angebot' : 'Gesuch';
			APP.getDataManager().sendToSlack({
				heading: type + ' von _' + dataMarketEntry.marketentry.speakerPublic + '_ (' + dataMarketEntry.marketentry.mail + ')',
				message:    '_Titel:_ ' + dataMarketEntry.marketentry.name + '\n'
							+ '_Beschreibung:_ ' + dataMarketEntry.marketentry.description + '\n'
							+ '_web:_ ' + dataMarketEntry.marketentry.web + '\n'
							+ '_facebook:_ ' + dataMarketEntry.marketentry.facebook + '\n'
							+ '_phone:_ ' + dataMarketEntry.marketentry.phone + '\n'
							+ '_Sprachen:_ ' + dataMarketEntry.marketentry.spokenLanguages + '\n'
							+ '_Str:_ ' + dataLocation.location.street + '\n'
							+ '_PLZ:_ ' + dataLocation.location.zip + '\n'
							+ '_Ort:_ ' + dataLocation.location.city + '\n'
							+ '_von:_ ' + dataMarketEntry.marketentry.dateFrom + '\n'
							+ '_bis:_ ' + dataMarketEntry.marketentry.dateTo + '\n'
							+ '_Wdh.:_ ' + dataMarketEntry.marketentry.datePeriodic + '\n\n'
			});
		},

		createFeedback: function(data){
			var that = this;

			APP.getDataManager().addFeedback(data, function( response ){
					
				if(response.feedback) {
					alert( that.getWording('form_feedbackSent') );
					that.close();
				}
				else {
					alert(that.getWording('form_fail'));
					that.loading(false);
				}

			});

			// to github
			// TODO read response to get created issue ID and post this ID as waffle link to slack
			APP.getDataManager().githubCreateIssue({
				type: 'feedback',
				data: data.feedback,
				metadata: JSON.stringify(data.feedback.metaData)
			});

			// to slack
			APP.getDataManager().sendToSlack({
				heading: 'Feedback von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
				message: data.feedback.message + '\n\n'
						+ '_' + JSON.stringify(data.feedback.metaData) + '_'
			});
		}
	}
});