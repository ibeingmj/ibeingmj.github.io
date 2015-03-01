<?php
	require_once("config.php");

	$userid = $_GET['userid'];
	$data = array();

	$sql = "SELECT id,title,article,posted_on
			FROM articles
			WHERE username = '$userid'
			AND archive = FALSE";
	$res = mysql_query( $sql );
	while( $row = mysql_fetch_array( $res ) ){
		$data[$row['id']]['title'] = $row['title'];
		$data[$row['id']]['article'] = $row['article'];
		$data[$row['id']]['postedOn'] = $row['posted_on'];
	}

	echo json_encode( $data );

?>