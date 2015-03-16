$( document ).ready(function(){
	/*
		1. Call the method - 'getAllArticles' when the document is ready.
		2. When someone clicks on the title, pass the article ID to the method - 'readArticle', and REPLACE the HTML of the div - #mainDiv with the GET'ted data
		3. When someone clicks on 'BACK' button, call the method - 'getAllArticles'

	*/

	readArticle = function( articleId ){
		$( '#mainDiv' ).html("<div id='loader'><img src='assets/img/loader.gif' alt=''>");
		var articleInfo = {
			'articleId' : articleId
		};
		$.ajax({
			type : "GET",
			url  : "http://craftmanoj.host22.com/readArticle.php",
			data : articleInfo
		})
		.done(function( data ){
			var parsedArticle = $.parseJSON( data );
			$( 'title' ).text( parsedArticle['title'] );
			$( '#mainDiv' ).append("</div><section class='post'><header class='post-header'><button class='pure-button' onclick='getAllArticles();'> Back </button><h2 class='post-title'>"+ parsedArticle['title'] +"</h2><p class='post-meta'>"+ parsedArticle['postedOn'] +"</p></header><div class='post-description'><p>"+ parsedArticle['article'] +"</p></div></section>");
			$( '#loader' ).fadeOut(400, function(){ $( this ).remove(); });
		})
		.fail(function(){
			alert('Something went wrong, redirecting to home');
			getAllArticles();
		});
	}

	getAllArticles = function(){
		$( '#mainDiv' ).html("<div id='articles'><div id='loader'><img src='assets/img/loader.gif' alt=''></div>");
		$.ajax({
			type : "GET",
			url  : "http://craftmanoj.host22.com/getAllArticles.php"
		})
		.done(function( data ){
			var parsedData = $.parseJSON( data );
			$( 'title' ).text( "Manoj M Bharadwaj | ibeingmj Blog" );
			for( id in parsedData ){
				$( "#articles" ).prepend("<section class='post'><header class='post-header'><h2 class='post-title'><a onclick='readArticle("+ id +");'>"+ parsedData[id]['title'] +"</a></h2><p class='post-meta'>"+ parsedData[id]['postedOn'] +"</p></header><div class='post-description'><p>"+ parsedData[id]['article'] +"</p></div></section>");
			}
			$( '#mainDiv' ).append("</div>");
			$( '#loader' ).fadeOut(400, function(){ $( this ).remove(); });
		})
		.fail(function(){

		});
	}

	getAllArticles();		// call getAllArticles when Document is ready;


});