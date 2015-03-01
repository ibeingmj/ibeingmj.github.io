<?php
	require_once("config.php");

	if( $_POST['functionName'] == 'newPost' ){
		newPost( $_POST );
	}


	function newPost( $postData ){
		$title = $postData['title'];
		$blog  = $postData['blog'];
		$user  = $postData['user'];

		$sql = "INSERT INTO articles(username,title,article) VALUES($user,'$title','$blog') ";
		$res = mysql_query( $sql );
		echo json_encode( 1 );
	}





?>