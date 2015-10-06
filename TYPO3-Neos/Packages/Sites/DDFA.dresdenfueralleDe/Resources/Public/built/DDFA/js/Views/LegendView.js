qx.Class.define("LegendView", {
    
    extend : View,
	type: "singleton",

    properties: {
        categories: {}
    },

    construct: function(){
    	var that = this;

        that.setViewId('legendView');
        that.setCategories( _.union( APP.getConfig().categoriesIni, APP.getConfig().categoriesMarket ) );
    },

    members : {
        
    	render: function(){
    		var that = this;

            // view container
            that.view = $("<div />");
            that.view.attr('id', that.getViewId());

            // menu button
            // that.menuBtn = $("<div />");
            // that.menuBtn.addClass('menu-btn');
            // that.view.append(that.menuBtn);

            // legend
            that.legend  = $("<div />");
            that.legend.attr('id', 'legend');
            that.view.append(that.legend);

            // buttons
            _.each( that.getCategories(), function(cat){
                
                // container
                var container = $("<div />");
                container.addClass('container');
                
                // symbol
                var btn = $("<div />");
                btn.addClass('btn ' + 'cat-' + cat);
                container.append(btn);

                // label
                that['label-' + cat] = $("<p />");
                container.append(that['label-' + cat]);
                
                that.legend.append(container);

                btn.click(function(){ that.setFilter( {category: cat} ); });
                that['label-' + cat].click(function(){ that.setFilter( {category: cat} ); });

            });

            createFilterResetBtn();
            function createFilterResetBtn(){
                // container
                var container = $("<div />");
                container.addClass('container filter-reset');
                
                // symbol
                var btn = $("<div />");
                btn.addClass('btn');
                container.append(btn);

                // label
                that['label-filter-reset'] = $("<p />");
                container.append(that['label-filter-reset']);
                
                that.legend.append(container);

                that['label-filter-reset'].click(function(){ that.resetFilter(); });
            }

            $('#main-container').append(that.view);

            this.base(arguments);

            that.load();
    	},

        load: function(){
            var that = this;

            _.each( that.getCategories(), function(cat){
                that['label-' + cat].append( that.getWording('cat_' + cat) );
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
                    
                    that.view.find('.btn').parent().addClass('inactive');
                    that.view.find('.btn.cat-' + filter.category).parent().removeClass('inactive');
                
                } else {
                
                    that.view.removeClass('filter-active');   
                    that.view.find('.btn').parent().removeClass('inactive');
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