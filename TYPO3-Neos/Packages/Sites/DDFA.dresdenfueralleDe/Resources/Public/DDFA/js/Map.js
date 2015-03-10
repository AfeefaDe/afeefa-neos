// create anmial class
	qx.Class.define("DDFA.Map", {
	  extend : qx.core.Object,
	  properties : {
	    // legs : {init: 4}
	  },
	  members : {
	    render : function() {
	      
	    	var map = L.map('map-container', {
	    		maxBounds: [
	    			L.latLng(50.95, 13.5), // south-west corner
	    			L.latLng(51.2, 14.0)  // north-east corner
    			],
    			zoomControl:false
	    	}).setView([ 51.051, 13.74 ], 13);

			// L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.pencil/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA', {
			L.tileLayer('http://api.tiles.mapbox.com/v4/felixkamille.4128d9e7/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVsaXhrYW1pbGxlIiwiYSI6Ilo1SHFOX0EifQ.pfAzun90Lj1UlVapKI3LiA', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18
			}).addTo(map);

			var markers = [
				{geo: [51.0491571,13.7391965], name: 'Cabana', address: 'Kreuzstraße 7, 01067 Dresden', phone: '0351 492 33 67', mail: 'cabana@infozentrum-dresden.de', web: 'http://www.infozentrum-dresden.de', services: 'Beratung, Integrationskurse, Information'},
				{geo: [51.051, 13.74], name: 'DAMF Deutschkurse für Asylsuchende', address: 'Dresden', phone: '', mail: 'damf-dd@gmx.de', web: 'http://damf.blogsport.de', services: 'Deutschkurse; Niveaueinstufungen, Alphabetisierung, A1, Einstufungstests, ehrenamtlich'},
				{geo: [51.05225,13.70205], name: 'Kontaktgruppe Asyl e.V.', address: 'Emerich-Ambros-Ufer 42, 01159 Dresden', phone: '', mail: 'kontaktgruppe-asyl@web.de', web: 'http://kontaktgruppeasyl.blogsport.de/', services: 'Beratung, Soziokulturelle Angebote, ...'},
				{geo: [51.10749,13.68406], name: 'Bündnis Buntes Radebeul', address: 'August-Bebel-Straße 49, 01445 Radebeul', phone: '0351-8383457', mail: 'info@buntes-radebeul.de', web: 'http://www.buntes-radebeul.de', services: 'Deutschkurse, Einzelfallhilfe und Begleitung, soziokulturelle Angebote, Sammlungen, Netzwerkarbeit'},
				{geo: [51.0242401,13.8379731], name: 'Laubegast ist Bunt', address: 'Österreicher Str. 54, 01279 Dresden', phone: '0157-87828576', mail: 'vitae@cvjm-dresden.de', web: 'http://www.laubegast-ist-bunt.de', services: 'Deutschkurse,Hilfen im Alltag, Freizeitangebote, Veranstaltungen für Flüchtlinge und Anwohner, Plakat-, Flyer- und Postkartenaktionen'},
				{geo: [51.0665643,13.783502], name: 'RAA Sachsen Opferberatung', address: 'Bautzner Str. 45, 01099 Dresden', phone: '(0351) 88 9 41 74', mail: 'opferberatung.dresden@raa-sachsen.de', web: 'http://raa-sachsen.de/index.php/dresden.html', services: 'Parteiliche, klientelorientierte, aufsuchende, vrtrauliche, mehrsprachige und kostenlose Beratung und Unterstützung Betroffener rechtsmotivierter und rassistischer Gewalt, deren Angehörige, Freunde und Freundinnen  sowie Zeug_innen eines Angriffs'}
			];

			require( [ 'hammer' ], function( Hammer ){

				$content = $('#content');
				$map = $('#map-container');
				
				// hide content (map click)
				$map.click(function(){
					$content.removeClass('active');
					$content.removeClass('active-small');
					$content.removeClass('active-large');
				});

				// hide content (swipe down)
				// var mc = new Hammer($content[0]);
				// mc.on("swipedown", function(ev) {
				// 	if ( $content.hasClass('active-large') ){
				// 		$content.removeClass('active-large');
				// 		$content.addClass('active-small');
				// 	}
				// });

				$content.click(function(){
					if ( $content.hasClass('active-small') ){
						$content.removeClass('active-small');
						$content.addClass('active-large');
					}
					else if ( $content.hasClass('active-large') ){
						$content.removeClass('active-large');
						$content.addClass('active-small');
					}
				});

				_.each(markers, function(marker){
					var leafMarker = L.marker(marker.geo).addTo(map);
					// leafMarker.bindPopup('<b>' + marker.name + '</b>' + "<br>" + marker.address + "<br>" + marker.phone + "<br>" + marker.mail + "<br>" + marker.web + "<br>" + marker.services);
					
					leafMarker.on('click', function(){
						if ( !$content.hasClass('active') ){
							$content.addClass('active');
							$content.addClass('active-small');
						}
						
						// render details
						$content.empty();
						$content.append('<p>' + marker.name + '</p>');
						$content.append('<p>' + marker.address + '</p>');
						$content.append('<p>' + marker.phone + '</p>');
						$content.append('<p>' + marker.mail + '</p>');
						$content.append('<p><a target="_blank" href="' + marker.web + '">' + marker.web +'</a></p>');
						$content.append('<p>' + marker.services + '</p>');
						
					});

				});

	      	});

	    }
	  }
	});