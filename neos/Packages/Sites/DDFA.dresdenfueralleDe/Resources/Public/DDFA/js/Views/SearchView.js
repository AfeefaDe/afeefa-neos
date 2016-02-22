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
      that.menuBtn = $("<div />");
      that.menuBtn.addClass('menu-btn');
      // bootstrap tooltip
      that.menuBtn.attr({
          'data-toggle': 'tooltip',
          'data-placement': "bottom",
          'title': that.getWording('menu_menu'),
          'data-original-title': that.getWording('menu_menu')
      });
      that.searchBar.append(that.menuBtn);

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

      // that.load();
    },

    load: function(){
        var that = this;

    },

    loadResults: function() {
      var that = this;

      const locations = APP.getData().locations;

      that.results.empty();
      that.maximize();

      _.each(locations, function(location) {
        const entry = $("<div />")
          .addClass('result');
        entry.append(location.name + ' (' + that.getWording('cat_' + location.category.name) + ')');
        that.results.append(entry);

        entry.click(function(){
          APP.getMapView().selectMarkerFromLink(location.entryId);
          // APP.getDetailView().load(location);
        });
      });

      // if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar();

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

    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.menuBtn.click(function(){
        that.say('mainMenuBtnClicked');
      });

      that.inputField.focus(function(){
        that.loadResults();
      });

      that.listen('detailViewOpened', function(){
        that.minimize();
      });

      that.listen('detailViewClosed', function(){
        that.maximize();
      });
    },

    close: function(){
        var that = this;

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
