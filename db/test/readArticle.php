<?php
	require_once("config.php");
	// $userid = $_GET['userid'];
	$articleId = $_GET['articleId'];

	$sql = "SELECT title,article,posted_on
			FROM articles
			WHERE id='$articleId'";
	$res = mysql_query( $sql );
	$res = mysql_fetch_assoc( $res );
	$res['postedOn'] = substr($res['posted_on'], 0,10);
	echo json_encode( $res );
?>