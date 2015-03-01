$( document ).ready(function(){
	var userid = sessionStorage.getItem("userid");
	var message = sessionStorage.getItem("message");

	if( message != null && message != 0 ){
		$( '#message' ).text( message ).fadeOut(5000,function(){ $( this ).remove(); });;
		message = sessionStorage.setItem("message",0);
	}

	sessionStorage.setItem("postid",0);
	if( userid == null ){
		alert("session expired");
		window.location = "index.html";
	}

	var formData = {
		'userid' : userid
	};

	deletePost = function( id ){
		var deleteArticle = {
			'articleId' : id
		};
		alert(id);
		$.ajax({
			type : "POST",
			url  : "http://craftmanoj.host22.com/deleteArticle.php",
			data : deleteArticle
		})
		.done(function(data){
			var removeTR = "#"+id;
			$( removeTR ).fadeOut(1000,function(){ $( this ).remove(); });
			$( '#message' ).text( "Post Deleted" );
		})
		.fail(function(){
			alert('failed');
		});
	}
	editPost = function( id ){
		alert( id );
	}
	readArticle = function( id ){
		sessionStorage.setItem("postid",id);
		window.location = "articles.html";
	}

	$.ajax({
		type : "GET",
		url  : "http://craftmanoj.host22.com/getAllArticles.php",
		data : formData
	})
	.done(function( data ){
		var parsedData = $.parseJSON( data );
		var counter = 1;
		for( id in parsedData ){
			$( '#articleTable' ).append("<tr id='"+ id +"'><td>"+( counter++ )+"</td><td><button class='button-success pure-button' onclick='readArticle("+ id +");'>"+ parsedData[id]['title'] +"</button></td><td>"+ parsedData[id]['postedOn'] +"</td><td><button class='button-warning pure-button' onclick='editPost("+id+");'>  Edit </button></td><td><button class='button-error pure-button' onclick='deletePost("+ id +");'> Delete </button></td></tr>");
		}
	})
	.fail(function(){
		$( '#articleTable' ).append("<tr><td></td><td> something went terribly wrong </td><td></td><td></td><td></td></tr>");
	});

	$( "form[name=blogForm]" ).submit(function(){
		var title = $( '#title' ).val();
		var blog = $( '#blog' ).val();
		var formData = {
			'title' : title,
			'blog'  : blog,
			'userid': userid
		};

		$.ajax({
			type : "POST",
			url  : "http://craftmanoj.host22.com/publishBlog.php",
			data : formData
		})
		.done(function(data){
			var parsedData = $.parseJSON( data );
			if( parsedData.status ){
				// location.reload();
			} else {
				$( 'body' ).append("<h2>Something went wrong </h2>");
			}
		})
		.fail(function(){
			alert('wrong');
		});
		return false;
	});
	return false;


});
