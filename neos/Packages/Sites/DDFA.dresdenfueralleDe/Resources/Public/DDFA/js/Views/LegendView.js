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

      if( APP.getUserDevice() == 'desktop') that.view.perfectScrollbar();

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
        container.addClass('std-container');

        // cat container
        var catContainer = $("<div />");
        catContainer.addClass('cat-container');
        catContainer.addClass('cat-' + cat.name);
        
          // icon
          var icon = $("<div />");
          icon.addClass('icon ' + 'cat-' + cat.name);
          catContainer.append(icon);
          icon.click(function() {
            that.setFilter( {category: cat.name} );
          });
          
          // label
          that['label-' + cat.id] = $("<p />");
          catContainer.append(that['label-' + cat.id]);
          that['label-' + cat.id].click(function() {
            that.setFilter( {category: cat.name} );
          });
          
          // nippus
          var nippus = $("<div />");
          nippus.addClass('nippus');
          nippus.click(function() {
            container.toggleClass('extended');
          });
          catContainer.append(nippus);

          container.append(catContainer);
          
        // sub cat container
        var subContainer = $("<div />");
        subContainer.addClass('sub-container');
        subContainer.addClass('cat-' + cat.name);
        catContainer.append(subContainer);

          // sub categories
          // TODO replace dummy data
          _.each( cat.sub, function(subcat){
            var subCatContainer = $("<div />");
            subCatContainer.addClass('subcat-container');
            subCatContainer.addClass('cat-' + cat.name + ' subcat-' + subcat.name);

            // icon
            var subIcon = $("<div />");
            subIcon.addClass('icon ' + 'subcat-' + subcat.name);
            subIcon.click(function(){
              that.setFilter( {subcategory: subcat.name} );
            });
            subCatContainer.append(subIcon);

            // label
            that['label-' + subcat.id] = $("<p />");
            that['label-' + subcat.id].click(function() {
              that.setFilter( {subcategory: subcat.name} );
            });
            subCatContainer.append(that['label-' + subcat.id]);
            
            subContainer.append(subCatContainer);
          });
          
          container.append(subContainer);

        that.filterModuleCat.append(container);
      });

      createFilterResetBtn();
      function createFilterResetBtn(){
        // container
        var resetBtn = $("<div />");
                resetBtn.addClass('button btn-reset');
        resetBtn.click(function() {
                    that.resetFilter();
                });
                
                // label
                that['label-filter-reset'] = $("<p />");
                resetBtn.append(that['label-filter-reset']);
                
                that.filterModuleCat.append(resetBtn);
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

              _.each( cat.sub, function(subcat){
                  that['label-' + subcat.id].empty();
              });
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
                  
                  that.view.find('.cat-container, .subcat-container').addClass('inactive');
                  
                  const currentCatContainers = that.view.find('.cat-container.cat-' + filter.category);
                  currentCatContainers.removeClass('inactive');
                  currentCatContainers.parent().find('.subcat-container').removeClass('inactive');
                  
                  const currentSubcatContainers = that.view.find('.subcat-container.subcat-' + filter.subcategory);
                  currentSubcatContainers.removeClass('inactive');
                  currentSubcatContainers.parents('.std-container').find('.cat-container').removeClass('inactive');
              
              } else {
              
                  that.view.removeClass('filter-active');
                  that.filterModuleCat.find('.cat-container, .subcat-container').removeClass('inactive');
                  that.filterModuleCat.find('.std-container').removeClass('extended');
              }

          });
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
