qx.Class.define("LanguageViewMobile",{extend:LanguageView,type:"singleton",construct:function(){var e=this;e.setViewId("languageViewMobile")},members:{render:function(){var e=this;e.view=$("<div />"),e.view.attr("id",e.getViewId()),e.rootBtn=$("<div />"),e.rootBtn.addClass("root-btn"),e.view.append(e.rootBtn),e.menu=$("<div />"),e.menu.attr("id","lang-menu"),e.view.append(e.menu),e.buttons=[],_.each(APP.getConfig().languages,function(t){var n=$("<div />");n.addClass("btn "+t),n.click(function(){e.say("languageChanged",t),e.close()}),e.buttons.push(n),e.menu.append(n)}),$("#main-container").append(e.view),e.addEvents(),e.load()},load:function(){var e=this;e.rootBtn.addClass(APP.getLM().getCurrentLang())},addEvents:function(){var e=this;this.base(arguments),e.rootBtn.click(function(){$("#main-container").addClass("shifted-small"),e.say("languageMenuOpened")}),e.listen("curtainclicked",function(){e.close()}),e.listen("mainMenuOpened",function(){e.menu.addClass("hidden")}),e.listen("shiftMenuClosed",function(){e.menu.removeClass("hidden")})},reset:function(){var e=this;_.each(APP.getConfig().languages,function(t){e.rootBtn.removeClass(t)})},close:function(){var e=this;$("#main-container").removeClass("shifted-small"),e.say("shiftMenuClosed")}}});