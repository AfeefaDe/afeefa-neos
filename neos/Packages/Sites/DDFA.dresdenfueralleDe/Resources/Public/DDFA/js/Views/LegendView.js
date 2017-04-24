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
	  // that.headingContainer = $("<div />").addClass('heading');
	  // that.heading = $("<h2 />");
	  // that.headingContainer.append(that.heading);

	  //////////////////
		// Filter Reset //
		//////////////////
	  that.filterModuleReset  = $("<div />");
	  that.filterModuleReset.attr('class', 'filter-module reset-module');
	  that.view.append(that.filterModuleReset);
		
		// button
		that.resetBtn = $("<div />")
			.addClass('btn')
			.click(function() {
				that.resetFilter();
			});
		that.filterModuleReset.append(that.resetBtn);

	  ///////////////////
	  // Entity filter //
	  ///////////////////
	  that.filterModuleEntity  = $("<div />");
	  that.filterModuleEntity.attr('class', 'filter-module entity-module');
	  that.view.append(that.filterModuleEntity);

	  // module heading
	  that.moduleHeadingEntity = $("<h3 />");
	  that.filterModuleEntity.append(that.moduleHeadingEntity);

	  // entities
	  var rowContainer = $("<div />")
		.addClass('row-container');
	  
	  _.each( {0: 'orga', 2: 'event', 1: 'market'}, function(value, key){
			var entityContainer = $("<div />")
			  .addClass('entity-container')
			  .click(function() {
					that.setFilter( {type: key} );
			  });
			var entity = $("<div />")
			  .addClass('entity type-' + key);
			var entityLabel = $("<span />")
			  .addClass('label');
			that['label-entity-' + value] = entityLabel; 
			entityContainer.append(entity);
			entityContainer.append(entityLabel);
			rowContainer.append(entityContainer);
	  });
	  
	  that.filterModuleEntity.append(rowContainer);

	  //////////////////////
	  // Category filter //
	  //////////////////////
	  that.filterModuleCat  = $("<div />");
	  that.filterModuleCat.attr('class', 'filter-module category-module');
	  that.view.append(that.filterModuleCat);

	  // module heading
	  that.moduleHeadingCategory = $("<h3 />");
	  that.filterModuleCat.append(that.moduleHeadingCategory);

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
		  var icon = $("<div />")
		  	.addClass('icon ' + 'cat-' + cat.name)
			  .click(function() {
					that.setFilter( {category: cat.name} );
					that.reset();
					container.addClass('extended');
			  });
		  catContainer.append(icon);
		  
		  // label
		  that['label-' + cat.id] = $("<p />")
		  	.click(function() {
					that.setFilter( {category: cat.name} );
					that.reset();
					container.addClass('extended');
			  });
		  catContainer.append(that['label-' + cat.id]);
		  
		  // nippus
		  var nippus = $("<div />");
		  nippus.addClass('nippus');
		  nippus.click(function() {
				var wasExtended = container.hasClass('extended');
				// reset all containers (this one and all others)
				that.reset();
				container.toggleClass('extended', !wasExtended);
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
				  that.setFilter( {subCategory: subcat.name} );
				});
				subCatContainer.append(subIcon);

				// label
				that['label-' + subcat.id] = $("<p />");
				that['label-' + subcat.id].click(function() {
				  that.setFilter( {subCategory: subcat.name} );
				});
				subCatContainer.append(that['label-' + subcat.id]);
				
				subContainer.append(subCatContainer);
		  });
		  
		  container.append(subContainer);
			
			that.filterModuleCat.append(container);
	  });


		//////////////////////
	  // Attribute filter //
	  //////////////////////
	  that.filterModuleAttribute  = $("<div />");
	  that.filterModuleAttribute.attr('class', 'filter-module attribute-module');
	  that.view.append(that.filterModuleAttribute);

	  // module heading
	  that.moduleHeadingAttribute = $("<h3 />");
	  that.moduleHeadingAttribute.append('Details');
	  that.filterModuleAttribute.append(that.moduleHeadingAttribute);

	  // attributes
	  _.each( {'forChildren': 'bool', 'supportWanted': 'bool'}, function(value, key){
			
			function setAttrFilter(value) {
				if( value ) {
					const filter = {};
					filter[key] = value;
					that.setFilter(filter);
				} else {
					that.resetFilter();	
				}
			}
			
			var attributeContainer = $("<div />")
			  .addClass('attribute-container');
			
			var attrFormElement = $("<input />")
				.attr('type', 'checkbox')
				.click(function() {
					var value = $(this).prop("checked");
					setAttrFilter( value );
			  });
			attributeContainer.append(attrFormElement);

			var attrLabel = $("<label />")
				.append(that.getWording('prop.' + key))
				.click(function(){
					attrFormElement.prop("checked", !(attrFormElement.prop("checked")) );
					setAttrFilter( attrFormElement.prop("checked") );
				});
			attributeContainer.append(attrLabel);

	  	that.filterModuleAttribute.append(attributeContainer);
	  });

	  $('#main-container').append(that.view);

	  this.base(arguments);

	  that.load();
	},

	  load: function(){
		  var that = this;

		  _.each( that.getCategories(), function(cat){
			  
			  that['label-' + cat.id].append( that.getWording('cat.' + cat.name) );

			  var condition = function(){
        	return (that.view.css('right') == '0px');
        };

			  that.createTooltip(
	        that['label-' + cat.id].parent(),
	        function(){
	          return that.getWording('cat.' + cat.name + '.description');
	        }(),
	        'hover',
	        'left',
	        'desktop',
	        null,
	        null,
	        condition
	      );

			  _.each( cat.sub, function(subcat){
				  that['label-' + subcat.id].append( that.getWording('cat.' + subcat.name) );

				  that.createTooltip(
		        that['label-' + subcat.id].parent(),
		        function(){
		          return that.getWording('cat.' + subcat.name + '.description');
		        }(),
		        'hover',
		        'left',
		        'desktop',
		        null,
		        null,
		        condition
		      );
			  });

		  });

		  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
		  	that['label-entity-' + value].append(that.getWording('entity.' + value));
		  });

		  that.resetBtn.append( that.getWording('misc.filterReset') );
	  	that.moduleHeadingEntity.append(that.getWording('entry.type'));
	  	that.moduleHeadingCategory.append(that.getWording('category'));
	  	that.moduleHeadingAttribute.append(that.getWording('label.attribute.filter'));
	  },

	  // used for mobile instead of mouse hover
	  show: function(silent){
	  	var that = this;

		  if(!silent) that.showCurtain(true);
		  that.view.addClass('active');
	  },

	  setFilter: function( filterOptions ){
		  var that = this;

		  // consequences
		  // TODO close detailView if location gets unavailable
		  // TODO if an unavailable location is selected inside the guides, the filter has to be disabled
		  
		  APP.setActiveFilter(filterOptions);
		  that.say('filterSet', APP.getActiveFilter());
      if( APP.getUserDevice() == 'mobile') that.close();
	  },

	  resetFilter: function(){
		  var that = this;

	  	// only fire reset if filter really changed
		  if(APP.getActiveFilter() != null){
			  APP.setActiveFilter(null);
			  that.say('filterSet');
				that.view.scrollTop(0);
				that.view.perfectScrollbar('update');
		  }
	  },

	  reset: function(){
		  var that = this;

		  that.filterModuleCat.find('.std-container').removeClass('extended');
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
				  
				  const currentSubcatContainers = that.view.find('.subcat-container.subcat-' + filter.subCategory);
				  currentSubcatContainers.removeClass('inactive');
				  currentSubcatContainers.parents('.std-container').find('.cat-container').removeClass('inactive');
			  
			  } else {
			  
				  that.view.removeClass('filter-active');
				  that.filterModuleCat.find('.cat-container, .subcat-container').removeClass('inactive');
				  that.filterModuleCat.find('.std-container').removeClass('extended');
			  }

		  });

			that.listen('curtainclicked', function(){
        	if( that.view.hasClass('active') ) that.close();
  		});

  		////////////////////
      // swipe gestures //
      ////////////////////
      var hammer = new Hammer(that.view[0]);
      hammer.on('swiperight', function(ev){
          if( that.view.hasClass('active') ) that.close();
      });

      // show on hover
			that.view.hover(
			  function() {
			  	that.show();
			  }, function(e) {
			  	// only react if view is really active
          // firefox fires mouseleave while transition (bug), so additionally check current css state
		  		if( that.view.hasClass('active') && ($(this).css('right') == '0px') ) that.close();
			  }
			);

  		that.listen('searchViewClosed', function(){
				that.resetFilter();
  		});
	  },

	  close: function(){
		  var that = this;

		  that.showCurtain(false);
		  that.view.removeClass('active');
		  
		  // TODO: only do in mobile version
		  // that.addRequestBtn.css('display', 'none');
		  // that.addOfferBtn.css('display', 'none');
	  },

	  changeLanguage: function(){
		  var that = this;

		  // clear labels
		  _.each( that.getCategories(), function(cat){
			  that['label-' + cat.id].empty();

			  _.each( cat.sub, function(subcat){
				  that['label-' + subcat.id].empty();
			  });
		  });

		  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
		  	that['label-entity-' + value].empty();
		  });

		  that.resetBtn.empty();

		  that.moduleHeadingEntity.empty();
	  	that.moduleHeadingCategory.empty();
	  	that.moduleHeadingAttribute.empty();

		  that.load();
	  }
  }

});
