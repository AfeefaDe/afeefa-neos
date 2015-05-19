qx.Class.define("DataManager", {
    
    extend : qx.core.Object,
    type: "singleton",	

    construct: function(){
    	var that = this;

    },

    members : {
        
        fetchAllData: function( cb ){
            var that = this;

            // var initiativesFetched, locationsFetched = false;
            var initiatives, locations;

            // fetch initiatives
            // initiativesFetched = true;

            // fetch locations
            that.getAllLocations(function(data){
                locations = data;
                // var locationsFetched = true;
                cb( {initiatives: initiatives, locations: locations});
            });
            
            // callback
            // while( !initiativesFetched || !locationsFetched )

        },

        // dummy version
        getAllLocations: function( cb ){

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

        _getAllLocations: function( cb ){

            $.ajax({
                url: "dd4all/locations",
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

        getRunner: function( id, cb ){
            $.ajax({
                url: "php/api/runners/"+id,
                type: 'GET',
                dataType: 'json'
            })
            .done(function( data ) {
                cb(data);
            });
        },

        addRunner: function( data, cb ){
            $.ajax({
                url: "php/api/runners",
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false
            })
            .done(function( data ) {
                cb(data);
            });
        },

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

        updateRunner: function( cb ){

        },

        deleteRunner: function( cb ){

        },

        //////////////
        // Projects //
        //////////////
    }

});