qx.Class.define("PlusView", {
    
    extend : View,
	type: "singleton",

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
            that.view.append(that.formContainer);

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
            
            // generic
            var properties = _.union( ['category', 'location'], APP.getConfig().simpleProperties );
            _.each(properties, function(prop){

                that['propertyContainer'+prop] = $("<div />").addClass('property ' + prop);
                
                that['propertyIcon'+prop] = $("<div />").addClass('property-icon');
                that['propertyContainer'+prop].append(that['propertyIcon'+prop]);
                
                var catText = $("<div />").addClass('property-text');
                that['propertyName'+prop] = $("<p />").addClass('property-name');
                that['propertyValue'+prop] = $("<p />").addClass('property-value');
                catText.append(that['propertyName'+prop]);
                catText.append(that['propertyValue'+prop]);
                that['propertyContainer'+prop].append(catText);
                
                scrollContainer.append(that['propertyContainer'+prop]);

            });

            $('#main-container').append(that.view);
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.listen('mapclicked', function(){
                that.close();
            });

            // that.plusBtn.click(function(){
            //    that.$offerBtn.addClass('active');
            // });
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.requestBtn.css('display', 'none');
            // that.offerBtn.css('display', 'none');
        }
    }

});