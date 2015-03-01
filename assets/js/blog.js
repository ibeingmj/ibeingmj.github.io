$( document ).ready(function(){
	var userid = sessionStorage.getItem("userid");
	$( "form[name=newPost]" ).submit(function( formEvent ){
		var blogContent = $( '#blog' ).val();
		blogContent = escapeHtml( blogContent );
		var newPostData = {
			'title' : $( '#title' ).val(),
			'blog'  : blogContent,
			'user'  : userid,
			'functionName' : 'newPost'
		};
				
		$.ajax({
			type : "POST",
			url  : "http://192.168.90.12/test/blog.php",
			data : newPostData
		})
		.done(function( data ){
			sessionStorage.setItem("message","Inserted Successfully");
			window.location = "dashboard.html";
		})
		.fail(function(){
			alert('failed');
		});

		formEvent.preventDefault();  // prevents reloading the page
	});

	function escapeHtml(text) {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

});