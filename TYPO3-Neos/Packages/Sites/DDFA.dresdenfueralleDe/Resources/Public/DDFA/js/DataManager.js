qx.Class.define("DataManager", {
    
    extend : Daddy,
    type: "singleton",	

    construct: function(){
    	var that = this;

    },

    members : {
        
        fetchAllData: function( cb ){
            var that = this;

            // var initiativesFetched, locationsFetched = false;
            var allData = {};
            // var initiatives, locations;

            // fetch initiatives
            // initiativesFetched = true;

            // fetch locations
            that.getAllLocations(function(data){
                
                allData.locations = data.locations;
                
                that.getLanguageBib( function(data){

                    APP.getLM().setBib( data[0] );

                    cb( allData );
                });
            });
            
            // callback
            // while( !initiativesFetched || !locationsFetched )

        },

        // dummy version
        _getAllLocations: function( cb ){

            $.ajax({
                url: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/dummyData/locations.json',
                type: 'GET',
                dataType: 'text'
            })
            .done(function( data ) {
                cb( JSON.parse(data) );
            })
            .fail(function(a) {
                console.debug(a);
            });

        },

        getAllLocations: function( cb ){

            $.ajax({
                url: "api/locations?locale=" + APP.getLM().getCurrentLang(),
                // url: "api/locations",
                type: 'GET',
                dataType: 'json'
            })
            .done(function( data ) {
                cb(data);
            })
            .fail(function(a) {
                console.debug(a);
            });

        },

        getLanguageBib: function( cb ){

            $.ajax({
                url: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/lang/lang.json',
                type: 'GET',
                dataType: 'text'
            })
            .done(function( data ) {
                cb( JSON.parse(data) );
            })
            .fail(function(a) {
                console.debug(a);
            });

        },

        addMarketEntry: function( data, cb ){
            
            console.debug('POST api/marketentries', data);

            $.ajax({
                url: "api/marketentries",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
            .done(function( data ) {
                cb(data);
            })
            .fail(function(a) {
                console.debug(a);
            });

        },

        addLocation: function( data, cb ){
            
            console.debug('POST api/locations', data);
            
            $.ajax({
                url: "api/locations",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
            .done(function( data ) {
                cb(data);
            })
            .fail(function(a) {
                console.debug(a);
            });

        },

        addFeedback: function( data, cb ){
            
            console.debug('POST api/feedback', data);

            $.ajax({
                url: "api/feedback",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
            .done(function( data ) {
                cb(data);
            })
            .fail(function(a) {
                console.debug(a);
            });
            
        },

        importInis: function(){
            var that = this;


            // languages = APP.getConfig().languages;
            var languages = ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'];
            var baseLang = 'de';
            var otherLanguages = _.without( languages, baseLang );
            var pathToCsv = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/dummyData/'

            // _.each(languages, function(lang){

                // var csv = d3.csv.parse( pathToCsv + "inis_" + lang + ".csv" );
                
                var inis = {};
                
                _.each( languages, function(lang, i){
                        readCsv(lang, function(){ instantiateEverything(); });
                });

                function readCsv(lang, cb){
                    
                    d3.csv( pathToCsv + "inis_" + lang + ".csv", function(rows){
                        inis[lang] = rows;
                        if( _.size(inis) == languages.length ) cb();
                    });                    

                }

                function instantiateEverything(){

                // d3.csv( pathToCsv + "inis_" + lang + ".csv", function(rows){
                    
                    _.each(inis[baseLang], function(row, i){

                        // create initiative in base language
                        createInitiative({

                            "initiative":{

                                "category": null,
                                "description": row.description? row.description : null,
                                "facebook": row.facebook? row.facebook : null,
                                "image": null,
                                "imageType": null,
                                "locale": baseLang,
                                "mail": row.mail? row.mail : null,
                                "name": row.name? row.name : null,
                                "phone": row.phone? row.phone : null,
                                "rating": 3,
                                "speakerPrivate": row.speakerPrivate? row.speakerPrivate : null,
                                "speakerPublic": row.speakerPublic? row.speakerPublic : null,
                                "spokenLanguages": row.spokenLanguages? row.spokenLanguages : null,
                                "supportWanted": false,
                                "web": row.web? row.web : null

                            }

                        }, i, function( response, iniIndex ){

                            var parentIni = response.initiative;

                            // create initiative translations (use entryId)
                            _.each( otherLanguages, function(lang){
                                
                                // _.each(inis[lang], function(row, i){
                                    
                                    var row = inis[lang][iniIndex];

                                    createInitiative({

                                        "initiative":{

                                            "category": null,
                                            "description": row.description? row.description : null,
                                            "entryId": parentIni.entryId,
                                            "locale": lang,
                                            "name": row.name? row.name : null,
                                            "speakerPublic": null,
                                            "spokenLanguages": row.spokenLanguages? row.spokenLanguages : null

                                        }

                                    });

                                // });

                            });

                            // create its location in base language (use identifier)
                            createLocation({
                                
                                "location": {
                                    "category": null,
                                    "city": row.city? row.city : null,
                                    "description": null,
                                    "district": null,
                                    "event": null,
                                    "facebook": null,
                                    "image": null,
                                    "imageType": null,
                                    "initiative": parentIni.identifier,
                                    "lat": row.lat? row.lat : null,
                                    "locale": baseLang,
                                    "lon": row.lon? row.lon : null,
                                    "mail": null,
                                    "marketEntry": null,
                                    "name": row.name? row.name : null,
                                    "openingHours": row.openingHours? row.openingHours : null,
                                    "phone": null,
                                    "rating": 3,
                                    "scope": false,
                                    "speakerPrivate": null,
                                    "speakerPublic": null,
                                    "spokenLanguages": null,
                                    "street": row.street? row.street : null,
                                    "supportWanted": null,
                                    "type": 0,
                                    "web": null,
                                    "zip": row.zip? row.zip : null
                                }
                                        

                            }, iniIndex, function( response, iniIndex ){

                                var baseLocation = response.location;

                                // create location translations (use entryId)
                                _.each( otherLanguages, function(lang){
                                    
                                    // _.each(inis[lang], function(row, i){

                                        var row = inis[lang][iniIndex];

                                        createLocation({
                                    
                                            "location": {
                                                "category": null,
                                                "description": null,
                                                "entryId": baseLocation.entryId,
                                                "event": null,
                                                // "initiative": null,
                                                "locale": lang,
                                                "marketEntry": null,
                                                "name": row.name? row.name : null,
                                                "openingHours": row.openingHours? row.openingHours : null,
                                                "speakerPublic": null,
                                                "spokenLanguages": null,
                                                "type": 0
                                            }

                                        });

                                    // });

                                });

                            });

                        });

                    });
                }

                // });

            // });

            function createInitiative(data, i, cb){
                $.ajax({
                    url: "api/initiatives",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                .done(function( data ) {
                    if(cb) cb(data, i);
                })
                .fail(function(a) {
                    console.debug(a);
                });
            };

            function createLocation(data, i, cb){
                $.ajax({
                    url: "api/locations",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                .done(function( data ) {
                    if(cb) cb(data, i);
                })
                .fail(function(a) {
                    console.debug(a);
                });
            }
        }

    }

});