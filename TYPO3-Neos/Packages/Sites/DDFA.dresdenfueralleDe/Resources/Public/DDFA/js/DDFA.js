qx.Class.define("DDFA", {
    extend : qx.core.Object,
    type: "singleton",

    // extend: "Daddy",

    construct: function(){
        var that = this;

        that.setTitle('connecteDD');
        that.setDataManager(new DataManager());
        that.setRouter(new Router());
    },

    properties : {
        title: {},
        DataManager: {},
        Router: {},
        data: {},
        detailView: {}
    },

    members : {
        

        init: function( cb ){
            var that = this;
            
            that.getDataManager().fetchAllData(function( data ){
              console.debug('fetchedAllData', data);

              that.setData(data);

              cb();
            });
        }
    }

});