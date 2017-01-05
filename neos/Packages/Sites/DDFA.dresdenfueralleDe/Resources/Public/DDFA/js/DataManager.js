qx.Class.define("DataManager", {

    extend: Daddy,
    type: "singleton",

    construct: function () {
        var that = this;

        // that.addEvents();
    },

    members: {

        fetchAllData: function (cb) {
            var that = this;

            var currentAppData = APP.getData();

            that.getAllEntries(function (data) {

                // store entries in APP
                currentAppData.entries = data.marketentries;

                APP.setData(currentAppData);
                that.say('fetchedNewData');

                that.getWifiNodes(function(data){
                    that.say('fetchedNewData');
                });

                that.getLanguageBib(function (data) {  // language bib
                    // store in APP
                    APP.getLM().setBib(data[0]);

                    console.debug('fetchedAllData in ' + APP.getLM().getCurrentLang(), data);
                    cb();  // finished, so callback
                });

            });
        },

        fetchInitialData: function (cb) {
            var that = this;

            // snychronous data calls (wait for all data calls to finish)
            that.getLanguageBib(function (data) {  // language bib
                // store in APP
                APP.getLM().setBib(data[0]);

                that.getAllCategories(function (data) {  // categories
                    // store in APP
                    var currentData = APP.getData();
                    currentData.categories = data.categories;
                    APP.setData(currentData);

                    console.debug('fetchedInitialData', data);
                    cb();  // finished, so callback
                });
            });

        },

        getAllCategories: function (cb) {

            $.ajax({
                url: "api/categories",
                type: 'GET',
                dataType: 'json'
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    console.debug(a);
                });

        },

        getLanguageBib: function (cb) {

            $.ajax({
                url: '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/lang/lang.json',
                type: 'GET',
                dataType: 'text'
            })
                .done(function (data) {
                    cb(JSON.parse(data));
                })
                .fail(function (a) {
                    console.debug(a);
                });

        },

        getAllEntries: function (cb) {

            $.ajax({
                url: "api/marketentries?locale=" + APP.getLM().getCurrentLang(),
                type: 'GET',
                dataType: 'json'
            })
                .done(function (data) {
                    var entries = _.filter(data.marketentries, function (entry) {

                        // filter out owner-less entries
                        // TODO: there shouldn't be any owner-less entries coming from the API
                        if (!entry) return false;

                        // filter out category-less entries
                        // TODO: there shouldn't be any category-less entries coming from the API
                        // if(!entry.marketEntry.category) return false;

                        return true;
                    });

                    data.marketentries = entries;

                    cb(data);
                })
                .fail(function (a) {
                    console.debug(a);
                });

        },

        getEntryByEntryId: function(entryId){
            var that = this;

            var entry = _.find(APP.getData().entries, function(entry){
                return entryId == entry.entryId;
            })

            return entry;
        },

        getAllEvents: function (options) {
            var events = APP.getData().entries.filter(function (entry) {
                if (entry.type != 2) return false;
                if (options && options.mustHaveDate && !entry.dateFrom) return false;
                return true;
            });

            return _.sortBy(events, 'dateFrom');
        },

        getAllLocations: function (cb) {

            $.ajax({
                url: "api/locations?locale=" + APP.getLM().getCurrentLang(),
                type: 'GET',
                dataType: 'json'
            })
            .done(function (data) {
                cb(data);
            })
            .fail(function (a) {
                console.debug(a);
            });
        },

        getWifiNodes: function (cb) {
            var that = this;

            $.ajax({
                url: "externalDataFiles/freifunk-nodes.json",
                type: 'GET',
                dataType: 'json'
            })
            .done(function (data) {
                var wifiNodes = _.filter(data.nodes, function (node) {

                    // filter out dead access points
                    if (!node.status.online) return false;

                    return true;
                });

                that.integrateExternalData(
                    wifiNodes,
                    {
                        name:"Freifunk Wifi"
                        // lat: {value:"position.lat", type:"var"}
                    }
                );
                // cb(wifiNodes);
                cb();
            })
            .fail(function (a) {
                console.debug(a);
            });
        },

        // transform data into needed structure and integrate with other app data
        integrateExternalData: function(data, mapping){
            var that = this;

            var currentAppData = APP.getData();
                    
            var rows = [];
            _.each(data, function(row){
                var newEntry = {
                    external:true,
                    // "name": row.name,
                    "name":mapping? mapping.name : 'mapping missing',
                    "entry_id": 0,
                    "type": 3,
                    "subCategory": 'wifi',
                    "category": {
                        "name":"general",
                    },
                    "certified":false,
                    "description":APP.getLM().resolve("external_wifi_description"),
                    image:"https://freifunk.net/wp-content/uploads/2013/07/spenden.png",
                    imageType:"image",
                    web:"http://www.freifunk-dresden.de/topology/google-maps.html",
                    facebook:"https://www.facebook.com/FreifunkDresden",
                    location:[{
                        "arrival":"",
                        "city":"Dresden",
                        "lat":row.position.lat,
                        "lon":row.position.long,
                        // "placename":"...",
                        // "street":"...",
                        // "zip":"..."
                    }]
                };
                rows.push(newEntry);
            });

            // store data in APP
            var newData = _.union(currentAppData.entries, rows)
            currentAppData.entries = newData;
            
            APP.setData(currentAppData);
        },

        addMarketEntry: function (data, cb) {

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
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb(a);
                });

        },

        addLocation: function (data, cb) {

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
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb(a);
                });

        },

        addFeedback: function (data, cb) {

            // console.debug('POST api/feedback', data);

            $.ajax({
                url: "api/feedback",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: true,
                contentType: false
            })
                .done(function (data) {
                    cb(data);
                })
                .fail(function (a) {
                    cb(a);
                });

        },


        ///////////////////////
        // Outgoing messages //
        ///////////////////////

        createSlackMessage: function (data, cb) {

            var slackMessage = '*' + data.heading + '*' + ':\n' + data.message;

            $.ajax({
                url: "https://hooks.slack.com/services/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",
                type: 'POST',
                data: JSON.stringify({text: slackMessage}),
                cache: false,
                dataType: 'text',
                processData: false
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });

        },

        createGithubIssue: function (data, cb) {
            data.action = 'github';

            $.ajax({
                // url: "_Resources/Static/Packages/DDFA.dresdenfueralleDe/githubAPI/",
                // url: "http://afeefa.hejn.de/githubAPI/",
                url: "messageAPI/",
                // crossDomain: true,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'text',
                processData: true
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });

        },

        sendMail: function (data, cb) {
            data.action = 'mail';

            $.ajax({
                url: "messageAPI/",
                // crossDomain: true,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'text',
                processData: true
                // contentType: false
            })
                .done(function (data) {
                    // cb(data);
                })
                .fail(function (a) {
                    // cb(a);
                });
        },

        ///////////////////////
        // import data lists //
        ///////////////////////
        importEntriesFromCsv: function () {
            var that = this;

            // SETUP ---
            // var languages = ['de', 'en', 'ar', 'fa', 'fr', 'ru', 'sq', 'ku', 'tr', 'es'];
            var languages = ['de'];
            var pathToCsv = 'importData/integrationskurse/';
            
            // fill necessary data gaps
            var area = 'dresden';
            // ---

            var baseLang = 'de';
            var otherLanguages = _.without(languages, baseLang);
            var inis = {};

            _.each(languages, function (lang, i) {
                readCsv(lang, function () {
                    instantiateEverything();
                });
            });

            function readCsv(lang, cb) {

                d3.csv(pathToCsv + "entries_" + lang + ".csv", function (rows) {
                    inis[lang] = rows;
                    if (_.size(inis) == languages.length) cb();
                });

                console.debug(lang, inis);
            };

            function instantiateEverything() {

                _.each(inis[baseLang], function (row, i) {

                    // create initiative in base language
                    createMarketEntryAndLocation(
                        {
                            "marketentry": {
                                "area": area,
                                "locale": baseLang,
                                // "name": row.name ? row.name : null,
                                "name": "Integrationskurs" + " (" + row.traeger + ")",
                                // "category": row.category ? row.category : null,
                                "category": "5dddf63d-ccf6-44e2-8daf-81bb44507fdd",
                                // "subCategory": row.subcategory ? row.subcategory : null,
                                "subCategory": "german-course-state",
                                // "type": row.type ? row.type : null,
                                "type": 0,
                                // "description": row.description ? row.description : null,
                                "description": "Träger: " + row.traeger + "\n\n" + "Spezialisierung: " + row.zulassungen + "\n\n" + "NIVEAU #A1 #A2 #B1\nKOSTEN #förderung\nKURSART #integrationskurs\nABSCHLUSS #zertifikat_integrationskurs #zertifikat_ger",
                                "forChildren": row.forchildren ? row.forchildren : null,
                                "facebook": row.facebook ? row.facebook : null,
                                "image": "http://www.bamf.de/SharedDocs/Bilder/DE/Sonstige/integrationskurs.jpg?__blob=normal&v=3",
                                "imageType": 'image',
                                "mail": row.mail ? row.mail : null,
                                "phone": (row.phone && row.phone != ' ') ? row.phone : null,
                                "speakerPrivate": row.speakerPrivate ? row.speakerPrivate : null,
                                "speakerPublic": row.speakerPublic ? row.speakerPublic : null,
                                "spokenLanguages": row.spokenLanguages ? row.spokenLanguages : null,
                                "supportWanted": false,
                                "web": "http://www.bamf.de/DE/DasBAMF/Aufgaben/Integrationskurs/integrationskurs-node.html",
                                "published": 1
                            }
                        },
                        {
                            "location": {
                                // "placename": row.placename ? row.placename : null,
                                "placename": row.traeger,
                                "street": row.street ? row.street : null,
                                "zip": "0" + row.zip,
                                "city": row.city ? row.city : null,
                                "district": row.district ? row.district : null,
                                "openingHours": row.openinghours ? row.openinghours : null,
                                "arrival": row.arrival ? row.arrival : null,
                                "lat": row.lat ? row.lat : null,
                                "lon": row.lon ? row.lon : null
                            }
                        }, i, function (marketentry, iniIndex) {

                            // var parentIni = response.initiative;

                            // create initiative translations (use entryId)
                            _.each(otherLanguages, function (lang) {

                                var row = inis[lang][iniIndex];

                                createMarketEntryAndLocation(
                                    {
                                        "marketentry": {
                                            "entryId": marketentry.entryId,
                                            "locale": lang,
                                            "type": marketentry.type,
                                            "name": row.name ? row.name : null,
                                            "description": row.description ? row.description : null
                                        }
                                    }
                                );
                            });
                        }
                    );
                });
            };

            // function createInitiative(data, i, cb){
            // 	$.ajax({
            // 		url: "api/initiatives",
            // 		type: 'POST',
            // 		data: data,
            // 		cache: false,
            // 		dataType: 'json',
            // 		processData: true,
            // 		contentType: false
            // 	})
            // 	.done(function( data ) {
            // 		if(cb) cb(data, i);
            // 	})
            // 	.fail(function(a) {
            // 		console.debug(a);
            // 	});
            // };

            function createMarketEntryAndLocation(dataMarketEntry, dataLocation, index, cb) {

                var data_joined = _.extend(dataMarketEntry, dataLocation);

                that.addMarketEntry(data_joined, function (response) {
                    if (!response.marketentry) {
                        console.warn('failed to create market entry', response);
                        // alert(that.getWording('form_fail'));
                        // return;
                    }
                    console.log('successfully created market entry', response);
                    if (cb) cb(response.marketentry, index);
                    // alert(that.getWording('form_success'));
                });
            };

        },

        ///////////////////////
        // import data lists //
        ///////////////////////
        importInis: function () {
            var that = this;

            // languages = APP.getConfig().languages;
            var languages = ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur', 'it'];
            var baseLang = 'de';
            var otherLanguages = _.without(languages, baseLang);
            var pathToCsv = '_Resources/Static/Packages/DDFA.dresdenfueralleDe/DDFA/dummyData/'

            // _.each(languages, function(lang){

            // var csv = d3.csv.parse( pathToCsv + "inis_" + lang + ".csv" );

            var inis = {};

            _.each(languages, function (lang, i) {
                readCsv(lang, function () {
                    instantiateEverything();
                });
            });

            function readCsv(lang, cb) {

                d3.csv(pathToCsv + "inis_" + lang + ".csv", function (rows) {
                    inis[lang] = rows;
                    if (_.size(inis) == languages.length) cb();
                });

            }

            function instantiateEverything() {

                // d3.csv( pathToCsv + "inis_" + lang + ".csv", function(rows){

                _.each(inis[baseLang], function (row, i) {

                    // create initiative in base language
                    createInitiative({

                        "initiative": {

                            "category": null,
                            "description": row.description ? row.description : null,
                            "facebook": row.facebook ? row.facebook : null,
                            "image": null,
                            "imageType": null,
                            "locale": baseLang,
                            "mail": row.mail ? row.mail : null,
                            "name": row.name ? row.name : null,
                            "phone": row.phone ? row.phone : null,
                            "rating": 3,
                            "speakerPrivate": row.speakerPrivate ? row.speakerPrivate : null,
                            "speakerPublic": row.speakerPublic ? row.speakerPublic : null,
                            "spokenLanguages": row.spokenLanguages ? row.spokenLanguages : null,
                            "supportWanted": false,
                            "web": row.web ? row.web : null

                        }

                    }, i, function (response, iniIndex) {

                        var parentIni = response.initiative;

                        // create initiative translations (use entryId)
                        _.each(otherLanguages, function (lang) {

                            // _.each(inis[lang], function(row, i){

                            var row = inis[lang][iniIndex];

                            createInitiative({

                                "initiative": {

                                    "category": null,
                                    "description": row.description ? row.description : null,
                                    "entryId": parentIni.entryId,
                                    "locale": lang,
                                    "name": row.name ? row.name : null,
                                    "speakerPublic": null,
                                    "spokenLanguages": row.spokenLanguages ? row.spokenLanguages : null

                                }

                            });

                            // });

                        });

                        // create its location in base language (use identifier)
                        createLocation({

                            "location": {
                                "category": null,
                                "city": row.city ? row.city : null,
                                "description": null,
                                "district": null,
                                "event": null,
                                "facebook": null,
                                "image": null,
                                "imageType": null,
                                "initiative": parentIni.identifier,
                                "lat": row.lat ? row.lat : null,
                                "locale": baseLang,
                                "lon": row.lon ? row.lon : null,
                                "mail": null,
                                "marketEntry": null,
                                "name": row.name ? row.name : null,
                                "openingHours": row.openingHours ? row.openingHours : null,
                                "phone": null,
                                "rating": 3,
                                "scope": false,
                                "speakerPrivate": null,
                                "speakerPublic": null,
                                "spokenLanguages": null,
                                "street": row.street ? row.street : null,
                                "supportWanted": null,
                                "type": 0,
                                "web": null,
                                "zip": row.zip ? row.zip : null
                            }


                        }, iniIndex, function (response, iniIndex) {

                            var baseLocation = response.location;

                            // create location translations (use entryId)
                            _.each(otherLanguages, function (lang) {

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
                                        "name": row.name ? row.name : null,
                                        "openingHours": row.openingHours ? row.openingHours : null,
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

            function createInitiative(data, i, cb) {
                $.ajax({
                    url: "api/initiatives",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                    .done(function (data) {
                        if (cb) cb(data, i);
                    })
                    .fail(function (a) {
                        console.debug(a);
                    });
            };

            function createLocation(data, i, cb) {
                $.ajax({
                    url: "api/locations",
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: true,
                    contentType: false
                })
                    .done(function (data) {
                        if (cb) cb(data, i);
                    })
                    .fail(function (a) {
                        console.debug(a);
                    });
            }
        }

    }

});