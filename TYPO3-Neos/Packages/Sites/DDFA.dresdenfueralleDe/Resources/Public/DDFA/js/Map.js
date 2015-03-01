// create anmial class
	qx.Class.define("DDFA.Map", {
	  extend : qx.core.Object,
	  properties : {
	    // legs : {init: 4}
	  },
	  members : {
	    render : function() {
	      
	    	var map = L.map('mapContainer', {
	    		maxBounds: [
	    			L.latLng(50.95, 13.5), // south-west corner
	    			L.latLng(51.2, 14.0)  // north-east corner
    			]
	    	}).setView([ 51.051, 13.74 ], 13);

			// L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA', {
			L.tileLayer('http://api.tiles.mapbox.com/v4/felixkamille.4128d9e7/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18
			}).addTo(map);

			var markers = [
				{geo: [51.0491571,13.7391965], name: 'Cabana', address: 'Kreuzstraße 7, 01067 Dresden', phone: '0351 492 33 67', mail: 'cabana@infozentrum-dresden.de', web: 'www.infozentrum-dresden.de', services: 'Beratung, Integrationskurse, Information'},
				{geo: [51.051, 13.74], name: 'DAMF Deutschkurse für Asylsuchende', address: 'Dresden', phone: '', mail: 'damf-dd@gmx.de', web: 'damf.blogsport.de', services: 'Deutschkurse; Niveaueinstufungen, Alphabetisierung, A1, Einstufungstests, ehrenamtlich'},
				{geo: [51.05225,13.70205], name: 'Kontaktgruppe Asyl e.V.', address: 'Emerich-Ambros-Ufer 42, 01159 Dresden', phone: '', mail: 'kontaktgruppe-asyl@web.de', web: 'http://kontaktgruppeasyl.blogsport.de/', services: 'Beratung, Soziokulturelle Angebote, ...'},
				{geo: [51.10749,13.68406], name: 'Bündnis Buntes Radebeul', address: 'August-Bebel-Straße 49, 01445 Radebeul', phone: '0351-8383457', mail: 'info@buntes-radebeul.de', web: 'www.buntes-radebeul.de', services: 'Deutschkurse, Einzelfallhilfe und Begleitung, soziokulturelle Angebote, Sammlungen, Netzwerkarbeit'},
				{geo: [51.0242401,13.8379731], name: 'Laubegast ist Bunt', address: 'Österreicher Str. 54, 01279 Dresden', phone: '0157-87828576', mail: 'vitae@cvjm-dresden.de', web: 'www.laubegast-ist-bunt.de', services: 'Deutschkurse,Hilfen im Alltag, Freizeitangebote, Veranstaltungen für Flüchtlinge und Anwohner, Plakat-, Flyer- und Postkartenaktionen'}
			];

			_.each(markers, function(marker){
				var leafMarker = L.marker(marker.geo).addTo(map);
				leafMarker.bindPopup('<b>' + marker.name + '</b>' + "<br>" + marker.address + "<br>" + marker.phone + "<br>" + marker.mail + "<br>" + marker.web + "<br>" + marker.services);
			});
	      
	    }
	  }
	});