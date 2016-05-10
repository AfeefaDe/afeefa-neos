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

      // filter button
      that.filterBtn = $("<div />")
        .addClass('btn filter-btn')
      // bootstrap tooltip
        .click(function(){
          if( APP.getLegendView().view.hasClass('active') )
            APP.getLegendView().close();
          else
            APP.getLegendView().show();
        });
      that.searchBar.append(that.filterBtn);

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
      const entries = APP.getData().entries;

      // generic function to create a single result
      function createResult( iconClass, label, subLabel, action, locationSymbol ) {
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
          // show location symbol?
          if(locationSymbol)
            subLabelEl.append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
          labelsEl.append(subLabelEl);
        }
      }

      // generic function to create a single entry result
      function createEntryResult( entry ) {
        
        var categoryName = entry.category ? entry.category.name : null;
        
        // icon
        var iconClass = 'cat-' + categoryName;
        iconClass += ' type-' + entry.type;
        if( entry.subCategory ) iconClass += ' subcat-' + entry.subCategory;
        
        // label
        var label = entry.name;
        var subLabel = entry.subCategory ? that.getWording('cat_' + entry.subCategory) : that.getWording('cat_' + categoryName);
        
        // action
        var action = function(){
          if(entry.location.length > 0)
            APP.getMapView().selectMarkerFromLink(entry.entryId);
          else
            APP.getDetailView().load(entry);
        };

        // create entry
        createResult( iconClass, label, subLabel, action, (entry.location.length > 0) );
      }

      if( !query ) {  // show "just click" version

        // supporters wanted
        // var action = function(){
        //   that.inputField.blur();
        //   that.loadResults( 'supportWanted' );
        // };
        // createResult('supportWanted', 'Unterstützer gesucht', 'Projekte, die noch Verstärkung brauchen', action );

        // link to intro
        var action = function(){
          APP.getIncludeView().load( APP.getIncludeView().getIncludes().intro );
        };
        createResult('intro', that.getWording('search_label_intro'), that.getWording('search_sublabel_intro'), action );

        // link to refugee guide
        var action = function(){
          APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
        };
        createResult('refugee-guide', that.getWording('search_label_refugeeGuide'), that.getWording('search_sublabel_refugeeGuide'), action );

        // link to supporter guide
        var action = function(){
          APP.getIncludeView().load( APP.getIncludeView().getIncludes().supporterGuide );
        };
        createResult('supporter-guide', that.getWording('search_label_supporterGuide'), that.getWording('search_sublabel_supporterGuide'), action );

        // for god's sake show ALL entries
        _.each(entries, function(entry) {
          createEntryResult(entry);
        });

      } else {  // find by query
        
        var entriesFiltered;

        // predefined query: support wanted
        if( query == 'supportwanted' ){
          entriesFiltered = _.filter( entries, function(entry){
            return entry.supportWanted;
          });
        }
        // free search
        else {
          entriesFiltered = _.filter( entries, function(entry){
            // in name?
            if( entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
            // in category?
            if( entry.category ) {
              var cat = that.getWording('cat_' + entry.category.name);
              if( cat.toLowerCase().indexOf(query) >= 0 ) return true;
            }
            // in subCategory?
            if( entry.subCategory ) {
              var subcat = that.getWording('cat_' + entry.subCategory);
              if( subcat.toLowerCase().indexOf(query) >= 0 ) return true;
            }
            // children?
            if( entry.forChildren ) {
              var children = that.getWording('prop_forChildren');
              if( children.toLowerCase().indexOf(query) >= 0 ) return true;
            }
            // in description?
            if( entry.description ) {
              if( entry.description.toLowerCase().indexOf(query) >= 0 ) return true;
            }
            // in speakerPublic?
            if( entry.speakerPublic ) {
              if( entry.speakerPublic.toLowerCase().indexOf(query) >= 0 ) return true;
            }

            return false;
          });
        }

        _.each(entriesFiltered, function(entry) {
          createEntryResult(entry);
        });
      }
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

      that.listen('detailViewOpened', function(){
        // if( !that.inputField.val() )
        //   that.close();
        // else
          that.minimize();
      });

      that.listen('detailViewClosed', function(){
        that.maximize();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });
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

        that.results.scrollTop(0);

        that.inputField.val(null);
        that.results.empty();
        
        if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');

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
