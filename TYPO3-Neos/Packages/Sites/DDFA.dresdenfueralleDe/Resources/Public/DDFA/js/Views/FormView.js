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
                {name: 'name', type: 'text', intoLocation: true},
                {name: 'category', type: 'select', values: APP.getConfig().categoriesMarket },
                {name: 'speakerPublic', type: 'text'},
                {name: 'mail', type: 'email'},
                {name: 'web', type: 'url'},
                {name: 'facebook', type: 'url'},
                {name: 'description', type: 'textarea'},
                {name: 'phone', type: 'tel'},
                {name: 'spokenLanguages', type: 'text'},
                {name: 'street', type: 'text', intoLocation: true},
                {name: 'zip', type: 'text', intoLocation: true},
                {name: 'city', type: 'text', intoLocation: true},
                {name: 'datefrom', type: 'date'},
                {name: 'dateto', type: 'date'},
                // {name: 'dateday', type: 'datetime-local'},
                {name: 'datePeriodic', type: 'select', values: ['daily', 'weekly', 'monthly'] }
            ]
        );

        that.setPropertiesFeedback(
            [
                {name: 'author', type: 'text'},
                {name: 'mail', type: 'email'},
                {name: 'message', type: 'textarea'}
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

                    // labels
                    that[type + '_label_'+prop.name] = $("<label />")
                        .attr('name', prop.name);
                    
                    that.allInputLabels.push( that[type + '_label_'+prop.name] );
                    
                    that.form.append(that[type + '_label_'+prop.name]);

                    // html5 input types
                    if( _.contains( that.getHtml5InputTypes() , prop.type ) ){

                        that[type + '_field_'+prop.name] = $("<input />")
                            .attr('type', prop.type)
                            .attr('name', prop.name);

                    } 
                    // select
                    else if( prop.type == 'select' ){

                        that[type + '_field_'+prop.name] = $("<select />");
                        
                        _.each( prop.values, function(value){
                        
                            var option = $("<option />")
                                .attr('value', value);
                            
                            if( prop.name == 'category'){ option.append( that.getWording('cat_' + value) ); }
                            else if( prop.name == 'datePeriodic'){ option.append( that.getWording('prop_' + prop.name + '_' + value) ); }
                            // else if( prop.name == 'spokenLanguages'){ option.append( that.getWording('lang_' + value) ); }
                            else { option.append( that.getWording('form_' + value) ); }
                            
                            that[type + '_field_'+prop.name].append(option);
                            that[type + '_field_'+prop.name].attr('name', prop.name);
                        });

                    }
                    // textarea
                    else if( prop.type == 'textarea' ){

                        that[type + '_field_'+prop.name] = $("<textarea />")
                            .attr('name', prop.name);

                    }
                    else {

                        that[type + '_field_'+prop.name] = $("<input />").attr('type', 'text')
                            .attr('name', prop.name);

                    }

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
            
            that.sendBtn.click(function(e){
                e.preventDefault();
                that.sendForm();
            });

            // that.listen('mapclicked', function(){
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

                    that[type + '_field_'+prop.name].show()

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
                    
                    that[type + '_field_'+prop.name].show();

                });
            }
            else {
                console.warn('formType not configured');
            }

            that.view.addClass('active');
        },

        reset: function(){
            var that = this;

            // TODO: generalize!
            that.view.removeClass('initiative marketOffer marketRequest event basic feedback');

            that.heading.empty();

            // var allProperties = _.union( that.getPropertiesMarket(), that.getPropertiesFeedback() );
            _.each( that.allInputLabels, function(label){
                label.hide();
                label.empty();
            });

            _.each( that.allInputFields, function(input){
                input.hide();
                input.val(null);
            });
        },

        close: function(){
            var that = this;

            that.view.removeClass('active');
            that.reset();
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

            var type = that.getCurrentFormType();

            if( type == that.getFormTypes().marketOffer ){

                var data = { "marketentry": {} };
                var dataLocation = { "location": {} };

                _.each( that.getPropertiesMarket(), function(prop){
                    
                    data.marketentry[prop.name] = that[type + '_field_'+prop.name].val();

                    if(prop.intoLocation) dataLocation.location[prop.name] = that[type + '_field_'+prop.name].val();

                });

                data.marketentry.offer = true;
                data.marketentry.released = false;
                
                dataLocation.location.type = 1;
                dataLocation.location.released = false;

                APP.getDataManager().addMarketEntry(data, function( response ){
                    alert('marketOffer sent, thanks');
                    
                    dataLocation.marketentry = response.marketentry.identifier;
                    APP.getDataManager().addLocation(dataLocation, function(){
                        alert('marketLocation sent, thanks');
                    });

                });


            }
            else if( type == that.getFormTypes().marketRequest ){
                
                var data = { "marketentry": {} };
                var dataLocation = { "location": {} };

                _.each( that.getPropertiesMarket(), function(prop){
                    
                    data.marketentry[prop.name] = that[type + '_field_'+prop.name].val();

                    if(prop.intoLocation) dataLocation.location[prop.name] = that[type + '_field_'+prop.name].val();

                });

                data.marketentry.offer = false;
                data.marketentry.released = false;
                
                dataLocation.location.type = 1;
                dataLocation.location.released = false;

                APP.getDataManager().addMarketEntry(data, function( response ){
                    alert('marketRequest sent, thanks');
                    
                    dataLocation.marketentry = response.marketentry.identifier;
                    APP.getDataManager().addLocation(dataLocation, function(){
                        alert('marketLocation sent, thanks');
                    });

                });


            }
            else if( type == that.getFormTypes().feedback ){

                var data = { "feedback": {} };
                
                _.each( that.getPropertiesFeedback(), function(prop){
                    data.feedback[prop.name] = that[type + '_field_'+prop.name].val();
                });

                data.feedback.metaData = L.Browser;

                APP.getDataManager().addFeedback(data, function(){
                    alert('feedback sent, thanks');
                });

            }

        }
    }

});