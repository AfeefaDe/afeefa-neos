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
		var resetBtn = $("<div />")
			.addClass('button btn-reset')
			.click(function() {
				that.resetFilter();
			});
		// label
		that['label-filter-reset'] = $("<p />");
		resetBtn.append(that['label-filter-reset']);
		that.filterModuleReset.append(resetBtn);

	  ///////////////////
	  // Entity filter //
	  ///////////////////
	  that.filterModuleEntity  = $("<div />");
	  that.filterModuleEntity.attr('class', 'filter-module entity-module');
	  that.view.append(that.filterModuleEntity);

	  // module heading
	  var moduleHeading = $("<h3 />");
	  moduleHeading.append('Entry types');
	  that.filterModuleEntity.append(moduleHeading);

	  // entities
	  var rowContainer = $("<div />")
		.addClass('row-container');
	  
	  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
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
	  // Categoriy filter //
	  //////////////////////
	  that.filterModuleCat  = $("<div />");
	  that.filterModuleCat.attr('class', 'filter-module category-module');
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
				that.reset();
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
	  var moduleHeading = $("<h3 />");
	  moduleHeading.append('Details');
	  that.filterModuleAttribute.append(moduleHeading);

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
				.append(that.getWording('prop_' + key))
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
			  
			  that['label-' + cat.id].append( that.getWording('cat_' + cat.name) );

			  _.each( cat.sub, function(subcat){
				  that['label-' + subcat.id].append( that.getWording('cat_' + subcat.name) );
			  });

		  });

		  _.each( {0: 'orga', 1: 'market', 2: 'event'}, function(value, key){
		  	that['label-entity-' + value].append(that.getWording('entity_' + value));
		  });

		  that['label-filter-reset'].append( that.getWording('misc_filterReset') );
	  },

	  // used for mobile instead of mouse hover
	  show: function(){
	  	var that = this;

		  that.showCurtain(true);
		  that.view.addClass('active');
	  },

	  setFilter: function( filterOptions ){
		  var that = this;

		  // consequences
		  // TODO close detailView if location gets unavailable
		  // TODO if an unavailable location is selected inside the guides, the filter has to be disabled
		  
		  APP.setActiveFilter(filterOptions);
		  that.say('filterSet', APP.getActiveFilter());
	  },

	  resetFilter: function(){
		  var that = this;

		  APP.setActiveFilter(null);
		  that.say('filterSet');
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

      // show on hover
			that.view.hover(
			  function() {
			  	that.show();
			  }, function() {
			  	// only fire mouseleave if view is really active
			  	if( that.view.hasClass('active') ) that.close();
			  }
			);
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

		  that['label-filter-reset'].empty();

		  that.load();
	  }
  }

});
