qx.Class.define("APPAFEEFA", {
	extend : Daddy,
	type: "singleton",

	// extend: "Daddy",

	construct: function(){
		var that = this;

		that.setTitle('Afeefa.de - Networking platform for refugees and supporters');
		that.setDataManager(new DataManager());
		that.setRouter(new Router());
		that.setLM(new LanguageManager());

		that.setConfig(
			{
				languages: ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'],
				categories: [
					{
						name: 'language',
						id: '1',
						sub: [
							{ name: 'german-course', id: '1-1' },
							{ name: 'interpreter', id: '1-2' },
							{ name: 'learning-place', id: '1-3' },
							{ name: 'tandem', id: '1-4' }
						]
					},
					{
						name: 'medic',
						id: '2',
						sub: [
							{ name: 'medical-counselling', id: '2-1' },
							{ name: 'medical-care', id: '2-2' },
							{ name: 'psychological-counselling', id: '2-3' }
						]
					},
					{
						name: 'jobs',
						id: '3',
						sub: [
							{ name: 'job-counselling', id: '3-1' },
							{ name: 'political-education', id: '3-2' },
							{ name: 'education-sponsorship', id: '3-3' },
							{ name: 'library', id: '3-4' }
						]

					},
					{
						name: 'consultation',
						id: '4',
						sub: [
							{ name: 'family-counselling', id: '4-1' },
							{ name: 'legal-advice', id: '4-2' },
							{ name: 'volunteer-coordination', id: '4-3' },
							{ name: 'asylum-counselling', id: '4-4' },
							{ name: 'social-counselling', id: '4-5' }
						]
					},
					{
						name: 'leisure',
						id: '5',
						sub: [
							{ name: 'youth-club', id: '5-1' },
							{ name: 'sports', id: '5-2' },
							{ name: 'museum', id: '5-3' },
							{ name: 'music', id: '5-4' },
							{ name: 'stage', id: '5-5' },
							{ name: 'craft-art', id: '5-6' },
							{ name: 'gardening', id: '5-7' },
							{ name: 'cooking', id: '5-8' }
						]
					},
					{
						name: 'community',
						id: '6',
						sub: [
							{ name: 'welcome-alliance', id: '6-1' },
							{ name: 'meeting-place', id: '6-2' },
							{ name: 'childcare', id: '6-3' },
							{ name: 'workshop', id: '6-4' },
							{ name: 'sponsorship', id: '6-5' },
							{ name: 'lgbt', id: '6-6' },
							{ name: 'housing-project', id: '6-7' }
						]
					},
					{
						name: 'donation',
						id: '7',
						sub: [
							{ name: 'food', id: '7-1' },
							{ name: 'clothes', id: '7-2' },
							{ name: 'furniture', id: '7-3' }
						]
					}
				],
				categoriesBasic: ["housing", "christian", "islam", "jewish", 'public', 'wifi', 'shop'],
				simpleProperties: ['description', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'openingHours', 'dateFrom', 'dateTo'],
				imgPath: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/img/'
			}
		);

		that.setActiveFilter(null);
	},

	properties : {
		title: {},
		DataManager: {},
		Router: {},
		LM: {},
		data: { init: {} },
		curtain: {},
		mapView: {},
		searchView: {},
		detailView: {},
		menuView: {},
		legendView: {},
		plusView: {},
		languageView: {},
		formView: {},
		includeView: {},
		userDevice: {},
		config: {},
		currentLang: {},
		activeFilter: {}
	},

	members : {
		

		init: function( cb ){
			var that = this;
			
			// analyse user device
			that.detectUserDevice();

			// analyse user language
			that.getLM().init();

			// load view-independant UI components
			that.loadIndependantUI();

			// fetch only necessary data for app startup
			that.getDataManager().fetchInitialData(function(){
				cb();
			});

			// fetch other data (e.g. that takes a long time loading)
			var currentAppData = that.getData();

			that.getDataManager().getAllEntries(function(data){

				// store entries in APP
				currentAppData.entries = data.marketentries;
				
				// that.getDataManager().getAllLocations(function(data){
					
				// 	// store locations in APP
				// 	currentAppData.locations = data.locations;
				// 	that.setData(currentAppData);
					
				// 	that.say('fetchedNewData', { dataType: ['locations', 'entry'] });
				// });
				
				// extract locations from entries and store in APP seperately
				var extracted_locations = [];
				_.each(data.marketentries, function(entry){
					if( entry.locations.length > 0 ){
						_.each(entry.locations, function(loc){
							loc.marketEntry = entry;
							extracted_locations = _.union(extracted_locations, [loc]);
						});
					}
				});
				currentAppData.locations = extracted_locations;

				that.setData(currentAppData);
				that.say('fetchedNewData', { dataType: ['locations', 'entry'] });

			});
		},

		detectUserDevice: function(){
			var that = this;

			// analyse user device
			// $('body').restive({
			//     breakpoints: ['768', '1280'],
			//     classes: ['768-c', '1280-c'],
			//     force_dip: true
			// });

			// if( $('body').hasClass('768-c') ) APP.setUserDevice('phone');
			// else if( $('body').hasClass('1280-c') ) APP.setUserDevice('tablet');
			// else APP.setUserDevice('desktop');

			// $('body').addClass( APP.getUserDevice() );

			$('body').restive({
				  breakpoints: ['10000'],
				  classes: ['nb'],
				  turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_landscape=landscape'
			});

			APP.setUserDevice('desktop');
			if( $('body').hasClass('mobi') || $('body').hasClass('phone') ) APP.setUserDevice('mobile');
			if( $('body').hasClass('tablet') ) APP.setUserDevice('tablet');
			
			$('body').addClass( APP.getUserDevice() );
		},

		loadIndependantUI: function(){
			var that = this;

			// curtain
			var curtain = $("<div />")
				.attr('id', 'curtain')
				.on('click', function(e) {
				 that.say('curtainclicked');
				});
      $('#main-container').append(curtain);
			that.setCurtain(curtain);


		}
	}

});