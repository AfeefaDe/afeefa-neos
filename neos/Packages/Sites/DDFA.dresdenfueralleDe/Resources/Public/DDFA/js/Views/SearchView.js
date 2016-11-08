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
        .addClass('btn menu-btn');
      // tooltip
      that.createTooltip(
        that.menuBtn,
        function(){
          return that.getWording('menu_menu');
        }(),
        'hover',
        'top',
        'desktop'
      );
      that.searchBar.append(that.menuBtn);

      // refugee button
      that.refugeeBtn = $("<div />")
        .addClass('btn refugee-btn')
        .click(function(){
          APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
        });
      // tooltip
      that.createTooltip(
        that.refugeeBtn,
        function(){
          return that.getWording('menu_refugee');
        }(),
        'hover',
        'top',
        'desktop'
      );
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
        .attr('placeholder', that.getWording('search_placeholder'));
      that.searchBar.append(that.inputField);

      // search tags
      that.searchTag = $("<span />")
        .addClass("search-tag")
        .click(function(){
          that.inputField.trigger( "input" );
        });
      that.searchBar.append(that.searchTag);      

      // results area
      that.results = $("<div />")
        .attr('id', 'results');
      
      if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar();

      that.view.append(that.results);

      this.base(arguments);

    },

    load: function(){
        var that = this;

        that.searchTag
          .removeClass("active")
          .removeClass (function (index, css) {
            return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
          })
          .empty();

        that.inputField.show();

        that.view.addClass('active');

        return that;
    },

    loadResults: function( query ) {
      var that = this;

      that.load();
      that.maximize();

      if( query === undefined ) query = '';
      query = query.toLowerCase();

      that.results.empty();

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

      // generic function to create a section header
      function createSectionHeader( label, action ) {
        const sectionHeader = $("<div />")
          .addClass('section-header')
          .append(label);
        
        if(action) sectionHeader
          .addClass('with-action')
          .click(function(){ action(); });
        
        that.results.append(sectionHeader);
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
        if( entry.type == 2 && entry.dateFrom ) subLabel += ' | ' + APP.getUtility().buildTimeString(entry);
        
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


        // upcoming events
        createSectionHeader( that.getWording('search_label_upcomingevents'), function(){
          that.inputField.val('events').trigger( "input" );
        });
        
        _.each(APP.getDataManager().getAllEvents( {mustHaveDate: true} ).slice(0, 3), function(entry) {
          createEntryResult(entry);
        });
                
        // newest entries
        createSectionHeader( that.getWording('search_label_newentries') );

        _.each(entries.slice(0, 3), function(entry) {
          createEntryResult(entry);
        });

        createSectionHeader( that.getWording('search_label_lists') );

        // link to refugee guide
        // var action = function(){
        //   APP.getIncludeView().load( APP.getIncludeView().getIncludes().refugeeGuide );
        // };
        // createResult('refugee-guide', that.getWording('search_label_refugeeGuide'), that.getWording('search_sublabel_refugeeGuide'), action );

        // link to supporter guide
        // var action = function(){
        //   APP.getIncludeView().load( APP.getIncludeView().getIncludes().supporterGuide );
        // };
        // createResult('supporter-guide', that.getWording('search_label_supporterGuide'), that.getWording('search_sublabel_supporterGuide'), action );

        // support wanted
        var action = function(){
          that.inputField.val('support wanted').trigger( "input" );
        };
        createResult('support-wanted', that.getWording('search_label_supportwanted'), that.getWording('search_sublabel_supportwanted'), action );

        createSectionHeader( that.getWording('search_label_help') );
        
        // intro
        var action = function(){
          APP.getIntroView().start();
        };
        createResult('start-intro', that.getWording('search_label_intro'), that.getWording('search_sublabel_intro'), action );

      } else {  // find by query
        
        var entriesFiltered;

        // predefined queries: 
        if( query.indexOf(':') >= 0 ){
          var operator = query.substring(0, query.indexOf(':'));
          var operationQuery = query.substring(operator.length+1);
          var classNameCategory;

          // category listing
          if(operator == 'cat' ) {
            entriesFiltered = _.filter( entries, function(entry){
              
              if( entry.category && entry.category.name == operationQuery) {
                classNameCategory = operationQuery;
                return true;
              }
              
            });
          }

          // sub category listing
          else if(operator == 'subcat' ) {
            entriesFiltered = _.filter( entries, function(entry){
              
              if( entry.subCategory && entry.subCategory == operationQuery ) {
                classNameCategory = APP.getMainCategory(operationQuery).name;
                return true;
              }
            });
          }

          that.searchTag
            .addClass("active")
            .addClass("cat-" + classNameCategory )
            .append(that.getWording('cat_' + operationQuery));

          that.inputField.hide();
        }
        
        // events
        else if( query == 'events' ){
          entriesFiltered = APP.getDataManager().getAllEvents();
        }
        
        // support wanted
        else if( query == 'support wanted' ){
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

      that.say('searchResultsLoaded');
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

      that.listen('filterSet', function(){
        var filter = APP.getActiveFilter();
        
        if( APP.getUserDevice() != 'mobile'){
          if( !filter ){
            // ...
          }
          else if( filter.category ) {
            that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
          }
          else if( filter.subCategory ) {
            that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
          }
         }

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

        that.inputField
          .val(null)
          .show();

        that.searchTag
          .removeClass("active")
          .removeClass (function (index, css) {
            return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
          })
          .empty();

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

        // that.reset();
        // that.load();
    }
  }

});
