qx.Class.define("PlusView", {
    
    extend : View,
	type: "singleton",

    properties: {
        propertiesMarket: {},
        propertiesFeedback: {},
        inputTypes: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('plusView');
        that.setPropertiesMarket([
                {name: 'name', type: 'text'},
                {name: 'category', type: 'select', values: APP.getConfig().categoriesMarket },
                {name: 'speakerPublic', type: 'text'},
                {name: 'mail', type: 'email'},
                {name: 'web', type: 'url'},
                {name: 'facebook', type: 'url'},
                {name: 'description', type: 'textarea'},
                {name: 'phone', type: 'tel'},
                {name: 'spokenLanguages', type: 'text'},
                // {name: 'supportWanted', type: 'text'},
                // {name: 'offer', type: 'text'},
                {name: 'datefrom', type: 'date'},
                {name: 'dateto', type: 'date'},
                {name: 'dateday', type: 'datetime-local'},
                {name: 'datePeriodic', type: 'select', values: ['daily', 'weekly', 'monthly'] }
            ]
        );

        that.setInputTypes( ['text', 'number', 'range', 'url', 'email', 'tel', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local'] );
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // add buttons
            that.feedbackBtn = $("<div />");
            that.feedbackBtn.addClass('btn feedbackBtn');
            that.view.append(that.feedbackBtn);

            that.requestBtn = $("<div />");
            that.requestBtn.addClass('btn requestBtn');
            that.view.append(that.requestBtn);

            that.offerBtn = $("<div />");
            that.offerBtn.addClass('btn offerBtn');
            that.view.append(that.offerBtn);
            
            // plus button
            that.plusBtn = $("<div />");
            that.plusBtn.addClass('btn plusBtn');
            that.view.append(that.plusBtn);
            
            // form
            that.renderForm();

            $('#main-container').append(that.view);

            this.base(arguments);
    	},

        renderForm: function(){
            var that = this;

            that.formContainer = $("<div />").addClass('form');

             // heading
            that.headingContainer = $("<div />").addClass('heading');
            
            that.heading = $("<h1 />");
            that.headingContainer.append(that.heading);

            that.formContainer.append(that.headingContainer);

            // scrollable content container
            var scrollContainer = $("<div />").addClass('scroll-container');
            that.formContainer.append(scrollContainer);
            
            ////////////////////
            // image property //
            ////////////////////
            // that.imageContainer = $("<div />").addClass('image');
            
            // that.image = $("<img />");
            // that.imageContainer.append(that.image);

            // scrollContainer.append(that.imageContainer);
            
            //////////////////////
            // other properties //
            //////////////////////
            
            that.form = $("<form />");
            scrollContainer.append(that.form);

            // generic
            _.each( that.getPropertiesMarket(), function(prop){

                // html5 input types
                if( _.contains( that.getInputTypes() , prop.type ) ){

                    that['field_'+prop.name] = $("<input />")
                        .attr('type', prop.type)
                        .attr('name', prop.name);

                } 
                // select
                else if( prop.type == 'select' ){

                    that['field_'+prop.name] = $("<select />");
                    _.each( prop.values, function(value){
                        var option = $("<option />").attr('value', value);
                        that['field_'+prop.name].append(option);
                        that['field_'+prop.name].attr('name', prop.name);
                    });

                }
                // textarea
                else if( prop.type == 'textarea' ){

                    that['field_'+prop.name] = $("<textarea />")
                        .attr('name', prop.name);

                }
                else {

                    that['field_'+prop.name] = $("<input />").attr('type', 'text')
                        .attr('name', prop.name);

                }

                that.form.append(that['field_'+prop.name]);

            });

            that.sendBtn = $("<button />");
            that.form.append(that.sendBtn);

            that.view.append(that.formContainer);
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            

            // that.listen('mapclicked', function(){
            //     that.close();
            // });
            
            that.offerBtn.click(function(){
               that.formContainer.addClass('active');
            });

        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.requestBtn.css('display', 'none');
            // that.offerBtn.css('display', 'none');
        }
    }

});