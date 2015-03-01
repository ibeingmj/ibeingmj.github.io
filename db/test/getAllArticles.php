<?php
	require_once("config.php");

	$data = array();

	$sql = "SELECT id,title,article,posted_on
			FROM articles
			WHERE archive = FALSE";
	$res = mysql_query( $sql );
	while( $row = mysql_fetch_array( $res ) ){
		$data[$row['id']]['title'] = $row['title'];
		$data[$row['id']]['article'] = substr($row['article'], 0,100);
		$data[$row['id']]['postedOn'] = substr($row['posted_on'], 0,10);
	}

	echo json_encode( $data );

?>