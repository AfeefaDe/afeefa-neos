qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {},
        viewState: { init: 0 },
        loadable: { init : false }
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.view.addClass('view-container');

            if( that.getLoadable() ) {
                var loadingCurtain = $("<div />").addClass('loading-curtain');
                that.view.append(loadingCurtain);
            }

            that.addEvents();
            that.say(that.classname + 'Rendered');
        },

        // set and read the active status of a view
        isActive: function(bool){
            var that = this;

            if(bool === undefined) return that.active;
                that.active = bool;
        },

        // param (key, [locale])
        // @key bib key
        // @locale get wording in a specific language ignoring the current app language
        getWording: function( key, locale ){
            var that = this;

            return APP.getLM().resolve(key, locale);
        },

        loading: function( bool ){
            var that = this;

            if (bool) {
                that.view.addClass('loading');
            }
            else {
                that.view.removeClass('loading');
            }
                
        },

        showCurtain: function(bool){
            var that = this;

            if(bool){
                that.view.css('z-index', 10000);
                APP.getCurtain().addClass('active');
            }
            else {
                that.view.css('z-index', "");
                APP.getCurtain().removeClass('active');
            }
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
                that.changeLanguage();
            });

            ////////////////////////////
            // AFTER VIEW IS RENDERED //
            ////////////////////////////
            // that.listen(that.classname + 'Rendered', function(){
            // });
        },

        changeLanguage: function(){
            
        },

        createTooltip: function(el, content, event, placement, device, cssClasses, contentType){
            var that = this;

            // check device restrictions
            if( device && APP.getUserDevice() != device) return false;

            var popperConfig = {
                content: {
                    content: content,
                    contentType: contentType? contentType : 'html',
                    classNames: cssClasses? _.union(['popper'], cssClasses) : ['popper']
                },
                misc: {
                    placement: placement? placement : null,
                    removeOnDestroy: true
                }
            };

            var thePopper;
            if (event){
                // open on hover
                if( event == 'hover' ){
                    el.hover(
                        function(){
                          thePopper = new Popper(
                                el,
                                popperConfig.content,
                                popperConfig.misc
                            );
                        },
                        function(){
                            thePopper.destroy();
                        }
                    );
                }
            }
            // open immediately
            else {
                thePopper = new Popper(
                    el,
                    popperConfig.content,
                    popperConfig.misc
                );
            }

            return thePopper;
        }
    }

});