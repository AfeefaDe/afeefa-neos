qx.Class.define("Router", {
    
    extend : Daddy	,
    type: "singleton",
	
    properties : {
    	// currentPath: {},
    	// renderedViews: {}	
    },

    construct: function(){
    	var that = this;

    	that.registerHashChange();

    	// that.navigateBeta();
    },

    members : {

	    registerHashChange: function(){
	    	var that = this;

	    	window.onhashchange = function(){
	    		// that.detectUrl();
	    	};
	    },

	    detectUrl: function(){
	    	var that = this;

	    	that.currentPath = [];

	    	var url = window.location.hash.split('#');
	    	url = _.without(url, '');

			_.each(url, function( pieceOfPath ){
	    		that.currentPath.push(pieceOfPath);
			});

			that.navigate();
	    },

	    initialNavigate: function(){
	    	var userDevice = APP.getUserDevice();

			if( userDevice === 'phone' ) {

				// new MapView();
		    	APP.setMapView( new MapView() );
		    	
		    	APP.setDetailView( new DetailViewMobile() );
		    	
		    	APP.setMenuView( new MenuView() );
		    	
		    	APP.setLegendView( new LegendView() );

		    	APP.setPlusView( new PlusView() );
		    	
		    	APP.setLanguageView( new LanguageViewMobile() );
		    	
		    	APP.setFormView( new FormView() );
		
			} else {

		    	// new MapView();
		    	APP.setMapView( new MapView() );
		    	
		    	APP.setDetailView( new DetailView() );

		    	APP.setMenuView( new MenuView() );

		    	APP.setLegendView( new LegendView() );
		    	
		    	APP.setPlusView( new PlusView() );

		    	APP.setLanguageView( new LanguageView() );

		    	APP.setFormView( new FormView() );
			}
	    	
	    	APP.getMapView().render();
	    	APP.getDetailView().render();
	    	APP.getPlusView().render();
	    	APP.getLanguageView().render();
	    	APP.getMenuView().render();
	    	APP.getLegendView().render();
	    	APP.getFormView().render();
	    },

	    navigate: function( path ){
	    	var that = this;

	    	if(!path) var path = that.currentPath;
	    	else that.currentPath = path;
			
			console.log('navigate to: ' + path);

			if(that.currentPath.length > 0){
				APP.getMapView().selectMarkerById( that.currentPath );
			}
	    	
	    	

			// console.log('navigate to: ' + path);

	  //   	var firstLevel = path[0];
	    	
	  //   	// define which (and where) views should exist on a certain route
	  //   	var routes = {
			//     undefined: [
			// 		{ view: new StartView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'info': [
			// 		{ view: new InfoView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'laeufer': [
			// 		{ view: new RunnersView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'anmeldung': [
			// 		{ view: new RegistrationView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'impressum': [
			// 		{ view: new ImprintView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'kontakt': [
			// 		{ view: new ContactView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	]
			// };

			// // render desired views
			// var wishlist = routes[firstLevel]? routes[firstLevel] : routes[undefined];

		 //    wishlist.each(function( wish ){

			// 	// render views only if not already rendered
			// 	var newLayoutViewObject = { layoutArea: wish.layoutArea, view: wish.view };
			// 	var rendered = _.find( that.renderedViews, function( layoutViewObject ){
			// 		return ( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea && layoutViewObject.view.get('name') == newLayoutViewObject.view.get('name') );
			// 	});

			// 	if(!rendered){
			// 		// remove all memorized views for the certain layoutArea
			// 		that.renderedViews = _.reject(that.renderedViews, function( layoutViewObject ){
			// 			if( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea ){
			// 				if(layoutViewObject.view.die) layoutViewObject.view.die();
			// 				return true;
			// 			} else {
			// 				return false;
			// 			}
			// 			// return layoutViewObject.layoutArea == newLayoutViewObject.layoutArea;
			// 		});
			// 		newLayoutViewObject.view.render(newLayoutViewObject.layoutArea);
			// 		that.renderedViews.push( newLayoutViewObject );
			// 	}
			// });

		 //    // set new hash if navigate() was invoked manually and not because of a hash change
		 //    var newHash = '#' + path.join('#')
	  //   	if( window.location.hash != newHash) window.location.hash = newHash;

		 //    that.updateNavigation();
	    },

	    updateNavigation: function(){
	    	var that = this;

			var firstLevel = that.currentPath[0];
	    	
			$('a')

	    	d3.selectAll('nav a').each(function(){
	    		var aSel = d3.select(this);
	    		if(aSel.attr('href') == '#'+firstLevel)
	    			aSel.classed('active', true);
	    		else
	    			aSel.classed('active', false);
	    	});
	    }

    }

    

});