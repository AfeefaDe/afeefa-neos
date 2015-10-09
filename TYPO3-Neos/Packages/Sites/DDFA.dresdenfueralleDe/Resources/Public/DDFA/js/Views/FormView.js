qx.Class.define("FormView", {
    
    extend : View,
	type: "singleton",

    properties: {
        formTypes: {},
        currentFormType: {},
        propertiesMarket: {},
        propertiesFeedback: {},
        html5InputTypes: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('formView');
        
        that.setLoadable(true);
        
        that.setFormTypes({
            "initiative": 0,
            "marketOffer": 1,
            "marketRequest": 2,
            "event": 3,
            "basic": 4,
            "feedback": 5
        });

        that.setPropertiesMarket(
            [
                {name: 'name', type: 'text', required: true, intoMarketEntry: true, intoLocation: true},
                // TODO categories auch als arrays [identifier, label]
                // {name: 'category', type: 'select', values: APP.getConfig().categoriesMarket },
                {name: 'category', type: 'select', required: true, intoMarketEntry: true, values: [
                    ['df402493-f467-4472-8b98-9038d2ac967e', 'consultation'],
                    ['fa815876-ad1d-433e-87ff-8de20639e2b1', 'medic'],
                    ['5dddf63d-ccf6-44e2-8daf-81bb44507fdd', 'german'],
                    ['d29bbe86-ecd6-42df-8054-70a90ec7b535', 'jobs'],
                    ['adfb2457-819c-4574-ace1-56f5b38d8f96', 'leisure'],
                    ['b63f01d2-3573-48dc-83a5-6c9577cfbc6b', 'translation'],
                    ['12914a3d-0cb5-4646-be56-3f671d737977', 'children'],
                    ['744f41e9-799c-432b-a9a3-e78d471ec51a', 'donation'],
                    ['07f88130-7d98-4a20-bbb8-d0d98f55c553', 'community'],
                    ['5cd18ce7-923d-47ff-af66-7f4286f420d0', 'other']
                ] },
                {name: 'speakerPublic', type: 'text', intoMarketEntry: true},
                {name: 'mail', type: 'email', required: true, intoMarketEntry: true},
                {name: 'web', type: 'url', intoMarketEntry: true},
                {name: 'facebook', type: 'url', intoMarketEntry: true},
                {name: 'description', type: 'textarea', required: true, intoMarketEntry: true},
                {name: 'phone', type: 'tel', intoMarketEntry: true},
                {name: 'spokenLanguages', type: 'text', intoMarketEntry: true},
                {name: 'street', type: 'text', intoLocation: true},
                {name: 'zip', type: 'text', intoLocation: true},
                {name: 'city', type: 'text', intoLocation: true},
                {name: 'dateFrom', type: 'date', intoMarketEntry: true},
                {name: 'dateTo', type: 'date', intoMarketEntry: true},
                // {name: 'dateday', type: 'datetime-local'},
                {name: 'datePeriodic', type: 'select', intoMarketEntry: true, values: [ [0, 'daily'], [1, 'weekly'], [2, 'secondWeekly'], [3, 'monthly'] ] }
            ]
        );

        that.setPropertiesFeedback(
            [
                {name: 'author', type: 'text', required: true},
                {name: 'mail', type: 'email', required: true},
                {name: 'message', type: 'textarea', required: true}
            ]
        );

        that.setHtml5InputTypes( ['text', 'number', 'range', 'url', 'email', 'tel', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local'] );
    },

    members : {
        
        render: function(){
            var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // TODO: remove this IE css hack when possible
            if( L.Browser.ie ) that.view.css('overflow', 'auto');

            $('#main-container').append(that.view);

             // heading
            that.headingContainer = $("<div />").addClass('heading');
            
            that.heading = $("<h1 />");
            that.headingContainer.append(that.heading);

            that.view.append(that.headingContainer);

            // scrollable content container
            var scrollContainer = $("<div />").addClass('scroll-container');
            that.view.append(scrollContainer);
            
            //////////////////////
            // response message //
            //////////////////////
            that.responseMessage = $("<p />").addClass('message');
            that.view.append(that.responseMessage);

            ///////////
            // form  //
            ///////////
            that.form = $("<form />");
            scrollContainer.append(that.form);

            // create input fields (generic)
            // var allProperties = _.union( that.getPropertiesMarket(), that.getPropertiesFeedback() );
            that.allInputLabels = [];
            that.allInputFields = [];

            createForm( that.getFormTypes().marketOffer, that.getPropertiesMarket() );
            createForm( that.getFormTypes().marketRequest, that.getPropertiesMarket() );
            createForm( that.getFormTypes().feedback, that.getPropertiesFeedback() );

            function createForm( type, properties ){

                _.each( properties, function(prop){

                    ////////////
                    // labels //
                    ////////////
                    that[type + '_label_'+prop.name] = $("<label />")
                        .attr('name', prop.name);
                    
                    that.allInputLabels.push( that[type + '_label_'+prop.name] );
                    
                    that.form.append(that[type + '_label_'+prop.name]);

                    ///////////////////////
                    // html5 input types //
                    ///////////////////////
                    if( _.contains( that.getHtml5InputTypes() , prop.type ) ){

                        that[type + '_field_'+prop.name] = $("<input />")
                            .attr('type', prop.type)
                            .attr('name', prop.name);

                    } 
                    // select
                    else if( prop.type == 'select' ){

                        that[type + '_field_'+prop.name] = $("<select />");
                        
                        // TODO empty option
                        if(!prop.required)
                            var emptyOption = $('<option />')
                                // .attr('disabled', true)
                                .attr('selected', true)
                                .append('');

                        that[type + '_field_'+prop.name].append(emptyOption);
                        
                        _.each( prop.values, function(value){
                        
                            var option = $("<option />")
                                .attr('value', value[0]);
                            
                            // TODO verarbeite select values as arrays [value, label]
                            if( prop.name == 'category'){ option.append( that.getWording('cat_' + value[1]) ); }
                            else if( prop.name == 'datePeriodic'){ option.append( that.getWording('prop_' + prop.name + '_' + value[1]) ); }
                            // else if( prop.name == 'spokenLanguages'){ option.append( that.getWording('lang_' + value[1]) ); }
                            else { option.append( that.getWording('form_' + value[1]) ); }
                            
                            that[type + '_field_'+prop.name].append(option);
                            that[type + '_field_'+prop.name].attr('name', prop.name);
                        });

                    }
                    // textarea
                    else if( prop.type == 'textarea' ){

                        that[type + '_field_'+prop.name] = $("<textarea />")
                            .attr('name', prop.name)
                            .attr('rows', 5);

                    }
                    else {

                        that[type + '_field_'+prop.name] = $("<input />").attr('type', 'text')
                            .attr('name', prop.name);

                    }

                    // general properties
                    if(prop.required) that[type + '_field_'+prop.name].attr('required', true);
                    
                    that[type + '_field_'+prop.name].addClass(prop.name);
                    that[type + '_label_'+prop.name].addClass(prop.name);

                    that.allInputFields.push( that[type + '_field_'+prop.name] );

                    that.form.append(that[type + '_field_'+prop.name]);

                });

            }

            that.sendBtn = $("<button />")
                .addClass('sendBtn')
                .append( that.getWording('form_sendBtn') );
            that.form.append(that.sendBtn);
            
            that.cancelBtn = $("<button />")
                .addClass('cancelBtn')
                .append( that.getWording('form_cancelBtn') );
            that.form.append(that.cancelBtn);

            this.base(arguments);
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.form.submit(function(e){
                e.preventDefault();
                that.sendForm();
            });

            // that.listen('mapclicked', function(){
            //     that.closeSoftly();
            // });

            that.cancelBtn.click(function(e){
                e.preventDefault();
                that.close();
            });

        },

        load: function( type ){
            var that = this;

            that.reset();

            if( type == that.getFormTypes().marketOffer ){
                
                that.setCurrentFormType( that.getFormTypes().marketOffer );
                that.view.addClass('marketOffer');

                that.heading.append( that.getWording('form_newMarketOffer') );

                _.each( that.getPropertiesMarket(), function(prop){

                    that[type + '_label_'+prop.name]
                        .show()
                        .append( that.getWording('prop_' + prop.name) );

                    if(prop.required) that[type + '_field_'+prop.name].attr('required', true);

                    that[type + '_field_'+prop.name].show();

                });

            }
            else if( type == that.getFormTypes().marketRequest ){

                that.setCurrentFormType( that.getFormTypes().marketRequest );
                that.view.addClass('marketRequest');

                that.heading.append( that.getWording('form_newMarketRequest') );

                _.each( that.getPropertiesMarket(), function(prop){

                    that[type + '_label_'+prop.name]
                        .show()
                        .append( that.getWording('prop_' + prop.name) );
                    
                    if(prop.required) that[type + '_field_'+prop.name].attr('required', true);

                    that[type + '_field_'+prop.name].show();

                });

            }
            else if( type == that.getFormTypes().feedback ){

                that.setCurrentFormType( that.getFormTypes().feedback );
                that.view.addClass('feedback');
                
                that.heading.append( that.getWording('form_feedback') );

                _.each( that.getPropertiesFeedback(), function(prop){
                    
                    that[type + '_label_'+prop.name]
                        .show()
                        .append( that.getWording('prop_' + prop.name) );
                    
                    if(prop.required) that[type + '_field_'+prop.name].attr('required', true);
                    
                    that[type + '_field_'+prop.name].show();

                });
            }
            else {
                console.warn('formType not configured');
            }

            that.view.addClass('active');

            // TODO dirty fix for IE
            if( !Modernizr.inputtypes.date ) that.view.find('.dateFrom, .dateTo, .datePeriodic').hide();
        },

        reset: function(){
            var that = this;

            // TODO: generalize!
            that.view.removeClass('initiative marketOffer marketRequest event basic feedback');

            that.heading.empty();

            that.responseMessage.empty();

            // var allProperties = _.union( that.getPropertiesMarket(), that.getPropertiesFeedback() );
            _.each( that.allInputLabels, function(label){
                label.hide();
                label.empty();
            });

            _.each( that.allInputFields, function(input){
                input.hide();
                input.val(null);
                input.removeAttr('required');
            });

            that.loading(false);
        },

        close: function(){
            var that = this;

            that.view.removeClass('active');
            that.reset();
        },

        closeSoftly: function(){
            var that = this;

            that.view.removeClass('active');
        },

        sendForm: function(){
            var that = this;

            // adaption for val() on textareas:
             // $.valHooks.textarea = {
             //      get: function( elem ) {
             //        return elem.value.replace( /\r?\n/g, "\r\n" );
             //      }
             //    };

             //    $.fn.textarea = function()
             //    {
             //        this.each(function() {
             //            this.type = 'textarea';
             //        });
             //        return this;
             //    }

            that.loading(true);

            var type = that.getCurrentFormType();

            if( type == that.getFormTypes().marketOffer ){

                var data = { "marketentry": {} };
                var dataLocation = { "location": {} };

                _.each( that.getPropertiesMarket(), function(prop){
                    
                    if(prop.intoMarketEntry) data.marketentry[prop.name] = that[type + '_field_'+prop.name].val();

                    if(prop.intoLocation) dataLocation.location[prop.name] = that[type + '_field_'+prop.name].val();

                });

                // TODO define metaData property in data model
                // data.marketentry.metaData = L.Browser;

                // TODO date dummy data, because it's required by the model, which becomes obsolete as soon as the model allows empty date properties
                // if( data.marketentry.dateFrom.length == 0) data.marketentry.dateFrom = '1854-01-01T00:00:00+0200';
                if( data.marketentry.dateFrom.length && data.marketentry.dateFrom.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateFrom += 'T00:00:00+0200';
                // if( data.marketentry.dateTo.length == 0) data.marketentry.dateTo = '1854-01-01T00:00:00+0200';
                if( data.marketentry.dateFrom.length && data.marketentry.dateTo.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateTo += 'T00:00:00+0200';
                // if( !data.marketentry.datePeriodic ) data.marketentry.datePeriodic = '999';
                // data.marketentry.dateDay = new Date(data.marketentry.dateFrom).getDay();

                data.marketentry.offer = true;
                data.marketentry.published = false;
                
                dataLocation.location.type = 1;
                dataLocation.location.published = false;

                createMarketEntry(data, dataLocation);

            }
            else if( type == that.getFormTypes().marketRequest ){
                
                var data = { "marketentry": {} };
                var dataLocation = { "location": {} };

                _.each( that.getPropertiesMarket(), function(prop){
                    
                    if(prop.intoMarketEntry) data.marketentry[prop.name] = that[type + '_field_'+prop.name].val();

                    if(prop.intoLocation) dataLocation.location[prop.name] = that[type + '_field_'+prop.name].val();

                });

                // TODO define metaData property in data model
                // data.marketentry.metaData = L.Browser;

                // TODO date dummy data, because it's required by the model, which becomes obsolete as soon as the model allows empty date properties
                // if( data.marketentry.dateFrom.length == 0) data.marketentry.dateFrom = '1854-01-01T00:00:00+0200';
                if( data.marketentry.dateFrom.length && data.marketentry.dateFrom.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateFrom += 'T00:00:00+0200';
                // if( data.marketentry.dateFrom.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateFrom += 'T00:00:00+0200';
                // if( data.marketentry.dateTo.length == 0) data.marketentry.dateTo = '1854-01-01T00:00:00+0200';
                if( data.marketentry.dateFrom.length && data.marketentry.dateTo.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateTo += 'T00:00:00+0200';
                // if( data.marketentry.dateTo.indexOf('T00:00:00+0200') < 0 ) data.marketentry.dateTo += 'T00:00:00+0200';
                // if( !data.marketentry.datePeriodic ) data.marketentry.datePeriodic = '999';
                // data.marketentry.dateDay = new Date(data.marketentry.dateFrom).getDay();
                
                data.marketentry.offer = false;
                data.marketentry.published = false;
                
                dataLocation.location.type = 1;
                dataLocation.location.published = false;

                createMarketEntry(data, dataLocation);

            }
            else if( type == that.getFormTypes().feedback ){

                var data = { "feedback": {} };
                
                _.each( that.getPropertiesFeedback(), function(prop){
                    data.feedback[prop.name] = that[type + '_field_'+prop.name].val();
                });

                data.feedback.metaData = L.Browser;

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

            function createMarketEntry(data, dataLocation){

                APP.getDataManager().addMarketEntry(data, function( response ){
                    
                    if(!response.marketentry){
                        // that.thatResponseMessage().append( that.getWording('form_fail') );
                        alert(that.getWording('form_fail'));
                        that.loading(false);
                        return;
                    }

                    // that.responseMessage.append( that.getWording('form_success') );
                    alert(that.getWording('form_success'));
                    that.close();

                    dataLocation.location['marketEntry'] = response.marketentry.identifier;
                    APP.getDataManager().addLocation(dataLocation, function(){
                        // alert('marketLocation sent, thanks');
                    });

                });

                // to github
                APP.getDataManager().githubCreateIssue({
                    type: 'marketentry',
                    data: _.extend({}, data.marketentry, dataLocation.location)
                });

                // to slack
                var type = (data.marketentry.offer) ? 'Angebot' : 'Gesuch';
                APP.getDataManager().sendToSlack({
                    heading: type + ' von _' + data.marketentry.speakerPublic + '_ (' + data.marketentry.mail + ')',
                    message:    '_Titel:_ ' + data.marketentry.name + '\n'
                                + '_Beschreibung:_ ' + data.marketentry.description + '\n'
                                + '_web:_ ' + data.marketentry.web + '\n'
                                + '_facebook:_ ' + data.marketentry.facebook + '\n'
                                + '_phone:_ ' + data.marketentry.phone + '\n'
                                + '_Sprachen:_ ' + data.marketentry.spokenLanguages + '\n'
                                + '_Str:_ ' + dataLocation.location.street + '\n'
                                + '_PLZ:_ ' + dataLocation.location.zip + '\n'
                                + '_Ort:_ ' + dataLocation.location.city + '\n'
                                + '_von:_ ' + data.marketentry.dateFrom + '\n'
                                + '_bis:_ ' + data.marketentry.dateTo + '\n'
                                + '_Wdh.:_ ' + data.marketentry.datePeriodic + '\n\n'
                });

            }

        }
    }

});