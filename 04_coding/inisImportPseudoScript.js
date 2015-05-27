
languages: ['de', 'en', 'ar', 'fa', 'fr', 'sr', 'ru', 'ti', 'ur'];

languages.each(function(lang){

	read("inis_" + lang + ".csv", function(data){
		
		data.each(function(row, i){

			var ini = new Initiative({

				entryId: "foo_" + i,
				locale: lang,
				name: row.name,
				image: row.image? row.image : null,
				description: row.description? row.description : null,
				speakerPublic: row.speakerPublic? row.speakerPublic : null,
				speakerPrivate: row.speakerPrivate? row.speakerPrivate : null,
				spokenLanguages: row.languages? row.languages : null,
				mail: row.mail? row.mail : null,
				web: row.website? row.website : null,
				facebook: row.facebook? row.facebook : null,
				phone: row.phone? row.phone : null,
				supportNeeded: false,

			});

			new Location({
				
				entryId: "goo_" + i,
				locale: lang,
				initiative: ini,
				name: row.name,
				openingHours: row.openingHours? row.openingHours : null,
				rating: 3,
				scope: false,
				district: null,
				street: row.street? row.street : null,
				zip: row.zip? row.zip : null,
				city: row.city? row.city : null,
				lat: row.lat? row.lat : null,
				lon: row.lon? row.lon : null
				// alle nicht gesetzten properties scheinen aus der ini durch, falls dort gesetzt.
				// die ini-liste stellt ja momentan Initiative und Location in einem dar,
				// daher werden nur location-spezifische properties gesetzt, der rest scheint vom parent durch

			});

		});

	});

});