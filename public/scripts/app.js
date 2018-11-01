$(document).ready(function() {
	
	//	Toggle Notes Display
	$(document).on('click', '.show-note', function() {
		var id = $(this).data('id');
		$('.note:not(#' + id + ')').addClass('js-hidden');
		$('#' + id).toggleClass('js-hidden');
		if($(this).text() == 'Show Notes') {
			$(this).text('Hide Notes');
		} else {
			$(this).text('Show Notes');
		}
		$('.show-note:not([data-id=' + id + '])').text('Show Notes');
	});
	
	$(document).on('click', '.submit-note', function(e) {
		e.preventDefault();
		var articleID = $(this).data('articleid');
		
		var body = $('#body-' + articleID).val().trim();
		
		if(body == '') {
			return alert('Note must contain content before saving');
		}
		
		$.ajax({
			method: 'POST',
			url: '/api/articles/' + articleID,
			data: {
				body: body
			}
		}).then(function(data) {
			console.log(data);
// 			location.reload();
// 			$('#body-' + articleID).val('');
		});
	});
	
});	//	End of doc ready