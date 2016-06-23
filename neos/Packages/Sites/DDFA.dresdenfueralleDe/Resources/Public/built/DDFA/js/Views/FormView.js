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
						name: {name: 'name', type: 'text', intoOwner: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						// subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'multiselect', values: APP.getConfig().languages, intoOwner: true},
						placename: {name: 'placename', type: 'text', intoLocation: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true}
					},
				marketentry:
					{
						offer: {name: 'offer', type: 'switch', intoOwner: true, values: [ [true, 'offer'], [false, 'request'] ]},
						name: {name: 'name', type: 'text', intoOwner: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						// subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'multiselect', values: APP.getConfig().languages, intoOwner: true},
						placename: {name: 'placename', type: 'text', intoLocation: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true},
						dateFrom: {name: 'dateFrom', type: 'date', intoOwner: true},
						dateTo: {name: 'dateTo', type: 'date', intoOwner: true},
						timeFrom: {name: 'timeFrom', type: 'time', intoOwner: true},
						timeTo: {name: 'timeTo', type: 'time', intoOwner: true}
					},
				event:
					{
						name: {name: 'name', type: 'text', intoOwner: true},
						category: {name: 'category', type: 'select', values: mainCategories, intoOwner: true },
						// subCategory: {name: 'subCategory', type: 'select', values: APP.getConfig().categories[0].sub, intoOwner: true },
						speakerPublic: {name: 'speakerPublic', type: 'text', intoOwner: true},
						mail: {name: 'mail', type: 'email', required: true, intoOwner: true},
						web: {name: 'web', type: 'url', intoOwner: true},
						facebook: {name: 'facebook', type: 'url', intoOwner: true},
						description: {name: 'description', type: 'textarea', required: true, intoOwner: true},
						forChildren: {name: 'forChildren', type: 'checkbox', intoOwner: true},
						supportWanted: {name: 'supportWanted', type: 'checkbox', intoOwner: true},
						phone: {name: 'phone', type: 'tel', intoOwner: true},
						spokenLanguages: {name: 'spokenLanguages', type: 'multiselect', values: APP.getConfig().languages, intoOwner: true},
						placename: {name: 'placename', type: 'text', intoLocation: true},
						street: {name: 'street', type: 'text', intoLocation: true},
						zip: {name: 'zip', type: 'text', intoLocation: true},
						city: {name: 'city', type: 'text', intoLocation: true},
						dateFrom: {name: 'dateFrom', type: 'date', intoOwner: true},
						dateTo: {name: 'dateTo', type: 'date', intoOwner: true},
						timeFrom: {name: 'timeFrom', type: 'time', intoOwner: true},
						timeTo: {name: 'timeTo', type: 'time', intoOwner: true}
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
			if( _.contains(['date', 'time'], property.type) ){
				
				if( APP.getUserDevice() == 'desktop' && !Modernizr.inputtypes.date ){
					inputEl = $("<input />")
						// .attr('type', property.type)
						.attr('data-format', 'YYYY-MM-DD')
						.attr('data-template', 'D MMM YYYY')
						.attr('name', property.name);
				} else {
					inputEl = $("<input />")
						.attr('type', 'text')
						.attr('name', property.name)
						.click(function(){
							if( $(this).attr('type') == 'text' )
								$(this).attr('type', property.type);
						});
				}
			}
			else if( _.contains( that.getHtml5InputTypes() , property.type ) ){
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
				inputEl = $("<select />")
					.attr('name', property.name);
			}
			// multiselect
			else if( property.type == 'multiselect' ){
				inputEl = $("<select />")
					.attr('name', property.name)
					.attr('multiple', true);
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

		createLocationButton: function( locationContainer ){
			var that = this;

			var btn = $('<button />')
				.append(that.getWording('form_locationBtn_add'))
				.click(function(e){
					e.preventDefault();
					
					// show addition input fields
					locationContainer.toggleClass('active');

					// change button
					if( locationContainer.hasClass('active') ){
						$(this).empty().append( that.getWording('form_locationBtn_remove') );
					}
					else {
						$(this).empty().append( that.getWording('form_locationBtn_add') );
						// empty additional input fields
						locationContainer.find('input').val('');
					}
				});

			return btn;
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

			// var subCatEl = that.createInput(properties.subCategory, type);
			// form.append(subCatEl);

			var descEl = that.createInput(properties.description, type);
			form.append(descEl);

			var forChildrenEl = that.createInput(properties.forChildren, type);
			form.append(forChildrenEl);

			var supportWantedEl = that.createInput(properties.supportWanted, type);
			form.append(supportWantedEl);

			var sectionHeader = $('<h3 />').append('Ortsangaben');
			form.append(sectionHeader);

			var notice = $('<p />').append('Falls dein Eintrag an einen bestimmten Ort geknüpft ist, kannst du diesen hier angeben. Die Angabe eines Ortes ist aber keine Pflicht.');
			form.append(notice);

			var locationContainer = $('<div />').addClass('location-container');
			form.append(locationContainer);

			var buttonContainer = $('<p />');
			var addLocationBtn = that.createLocationButton( locationContainer );
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var placenameEl = that.createInput(properties.placename, type);
			locationContainer.append(placenameEl);

			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append(that.getWording('form_text_contactinfo'));
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

			// var subCatEl = that.createInput(properties.subCategory, type);
			// form.append(subCatEl);

			var dateFromEl = that.createInput(properties.dateFrom, type);
			form.append(dateFromEl);

			var timeFromEl = that.createInput(properties.timeFrom, type);
			form.append(timeFromEl);

			var dateToEl = that.createInput(properties.dateTo, type);
			form.append(dateToEl);

			var timeToEl = that.createInput(properties.timeTo, type);
			form.append(timeToEl);

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
			var addLocationBtn = that.createLocationButton( locationContainer );
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var placenameEl = that.createInput(properties.placename, type);
			locationContainer.append(placenameEl);

			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append(that.getWording('form_text_contactinfo'));
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

			// var subCatEl = that.createInput(properties.subCategory, type);
			// form.append(subCatEl);

			var dateFromEl = that.createInput(properties.dateFrom, type);
			form.append(dateFromEl);

			var timeFromEl = that.createInput(properties.timeFrom, type);
			form.append(timeFromEl);

			var dateToEl = that.createInput(properties.dateTo, type);
			form.append(dateToEl);

			var timeToEl = that.createInput(properties.timeTo, type);
			form.append(timeToEl);

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
			var addLocationBtn = that.createLocationButton( locationContainer );
			buttonContainer.append(addLocationBtn);
			locationContainer.append(buttonContainer);

			var placenameEl = that.createInput(properties.placename, type);
			locationContainer.append(placenameEl);
			
			var streetEl = that.createInput(properties.street, type);
			locationContainer.append(streetEl);

			var zipEl = that.createInput(properties.zip, type);
			locationContainer.append(zipEl);

			var cityEl = that.createInput(properties.city, type);
			locationContainer.append(cityEl);

			var sectionHeader = $('<h3 />').append('Kontaktdaten');
			form.append(sectionHeader);

			var notice = $('<p />').append(that.getWording('form_text_contactinfo'));
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
					.attr('placeholder', that.getWording('form_placeholder_' + property.name) );

				// set label value if a lable exists
				if( that.forms[type].fields[property.name + '_label'] )
					that.forms[type].fields[property.name + '_label']
						.empty()
						.append(that.getWording('form_placeholder_' + property.name) );

				if( _.contains(['date', 'time'], property.type) ){
					if( APP.getUserDevice() == 'desktop' && !Modernizr.inputtypes.date ){
						that.forms[type].fields[property.name].hide();
						// that.forms[type].fields[property.name].combodate({
						// 	minYear: 2016,
					 //    maxYear: 2017,
					 //    minuteStep: 10
						// });
					}
				}
				// options in select + multiselect inputs
				else if( property.type == 'select' ){
					// remove all options
					that.forms[type].fields[property.name].empty();
					
					// add empty option
					var emptyOption = $('<option />')
						// .attr('selected', true)
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
				else if( property.type == 'multiselect' ){
					
					// remove all options
					that.forms[type].fields[property.name].empty();
					
					// placeholder for desktop (using "chosen" jQ plugin)
					that.forms[type].fields[property.name]
						.attr('data-placeholder', that.getWording('form_placeholder_' + property.name) );

					// TODO not working, because mobile browsers show "N selected" instead of placeholder or first option
					// placeholder for mobiles (using empty option, because placeholder is not natively supported for multi select)
					// if( APP.getUserDevice() != 'desktop' ){
					// 	var emptyOption = $('<option />')
					// 		.attr('value', '')
					// 		.append(that.getWording('form_placeholder_' + property.name));
					// 	that.forms[type].fields[property.name].append(emptyOption);
					// }

					_.each( property.values, function(value){
						
						var option = $("<option />");

						option.attr('value', value);
						option.append( that.getWording('lan_' + value) );

						that.forms[type].fields[property.name].append(option);
					});

					if( APP.getUserDevice() == 'desktop' )
						that.forms[type].fields[property.name].chosen();
				}
			});

			that.view.addClass('active');
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
					// if( value && (property.type == 'datetime' || property.type == 'datetime-local') ){
					// 	// convert to sql datetime
					// 	var d = new Date( value );
					// 	// value = d.toISOString().slice(0, 19).replace('T', ' ');
					// 	value = d.toISOString().slice(0, 19) + '+0200';
					// }
					if( property.type == 'checkbox' || property.type == 'switch' ){
						value = that.forms[type].fields[property.name].prop('checked');
					}
					else if( property.type == 'multiselect' && value ){
						value = value.join(",");
					}
					
					if(property.intoOwner) dataMarketEntry.marketentry[property.name] = value;
					if(property.intoLocation) dataLocation.location[property.name] = value;
				});

				dataMarketEntry.marketentry.type = that.getEntryTypeEnum()[type];
				dataMarketEntry.marketentry.published = false;

				// dataLocation.location.type = that.getEntryTypeEnum()[type];
				// dataLocation.location.published = false;

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

			var data_joined = _.extend(dataMarketEntry, dataLocation);

			APP.getDataManager().addMarketEntry(data_joined, function( response ){
				if(!response.marketentry){
					// that.thatResponseMessage().append( that.getWording('form_fail') );
					alert(that.getWording('form_fail'));
					that.loading(false);
					return;
				}

				// that.responseMessage.append( that.getWording('form_success') );
				alert(that.getWording('form_success'));
				that.close();

				// dataLocation.location['marketEntry'] = response.marketentry.persistenceObjectIdentifier;
				// APP.getDataManager().addLocation(dataLocation, function(){
				// 	// alert('marketLocation sent, thanks');
				// });
			});

			// create github issue
			APP.getDataManager().createGithubIssue({
				data: {
					type: 'entry',
					entryType: dataMarketEntry.marketentry.type,
					entryData: dataMarketEntry.marketentry,
					locationData: dataLocation.location
				}
			});

			// send outgoing message
			var entryTypes = { 0: 'Orga', 1: 'Börse', 2: 'Event'};

			// send slack message
			APP.getDataManager().createSlackMessage({
				// heading: type + ' von _' + dataMarketEntry.marketentry.speakerPublic + '_ (' + dataMarketEntry.marketentry.mail + ')',
				heading: function(){
					var entryTypeString = entryTypes[dataMarketEntry.marketentry.type];
					var marketTypeString = (dataMarketEntry.marketentry.offer) ? 'Angebot' : 'Gesuch';
					if( dataMarketEntry.marketentry.type == 1 ) entryTypeString += ' (' + marketTypeString + ')'
					return 'Neuer Eintrag: ' + entryTypeString + ' "' +dataMarketEntry.marketentry.name+ '"'
				}(),
				message: '```\n' + dataMarketEntry.marketentry.description + '\n```\n'
							+ 'für Kinder: `' + (dataMarketEntry.marketentry.forChildren ? 'ja' : 'nicht explizit') + '`\n'
							+ 'Unterstützer gesucht: `' + (dataMarketEntry.marketentry.supportWanted ? 'ja' : 'nein') + '`\n'
							+ 'Kontaktperson: `' + dataMarketEntry.marketentry.speakerPublic + '`\n'
							+ 'Sprachen: `' + dataMarketEntry.marketentry.spokenLanguages + '`\n'
							+ 'mail: `' + dataMarketEntry.marketentry.mail + '` '
							+ 'web: `' + dataMarketEntry.marketentry.web + '` '
							+ 'facebook: `' + dataMarketEntry.marketentry.facebook + '` '
							+ 'phone: `' + dataMarketEntry.marketentry.phone + '`\n'
							+ 'Ort: `' + dataLocation.location.placename + ', ' + dataLocation.location.street + ', ' + dataLocation.location.zip + ' ' + dataLocation.location.city + '`\n'
							+ 'von: `' + dataMarketEntry.marketentry.dateFrom + ' (' + dataMarketEntry.marketentry.timeFrom + ')' + '`\n'
							+ 'bis: `' + dataMarketEntry.marketentry.dateTo + ' (' + dataMarketEntry.marketentry.timeTo + ')' + '`\n\n'
			});

			// send mail to team inbox
			APP.getDataManager().sendMail({
				data: {
					mail_fromMail: 'bot@afeefa.de',
					mail_fromName: dataMarketEntry.marketentry.speakerPublic ? dataMarketEntry.marketentry.speakerPublic : 'Unbekannt',
					mail_to: 'redaktion@afeefa.de',
					mail_replyTo: dataMarketEntry.marketentry.mail,
					mail_subject: function(){
						var entryTypeString = entryTypes[dataMarketEntry.marketentry.type];
						var marketTypeString = (dataMarketEntry.marketentry.offer) ? 'Angebot' : 'Gesuch';
						if( dataMarketEntry.marketentry.type == 1 ) entryTypeString += ' (' + marketTypeString + ')'
						return '[Neuer Eintrag] ' + entryTypeString + ' "' +dataMarketEntry.marketentry.name+ '"';
					},
					mail_bodyPlain: dataMarketEntry.marketentry.description,
					mail_bodyHtml: function(){
						// var date = new Date();
						// var dateString = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
						var styles = '<style>table td {vertical-align:top; font-size: 0.8em;}</style>';
						var message = '<table border="0">'
							+ '<tr><td style="color: gray">Beschreibung:</td><td>' + dataMarketEntry.marketentry.description + '</td></tr>'
							+ '<tr><td style="color: gray">für Kinder geeignet:</td><td>' + (dataMarketEntry.marketentry.forChildren ? 'ja' : 'nicht explizit') + '</td></tr>'
							+ '<tr><td style="color: gray">Unterstützer gesucht:</td><td>' + (dataMarketEntry.marketentry.supportWanted ? 'ja' : 'nein') + '</td></tr>'
							+ '<tr><td style="color: gray">Kontaktperson:</td><td>' + dataMarketEntry.marketentry.speakerPublic + '</td></tr>'
							+ '<tr><td style="color: gray">Sprachen:</td><td>' + dataMarketEntry.marketentry.spokenLanguages + '</td></tr>'
							+ '<tr><td style="color: gray">Mail:</td><td>' + dataMarketEntry.marketentry.mail + '</td></tr>'
							+ '<tr><td style="color: gray">Website:</td><td>' + dataMarketEntry.marketentry.web + '</td></tr>'
							+ '<tr><td style="color: gray">facebook:</td><td>' + dataMarketEntry.marketentry.facebook + '</td></tr>'
							+ '<tr><td style="color: gray">Telefon:</td><td>' + dataMarketEntry.marketentry.phone + '</td></tr>'
							+ '<tr><td style="color: gray">Ort:</td><td>' + dataLocation.location.placename + ', ' + dataLocation.location.street + ', ' + dataLocation.location.zip + ' ' + dataLocation.location.city + '</td></tr>'
							+ '<tr><td style="color: gray">von:</td><td>' + dataMarketEntry.marketentry.dateFrom + ' (' + dataMarketEntry.marketentry.timeFrom + ')' + '</td></tr>'
							+ '<tr><td style="color: gray">bis:</td><td>' + dataMarketEntry.marketentry.dateTo + ' (' + dataMarketEntry.marketentry.timeTo + ')' + '</td></tr>'
							+ '</table>';
						return styles + message;
					}
				}
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
			APP.getDataManager().createGithubIssue({
				data: {
					type: 'feedback',
					feedbackData: data.feedback,
					metaData: JSON.stringify(data.feedback.metaData)
				}
			});

			// to slack
			APP.getDataManager().createSlackMessage({
				heading: 'Feedback von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
				message: '```\n' + data.feedback.message + '\n```\n\n'
						+ '_' + JSON.stringify(data.feedback.metaData) + '_'
			});

			// send mail to team inbox
			APP.getDataManager().sendMail({
				data: {
					mail_fromMail: 'bot@afeefa.de',
					mail_fromName: data.feedback.author,
					mail_to: 'team@afeefa.de',
					mail_replyTo: data.feedback.mail,
					mail_subject: '[Feedback] ' + data.feedback.author,
					mail_bodyPlain: data.feedback.message,
					mail_bodyHtml: function(){
						// var date = new Date();
						// var dateString = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
						return '<p><i>' + data.feedback.message + '</i></p>';
					}
				}
			});

		}
	}
});