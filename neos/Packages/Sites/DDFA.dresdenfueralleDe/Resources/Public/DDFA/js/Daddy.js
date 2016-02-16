qx.Class.define("Daddy", {
    
  type: "abstract",

  extend : qx.core.Object,
  
  properties : {
  },
  
  members : {
    
    get: function( attributeName ) {
        var that = this;

        if(this[attributeName] !== undefined) return this[attributeName];
        else throw new Error( 'requested attribute "' + attributeName + '" does not exist' );
    },

    set: function( attributeName, value ){
        var that = this;

        if(this[attributeName] !== undefined) this[attributeName] = value;
        else throw new Error( 'requested attribute "' + attributeName + '" does not exist' );  
    },

    // trigger global event
    say: function( eventName, data ){
        console.log('say: ' + eventName, '(' + this.name + ')', data);
        
        var event = jQuery.Event( eventName );
        if(data) event.customData = data;
        $( document ).trigger( event );
    },

    listen: function( eventName, cb ){
        var that = this;
        console.log('listen: ' + eventName, '(' + that.name + ')');
        
        // attach event listener to document, but with namespace derived from calling object
        $( document ).on( eventName + '.' + that.name, function(e){
            console.log('heard: ' + eventName, '(' + that.name + ')', e.customData);
            cb(e);
        });
    },

    unlisten: function( eventName ){
        var that = this;
        console.log('unlisten: ' + eventName, '(' + that.name + ')');

        // remove only those event listeners with specific namespace
        $( document ).off( eventName + '.' + that.name)
    }

  }
});