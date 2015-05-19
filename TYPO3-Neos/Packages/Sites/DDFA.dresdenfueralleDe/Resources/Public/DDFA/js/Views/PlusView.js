qx.Class.define("PlusView", {
    
    extend : qx.core.Object,
	type: "singleton",

    construct: function(){
    	var that = this;

    	that.render();
    },

    members : {
        
    	render: function(){
    		var that = this;

            var view = $("<div />");
            view.attr('id', 'plusView');

            var plusBtn = $("<div />");
            plusBtn.addClass('plusBtn');
            plusBtn.append('+');

            view.append(plusBtn);
            // for(var j = 0; j < 500; j++) {
            //     parent.append($('<div/>').append($('<span/>', {text :'Some More Stuff'})));
            //     parent.append($('<div/>',{ text: 'Some conditionalContent' }));
            // }
            // console.timeEnd('DOM'); //149ms
    		
            // $('body').append('<div id="plusView"></div>');
            $('body').append(view);
    	}
    }

});