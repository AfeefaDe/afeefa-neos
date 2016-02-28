qx.Class.define("SearchView", {
    
  extend : View,
  type: "singleton",

  properties: {
  },

  construct: function(){
    var that = this;

    that.setViewId('searchView');
  },

  members : {
      
    render: function(){
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // search bar
      that.searchBar = $("<div />")
        .attr('id', 'search-bar');
      that.view.append(that.searchBar);

      // menu button
      that.menuBtn = $("<div />")
        .addClass('btn menu-btn')
      // bootstrap tooltip
        .attr({
          'data-toggle': 'tooltip',
          'data-placement': "bottom",
          'title': that.getWording('menu_menu'),
          'data-original-title': that.getWording('menu_menu')
        });
      that.searchBar.append(that.menuBtn);

      // refugee button
      that.refugeeBtn = $("<div />")
        .addClass('btn refugee-btn')
      // bootstrap tooltip
        .click(function(){
          APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
        })
        .attr({
          'data-toggle': 'tooltip',
          'data-placement': "bottom",
          'title': that.getWording('menu_refugee'),
          'data-original-title': that.getWording('menu_refugee')
        });
      that.searchBar.append(that.refugeeBtn);

      // cancel button
      that.cancelBtn = $("<div />")
        .addClass('btn cancel-btn')
      // bootstrap tooltip
        .click(function(){
          that.close();
        })
        .attr({
          'data-toggle': 'tooltip',
          'data-placement': "bottom",
          'title': that.getWording('menu_cancel'),
          'data-original-title': that.getWording('menu_cancel') 
        });
      that.searchBar.append(that.cancelBtn);

      // input field
      that.inputField = $("<input />")
        .attr('type', 'text')
        .attr('placeholder', 'Search Afeefa');
      that.searchBar.append(that.inputField);

      // results area
      that.results = $("<div />")
        .attr('id', 'results');
      
      if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar();

      that.view.append(that.results);

      this.base(arguments);

    },

    load: function(){
        var that = this;

        that.view.addClass('active');
    },

    loadResults: function( query ) {
      var that = this;

      that.load();
      that.maximize();

      if( query === undefined ) query = '';
      query = query.toLowerCase();

      that.results.empty();

      // TODO use marketentries instead of locations
      const entries = APP.getData().locations;

      // generic function to create a single result
      function createResult( iconClass, label, subLabel, action ) {
        const resultEl = $("<div />")
          .addClass('result')
          .click(function(){
            action();
          });
        that.results.append(resultEl);
        
        // icon
        const iconEl = $("<div />")
          .addClass('icon')
          .addClass(iconClass);
        resultEl.append(iconEl)

        // labels
        const labelsEl = $("<div />")
          .addClass('labels');
        resultEl.append(labelsEl)
        
        const mainLabelEl = $("<label />")
          .append(label);
        labelsEl.append(mainLabelEl);
        
        if( subLabel ) {
          const subLabelEl = $("<label />")
            .addClass('sub-label')
            .append(subLabel);
          labelsEl.append(subLabelEl);
        }
      }

      // generic function to create a single entry result
      function createEntryResult( entry ) {
        // icon
        var iconClass = 'cat-' + entry.category.name;
        iconClass += ' type-' + entry.type;
        if( entry.subCategory ) iconClass += ' subcat-' + entry.subCategory;
        
        // label
        var label = entry.name;
        var subLabel = entry.subCategory? that.getWording('cat_' + entry.subCategory) : that.getWording('cat_' + entry.category.name);
        
        // action
        var action = function(){
          APP.getMapView().selectMarkerFromLink(entry.entryId);
        };

        // create entry
        createResult( iconClass, label, subLabel, action );
      }

      if( !query ) {  // show "just click" version

        // for god's sake show ALL entries
        _.each(entries, function(entry) {
          createEntryResult(entry);
        });

      } else {  // find by query
        var entriesFiltered = _.filter( entries, function(entry){
          // in name?
          if( entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
          // in category?
          var cat = that.getWording('cat_' + entry.category.name);
          if( cat.toLowerCase().indexOf(query) >= 0 ) return true;
          // in subCategory?
          if( entry.subCategory ) {
            var subcat = that.getWording('cat_' + entry.subCategory);
            if( subcat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          return false;
        });

        _.each(entriesFiltered, function(entry) {
          createEntryResult(entry);
        });
      }


      // if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar();

    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.menuBtn.click(function(){
        that.say('mainMenuBtnClicked');
      });

      that.inputField.focus(function(){
        that.loadResults( that.inputField.val() );
        that.say('searchFieldFocused');
      });

      that.inputField.on('input', function(){
        that.loadResults( that.inputField.val() );
      });

      // that.listen('detailViewOpened', function(){
      //   that.minimize();
      // });

      // that.listen('detailViewClosed', function(){
      //   that.maximize();
      // });
    },

    minimize: function(){
      var that = this;

      that.results.addClass('minimized');
    },

    maximize: function(){
      var that = this;

      that.results.removeClass('minimized');
    },

    reset: function(){
        var that = this;

        that.inputField.val(null);
        that.results.empty();
    },

    close: function(){
        var that = this;

        that.view.removeClass('active');
        that.reset();

        that.say('searchViewClosed');
    },

    changeLanguage: function(){
        var that = this;

        // bootstrap tooltip
        that.menuBtn.attr({
          'title': that.getWording('menu_menu'),
          'data-original-title': that.getWording('menu_menu')
        });

        // that.reset();
        // that.load();
    }
  }

});
