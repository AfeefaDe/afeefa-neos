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

            });

            $('#main-container').append(that.view);

            this.base(arguments);

            that.load();
    	},

        load: function(){
            var that = this;

            _.each( that.getCategories(), function(cat){
                that['label-' + cat].append( that.getWording('cat_' + cat) );
            });
        },

        reset: function(){
            var that = this;

            _.each( that.getCategories(), function(cat){
                that['label-' + cat].empty();
            });
        },

        addEvents: function(){
            var that = this;

            // call superclass
            this.base(arguments);
            
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