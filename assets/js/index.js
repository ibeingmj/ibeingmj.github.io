$( document ).ready(function(){
	/*
		1. Call the method - 'getAllArticles' when the document is ready.
		2. When someone clicks on the title, pass the article ID to the method - 'readArticle', and REPLACE the HTML of the div - #mainDiv with the GET'ted data
		3. When someone clicks on 'BACK' button, call the method - 'getAllArticles'

	*/

	readArticle = function( articleId ){
		var articleInfo = {
			'articleId' : articleId
		};
		$.ajax({
			type : "GET",
			url  : "http://192.168.90.12/test/readArticle.php",
			data : articleInfo
		})
		.done(function( data ){
			var parsedArticle = $.parseJSON( data );
			$( 'title' ).text( parsedArticle['title'] );
			$( '#mainDiv' ).html("<section class='post'><header class='post-header'><button class='pure-button' onclick='getAllArticles();'> Back </button><h2 class='post-title'>"+ parsedArticle['title'] +"</h2><p class='post-meta'>"+ parsedArticle['postedOn'] +"</p></header><div class='post-description'><p>"+ parsedArticle['article'] +"</p></div></section>");
		})
		.fail(function(){
			alert('no');
		});
	}

	getAllArticles = function(){
		$.ajax({
			type : "GET",
			url  : "http://192.168.90.12/test/getAllArticles.php"
		})
		.done(function( data ){
			var parsedData = $.parseJSON( data );
			$( 'title' ).text( "Manoj M Bharadwaj | Blog" );
			$( '#mainDiv' ).html("<div id='articles'>");
			for( id in parsedData ){
				$( "#articles" ).prepend("<section class='post'><header class='post-header'><h2 class='post-title'><a onclick='readArticle("+ id +");'>"+ parsedData[id]['title'] +"</a></h2><p class='post-meta'>"+ parsedData[id]['postedOn'] +"</p></header><div class='post-description'><p>"+ parsedData[id]['article'] +"</p></div></section>");
			}
			$( '#mainDiv' ).append("</div>");
		})
		.fail(function(){

		});
	}

	getAllArticles();		// call getAllArticles when Document is ready;


});