qx.Class.define("LegendView", {
    
    extend : View,
	type: "singleton",

    properties: {
        categories: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('legendView');
        that.setCategories( APP.getConfig().categories);
        // that.setCategories( _.union( APP.getConfig().categoriesIni, APP.getConfig().categoriesMarket ) );
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            /////////////
            // Heading //
            /////////////
            that.headingContainer = $("<div />").addClass('heading');
            that.heading = $("<h2 />");
            that.headingContainer.append(that.heading);

            ///////////////////
            // Entity filter //
            ///////////////////
            that.filterModuleEntity  = $("<div />");
            that.filterModuleEntity.attr('class', 'filter-module');
            that.view.append(that.filterModuleEntity);

            // module heading
            var moduleHeading = $("<h3 />");
            moduleHeading.append('Entry types');
            that.filterModuleEntity.append(moduleHeading);

            //////////////////////
            // Categoriy filter //
            //////////////////////
            that.filterModuleCat  = $("<div />");
            that.filterModuleCat.attr('class', 'filter-module');
            that.view.append(that.filterModuleCat);

            // module heading
            var moduleHeading = $("<h3 />");
            moduleHeading.append('Categories');
            that.filterModuleCat.append(moduleHeading);

            // categories
            _.each( that.getCategories(), function(cat){
                
                // container
                var container = $("<div />");
                container.addClass('container');

                // cat container
                var catContainer = $("<div />");
                catContainer.addClass('cat-container');
                catContainer.addClass('cat-' + cat.name);
                
                    // icon
                    var icon = $("<div />");
                    icon.addClass('icon ' + 'cat-' + cat.name);
                    catContainer.append(icon);

                    icon.click(function(){ that.setFilter( {category: cat.name} ); });
                    
                    // label
                    that['label-' + cat.id] = $("<p />");
                    catContainer.append(that['label-' + cat.id]);

                    that['label-' + cat.id].click(function(){ that.setFilter( {category: cat.name} ); });
                    
                    container.append(catContainer);
                
                // sub cat container
                var subCatContainer = $("<div />");
                subCatContainer.addClass('subcat-container');
                subCatContainer.addClass('cat-' + cat.name);
                catContainer.append(subCatContainer);

                    // sub categories
                    // TODO replace dummy data
                    _.each( cat.sub, function(subcat){
                        
                        var subContainer = $("<div />");

                        // icon
                        var subIcon = $("<div />");
                        subIcon.addClass('icon ' + 'subcat-' + subcat.name);
                        subContainer.append(subIcon);

                        // label
                        that['label-' + subcat.id] = $("<p />");
                        subContainer.append(that['label-' + subcat.id]);
                        
                        subCatContainer.append(subContainer);

                    });
                    
                    container.append(subCatContainer);

                that.filterModuleCat.append(container);

            });

            createFilterResetBtn();
            function createFilterResetBtn(){
                // container
                var container = $("<div />");
                container.addClass('container filter-reset');
                
                // icon
                var icon = $("<div />");
                icon.addClass('icon');
                container.append(icon);

                // label
                that['label-filter-reset'] = $("<p />");
                container.append(that['label-filter-reset']);
                
                that.filterModuleCat.append(container);

                that['label-filter-reset'].click(function(){ that.resetFilter(); });
            }

            $('#main-container').append(that.view);

            this.base(arguments);

            that.load();
    	},

        load: function(){
            var that = this;

            _.each( that.getCategories(), function(cat){
                
                that['label-' + cat.id].append( that.getWording('cat_' + cat.name) );

                _.each( cat.sub, function(subcat){
                    that['label-' + subcat.id].append( that.getWording('cat_' + subcat.name) );
                });

            });

            that['label-filter-reset'].append( that.getWording('misc_filterReset') );
        },

        setFilter: function( filterOptions ){
            var that = this;

            // consequences
            // TODO close detailView if location gets unavailable
            // TODO if an unavailable location is selected inside the guides, the filter has to be disabled
            
            APP.setActiveFilter(filterOptions);
            that.say('filterSet');
        },

        resetFilter: function(){
            var that = this;

            APP.setActiveFilter(null);
            that.say('filterSet');
        },

        reset: function(){
            var that = this;

            _.each( that.getCategories(), function(cat){
                that['label-' + cat].empty();
            });

            that['label-filter-reset'].empty();
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
            that.listen('filterSet', function(){

                var filter = APP.getActiveFilter();

                if( filter ) {
                    
                    that.view.addClass('filter-active');  
                    
                    that.view.find('.icon').parent().addClass('inactive');
                    that.view.find('.icon.cat-' + filter.category).parent().removeClass('inactive');
                
                } else {
                
                    that.view.removeClass('filter-active');   
                    that.view.find('.icon').parent().removeClass('inactive');
                }

            });

            // that.menuBtn.click(function(){
            //     $('#main-container').addClass('shifted-left');
            // });

            // that.listen('curtainclicked', function(){
            //     $('#main-container').removeClass('shifted-left');
            // });
            
        },

        close: function(){
            var that = this;

            // TODO: only do in mobile version
            // that.addRequestBtn.css('display', 'none');
            // that.addOfferBtn.css('display', 'none');
        },

        changeLanguage: function(){
            var that = this;

            that.reset();
            that.load();
        }
    }

});