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
            $.ajax({
                url: "api/marketentries",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
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
            var languages = ['de'];
            var pathToCsv = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/dummyData/'

            _.each(languages, function(lang){

                // read("inis_" + lang + ".csv", function(data){
                
                // var csv = d3.csv.parse( pathToCsv + "inis_" + lang + ".csv" );
                d3.csv( pathToCsv + "inis_" + lang + ".csv", function(rows){
                    
                    _.each(rows, function(row, i){

                        // create initiative in basic language
                        createInitiative({

                            "initiative":{

                                "category": null,
                                "description": row.description? row.description : null,
                                "facebook": row.facebook? row.facebook : null,
                                "image": row.image? row.image : null,
                                "imageType": null,
                                "locale": lang,
                                "mail": row.mail? row.mail : null,
                                "name": row.name,
                                "phone": row.phone? row.phone : null,
                                "rating": 3,
                                "speakerPrivate": row.speakerPrivate? row.speakerPrivate : null,
                                "speakerPublic": row.speakerPublic? row.speakerPublic : null,
                                "spokenLanguages": row.spokenLanguages? row.spokenLanguages : null,
                                "supportWanted": false,
                                "web": row.web? row.web : null,

                            }

                        }, function( response ){

                            var parentIni = response.initiative;

                            // create initiative translations (use entryId)

                            // create its location in basic language (use identifier)
                            var location = createLocation({
                                
                                "location": {
                                    "category": null,
                                    "city": row.city? row.city : null,
                                    "description": null,
                                    "district": null,
                                    "event": null,
                                    "facebook": "",
                                    "image": null,
                                    "imageType": null,
                                    "initiative": parentIni.identifier,
                                    "lat": row.lat? row.lat : null,
                                    "locale": lang,
                                    "lon": row.lon? row.lon : null,
                                    "mail": null,
                                    "marketEntry": null,
                                    "name": row.name,
                                    "openingHours": row.openingHours? row.openingHours : null,
                                    "phone": "",
                                    "rating": 3,
                                    "scope": false,
                                    "speakerPrivate": null,
                                    "speakerPublic": null,
                                    "spokenLanguages": null,
                                    "street": row.street? row.street : null,
                                    "supportWanted": null,
                                    "type": 0,
                                    "web": null,
                                    "zip": row.zip? row.zip : null,
                                }
                                        

                            });

                        });

                        });

                });

            });

            function createInitiative(data, cb){
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
                    if(cb) cb(data);
                })
                .fail(function(a) {
                    console.debug(a);
                });
            };

            function createLocation(data, cb){
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
                    if(cb) cb(data);
                })
                .fail(function(a) {
                    console.debug(a);
                });
            }
        },

        // getRunner: function( id, cb ){
        //     $.ajax({
        //         url: "php/api/runners/"+id,
        //         type: 'GET',
        //         dataType: 'json'
        //     })
        //     .done(function( data ) {
        //         cb(data);
        //     });
        // },

        // addRunner: function( data, cb ){
        //     $.ajax({
        //         url: "php/api/runners",
        //         type: 'POST',
        //         data: data,
        //         cache: false,
        //         dataType: 'json',
        //         processData: false,
        //         contentType: false
        //     })
        //     .done(function( data ) {
        //         cb(data);
        //     });
        // },

        // addRunner: function( data, cb ){
        //     $.ajax({
        //         url: "php/api/runners",
        //         type: 'POST',
        //         data: data,
        //         dataType: 'json',
        //         cache: false
        //     })
        //     .done(function( data ) {
        //         cb(data);
        //     });
        // },

    }

});