$( document ).ready(function() {
	
	// switch in index view
	$('.afeefa-table-entry .onoffswitch input').change(function(){
		
		var $checkbox = $(this);
		var id = $(this).attr('data-entry-id');
		
		// unpublish
		if( $checkbox.prop('checked') ){
			$.ajax({
		        url: '/api/publish/' + id,
		        method: 'PUT'
		    });
		}
		// publish
		else {
		    $.ajax({
		        url: '/api/lock/' + id,
		        method: 'PUT'
		    });
		}
	});

	// switch in entry form
	if( !$('.entryform.onoffswitch input').prop('checked') )
	    $('#location-form').hide();

	$('.entryform.onoffswitch input').change(function(){
		
		// unpublish
		if( $(this).prop('checked') ){
		    // $(this).prop('checked', false);
		    $('#location-form').show();
		}
		// publish
		else {
		    // $(this).prop('checked', true);
		    $('#location-form').hide();
		}
	});

	// entry type filter in index view
	$('#entry-filter span.filter-option').click(function(){
		var entryType = $(this).attr('data-entry-type');

		$('tr.afeefa-entry').hide();
		$('tr.afeefa-entry.afeefa-entry-type-' + entryType).show();
	});
	$('#entry-filter span.filter-reset').click(function(){
		$('tr.afeefa-entry').show();
	});

});