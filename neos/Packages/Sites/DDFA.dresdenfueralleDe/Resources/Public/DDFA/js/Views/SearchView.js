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
        .addClass('button menu-btn');
      
      that.searchBar.append(that.menuBtn);

      // refugee button
      that.refugeeBtn = $("<div />")
        .addClass('button refugee-btn')
        .click(function(){
          APP.getIncludeView().load( 'refugeeGuide' );
        });
     
      that.searchBar.append(that.refugeeBtn);

      // filter button
      that.filterBtn = $("<div />")
        .addClass('button filter-btn')
        .click(function(){
          if( APP.getLegendView().view.hasClass('active') )
            APP.getLegendView().close();
          else
            APP.getLegendView().show();
        });
      that.searchBar.append(that.filterBtn);

      // cancel button
      that.cancelBtn = $("<div />")
        .addClass('button cancel-btn')
        .click(function(){
          that.close();
        });
      that.searchBar.append(that.cancelBtn);

      // input field
      that.inputField = $("<input />")
        .attr('type', 'text');
      that.searchBar.append(that.inputField);

      // search tags
      that.searchTag = $("<span />")
        .click(function(){
          if( APP.getUserDevice() == 'mobile') that.maximize();
          // that.inputField.trigger( "input" );
        });
      that.searchBar.append(that.searchTag);      

      // results area
      that.results = $("<div />")
        .attr('id', 'results');

      if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar();

      that.view.append(that.results);

      // map area on mobile
      if( APP.getUserDevice() == 'mobile'){
        that.mapArea = $("<div />")
          .attr('id', 'map-area')
          .click(function(){
            that.minimize();
          });
        that.view.append(that.mapArea);
      }
      
      this.base(arguments);
    },

    load: function(query){
        var that = this;

        if( query === undefined ) query = '';
        query = query.toLowerCase();
        
        if(query){
          that.results.empty();
          that.loadResults(query);
        } else {
          that.reset();
          that.loadDashboard();
        }

        that.inputField
          .attr('placeholder', that.getWording('search.placeholder'))
          .show();

        // tooltip
        that.createTooltip(
          that.menuBtn,
          function(){
            return that.getWording('menu.menu');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        // tooltip
        that.createTooltip(
          that.refugeeBtn,
          function(){
            return that.getWording('menu.refugee');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        that.isActive(true);
        that.maximize();
        that.view.addClass('active');
        that.say('searchResultsLoaded');

        return that;
    },

    loadDashboard: function(){
      var that = this;

      // highlights
      // that.createSectionHeader( that.getWording('search.label.highlights') );

      // iwgr
      // var action = function(){
      //   APP.getLegendView().setFilter( {tags: 'iwgr'} );
      //   window.location.hash = 'iwgr';
      // };
      // that.createResult('iwgr', that.getWording('search.label.iwgr'), that.getWording('search.sublabel.iwgr'), action );


      // upcoming events
      that.createSectionHeader( that.getWording('search.label.upcomingevents'), function(){
        that.inputField.val('events').trigger( "input" );
      });
      
      _.each(APP.getDataManager().getAllEvents( {mustHaveDate: true} ).slice(0, 3), function(entry) {
        that.createEntryResult(entry);
      });
              
      that.createSectionHeader( that.getWording('search.label.lists') );

      // support wanted
      var action = function(){
        that.inputField.val('support wanted').trigger( "input" );
      };
      that.createResult('support-wanted', that.getWording('search.label.supportwanted'), that.getWording('search.sublabel.supportwanted'), action );

      // for children
      var action = function(){
        that.inputField.val(that.getWording('prop.forChildren')).trigger( "input" );
      };
      that.createResult('for-children', that.getWording('search.label.forchildren'), that.getWording('search.sublabel.forchildren'), action );

      // for women
      var action = function(){
        that.inputField.val('#frauen').trigger( "input" );
      };
      that.createResult('for-women', that.getWording('search.label.forwomen'), that.getWording('search.sublabel.forwomen'), action );

      // certified by SFR
      var action = function(){
        that.inputField.val('certified').trigger( "input" );
      };
      that.createResult('certified', that.getWording('search.label.certified'), that.getWording('search.sublabel.certified'), action );

      that.createSectionHeader( that.getWording('search.label.activity') );
     
      // add new entry
      var action = function(){
        APP.getFormView().load( 'newEntry' );
      };
      that.createResult('add-entry', that.getWording('search.label.addentry'), that.getWording('search.sublabel.addentry'), action );

      var action = function(){
        APP.getFormView().load( 'feedback' );
      };
      that.createResult('feedback', that.getWording('form.heading.feedback'), that.getWording('search.sublabel.feedback'), action );

      that.createSectionHeader( that.getWording('search.label.help') );
      
      // intro
      var action = function(){
        APP.getIntroView().start();
      };
      that.createResult('start-intro', that.getWording('search.label.intro'), that.getWording('search.sublabel.intro'), action );

      // about afeefa
      var action = function(){
        APP.getIncludeView().load('about');
      };
      that.createResult('about', that.getWording('search.label.about'), that.getWording('search.sublabel.about'), action );
    },

    loadResults: function( query ) {
      var that = this;

      that.view.addClass('active-search');

      // const entries = _.filter(APP.getData().entries, function(entry){
      //   return entry.external;
      // });
      const entries = APP.getData().entries;

      var entriesFiltered;

      // predefined queries: 
      if( query.indexOf(':') >= 0 ){
        var operator = query.substring(0, query.indexOf(':'));
        var operationQuery = query.substring(operator.length+1);

        // type listing
        if(operator == 'type' ) {
          if(operationQuery == 2) {
            entriesFiltered = APP.getDataManager().getAllEvents();
          }
          else {
            entriesFiltered = _.filter( entries, function(entry){
                return (entry.type == operationQuery);
            });
          }

          that.setSearchTag("type-" + operationQuery, that.getWording('search.label.type.' + operationQuery));
        }

        // category listing
        if(operator == 'cat' ) {
          entriesFiltered = _.filter( entries, function(entry){
              return (entry.category && entry.category.name == operationQuery);
          });

          that.setSearchTag("cat-" + operationQuery, that.getWording('cat.' + operationQuery));
        }

        // sub category listing
        else if(operator == 'subcat' ) {
          entriesFiltered = _.filter( entries, function(entry){
            
            if( entry.subCategory && entry.subCategory == operationQuery ) {
              return true;
            }
          });
          
          var searchTagCssClass = APP.getMainCategory(operationQuery).name;
          that.setSearchTag("cat-" + searchTagCssClass, that.getWording('cat.' + operationQuery));
        }

        // tag listing
        else if(operator == 'tag' ) {
          // entriesFiltered = _.filter( entries, function(entry){
          entriesFiltered = _.filter( APP.getDataManager().getAllEvents(), function(entry){
              return ( entry.tags && (entry.tags.indexOf(operationQuery) > -1) );
          });
          
          var tagLabel = that.getWording('tag.' + operationQuery) ? that.getWording('tag.' + operationQuery) : operationQuery;
          that.setSearchTag("tag-" + operationQuery, tagLabel);
        }
      }
      
      // events
      else if( query == 'events' ){
        entriesFiltered = APP.getDataManager().getAllEvents();
        
        that.setSearchTag(null, that.getWording('search.label.upcomingevents'));
      }
      
      // support wanted
      else if( query == 'support wanted' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.supportWanted;
        });

        that.setSearchTag(null, that.getWording('search.tag.supportwanted'));
      }

      // children
      else if( query == that.getWording('prop.forChildren').toLowerCase() ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.forChildren;
        });

        that.setSearchTag(null, that.getWording('prop.forChildren'));
      }

      // certified
      else if( query == 'certified' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.certified;
        });

        that.setSearchTag(null, that.getWording('search.tag.' + query));
      }
      
      // free search
      else {
        entriesFiltered = _.filter( entries, function(entry){
          // in name?
          if( entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
          // in category?
          if( entry.category ) {
            var cat = that.getWording('cat.' + entry.category.name);
            if( cat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in subCategory?
          if( entry.subCategory ) {
            var subcat = that.getWording('cat.' + entry.subCategory);
            if( subcat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // children?
          if( entry.forChildren ) {
            // the query string occurs in the "for children" property´wording of the selected language
            var children = that.getWording('prop.forChildren');
            if( children.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in description?
          if( entry.descriptionShort ) {
            if( entry.descriptionShort.toLowerCase().indexOf(query) >= 0 ) return true;
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
        that.createEntryResult(entry);
      });
      
      // nothing found info
      var action = function(){
        that.close();
      };
      if(!entriesFiltered.length) that.createResult(null, that.getWording('search.label.nothingfound'), that.getWording('search.sublabel.nothingfound'), action );
    },

    // generic function to create a single result
    createResult: function( iconClass, label, subLabel, action, locationSymbol, tooltip, action_secondary ) {
      var that = this;
      
      const resultEl = $("<div />")
        .addClass('result')
        .click(function(){
          action();
        })
        .on('contextmenu', function(e){
          if(action_secondary) {
            e.preventDefault();
            action_secondary();
          }
        });
      that.results.append(resultEl);

      // tooltip
      if(tooltip){
        that.createTooltip(
          resultEl,
          tooltip,
          'hover',
          'right',
          'desktop',
          ['search-result-tooltip']
        );
      }
      
      // icon
      const iconEl = $("<div />")
        .addClass('icon')
        .addClass(iconClass);
      resultEl.append(iconEl)

      // labels
      const labelsEl = $("<div />")
        .addClass('labels');
      resultEl.append(labelsEl)
      
      const mainLabelEl = $("<span />")
        .append(label);
      labelsEl.append(mainLabelEl);
      
      if( subLabel ) {
        const subLabelEl = $("<span />")
          .addClass('sub-label')
          .append(subLabel);
        // show location symbol?
        if(locationSymbol)
          subLabelEl.append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
        labelsEl.append(subLabelEl);
      }
    },

    // generic function to create a section header
    createSectionHeader: function( label, action ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header')
        .append(label);
      
      if(action) sectionHeader
        .addClass('with-action')
        .click(function(){ action(); });
      
      that.results.append(sectionHeader);
    },

    // generic function to create a single entry result
    createEntryResult: function( entry ) {
      var that = this;

      var categoryName = entry.category ? entry.category.name : null;
      
      // icon
      var iconClass = 'cat-' + categoryName;
      iconClass += ' type-' + entry.type;
      if( entry.subCategory ) iconClass += ' subcat-' + entry.subCategory;
      
      // title
      var label = entry.name;
      // sub category
      var subLabel = entry.subCategory ? that.getWording('cat.' + entry.subCategory) : that.getWording('cat.' + categoryName);
      // time
      if( entry.type == 2 && entry.dateFrom ) subLabel += ' | ' + APP.getUtility().buildTimeString(entry, {short: true});
      // place
      if( entry.location.length > 0 && entry.location[0].placename ){
        var placename = entry.location[0].placename;
        if(placename.length > 50) placename = placename.substring(0,50) + '...';
        subLabel += ' | @' + placename;
      }
      
      // action
      var action = function(){
        if( entry.location.length > 0 && entry.location[0].lat )
          APP.getMapView().selectMarkerFromLink(entry.entryId);
        else
          APP.getDetailView().load(entry);
      };

      var action_secondary = function(){
        if( entry.location.length > 0 && entry.location[0].lat )
          APP.getMapView().selectMarkerFromLink(entry.entryId, {preventDetailView: true});
      };

      // create entry
      var tooltip;
      if(entry.descriptionShort) tooltip = entry.descriptionShort;
      // if(!tooltip && entry.description) tooltip = entry.description;
      if(tooltip) tooltip = tooltip.substring(0,150) + '...';

      that.createResult( iconClass, label, subLabel, action, (entry.location.length > 0), tooltip, action_secondary );
    },

    setSearchTag: function(cssClass, wording){
      var that = this;

      that.searchTag
        .empty()
        .removeClass()        
        .addClass("search-tag active " + cssClass)
        .append(wording);

      that.inputField.hide();
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.menuBtn.click(function(){
        that.say('mainMenuBtnClicked');
      });

      that.inputField.focus(function(){
        that.load(that.inputField.val());
        that.say('searchFieldFocused');
      });

      that.inputField.on('input', function(){
        that.load(that.inputField.val());
      });

      that.listen('detailViewOpened', function(){
        that.hide();
      });

      that.listen('detailViewClosed', function(){
        that.show();
        if( !that.isActive() ) that.load();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });

      that.listen('fetchedNewData', function(){
        if( APP.getDetailView().isActive() ) that.hide();
        else that.load(that.inputField.val());
      });

      that.listen('filterSet', function(){
        var filter = APP.getActiveFilter();
        
        if( !filter ){
          that.close();
        }
        else if( filter.type ) {
          that.inputField.val( 'type:' + filter.type ).trigger( "input" );
        }
        else if( filter.category ) {
          that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
        }
        else if( filter.subCategory ) {
          that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
        }
        else if( filter.tags ) {
          that.inputField.val( 'tag:' + filter.tags ).trigger( "input" );
        }
      });

    },

    minimize: function(){
      var that = this;

      // that.show();
      // that.isActive(false);
      that.view.addClass('minimized');
    },

    maximize: function(){
      var that = this;

      that.show();
      that.view.removeClass('minimized');
    },

    reset: function(){
        var that = this;

        that.show();
        that.maximize();

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
        
        that.view.removeClass('active-search');
        
        if( APP.getUserDevice() == 'desktop') that.results.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');
        that.isActive(false);

        if( APP.getUserDevice() == 'desktop') that.load();

        that.say('searchViewClosed');
    },

    changeLanguage: function(){
        var that = this;

        if( APP.getDetailView().isActive() ) return;
        if(that.isActive()) that.load( that.inputField.val() );
    }
  }

});
