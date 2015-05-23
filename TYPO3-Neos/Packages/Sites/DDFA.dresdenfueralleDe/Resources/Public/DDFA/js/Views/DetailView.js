qx.Class.define("DetailView", {
    
    extend : qx.core.Object,
	type: "singleton",

    construct: function(){
    	var that = this;

    	that.render();
    },

    members : {
        
    	render: function(){
    		var that = this;

    		// view container
            that.view = $("<div />");
            that.view.attr('id', 'detailView');

            // heading
            var headingContainer = $("<div />").addClass('heading');
            
            that.heading = $("<h1 />");
            headingContainer.append(that.heading);

            that.view.append(headingContainer);

            ////////////////////
            // image property //
            ////////////////////
            that.imageContainer = $("<div />").addClass('image');
            
            that.image = $("<img />");
            that.imageContainer.append(that.image);

            that.view.append(that.imageContainer);
            
            //////////////////////
            // other properties //
            //////////////////////
            
            // category
            that.catContainer = $("<div />").addClass('property category');
            
            that.catIcon = $("<div />").addClass('cat-icon');
            that.catContainer.append(that.catIcon);

            var catText = $("<div />").addClass('cat-text');
            that.catName = $("<p />").addClass('cat-name');
            that.catInfo = $("<p />").addClass('cat-info');
            catText.append(that.catName);
            catText.append(that.catInfo);
            that.catContainer.append(catText);
            
            that.view.append(that.catContainer)


            $('body').append(that.view);
        },

        load: function( record ){
            var that = this;
            
            if(that.record) {
                if(that.record === record) {
                    that.reset();
                    that.close();
                    return;
                }
                that.reset();
            }

            // set current record
            that.record = record;

            // record type
            that.view.addClass('type-' + record.type);
            
            // heading
            that.heading.empty().append(record.name);

            ////////////////////
            // image property //
            ////////////////////
            var imagePath = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/img/';
            if( record.image ) {
                that.imageContainer.css('height', that.view.innerWidth()*0.6);
                that.imageContainer.addClass(record.image.type);
                that.imageContainer.show();

                that.image.attr('src', imagePath + record.image.src);
            }

            //////////////////////
            // other properties //
            //////////////////////
            
            // category
            that.catIcon.addClass('cat-' + record.category.name);
            that.catName.append(record.category.name);
            var info = (record.type !== 1) ? 'official entry' : 'private entry';
            that.catInfo.append(info);
            that.catContainer.show();

            // show DetailView
            that.view.addClass('active');
        },

        reset: function() {
            var that = this;

            that.view.removeClass('type-0 type-1 type-2 type-3');

            that.imageContainer.hide();
            that.imageContainer.removeClass('logo photo');

            // remove category info
            that.catContainer.hide();
            var categories = APP.getConfig().categories;
            _.each(categories, function(cat){
                that.catIcon.removeClass('cat-' + cat);
            });
            that.catName.empty();
            that.catInfo.empty();
            
            that.record = null;
        },

        close: function() {
            var that = this;
            that.view.removeClass('active');
        },

        changeLanguage: function(){

            // request that.record's entryId in current locale
            var recordRelocalized;
            // recordRelocalized = 

            // load new record
            that.load(recordRelocalized);
        }
    }

});