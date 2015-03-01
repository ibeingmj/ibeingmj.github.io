<?php
	require_once("config.php");
	$title  = $_POST['title'];
	$blog   = $_POST['blog'];
	$userid = $_POST['userid'];
	$data   = array();

	if( empty( $_POST ) ){
		$data['status'] = false;
	} else {
		$data['status'] = true;
		$sql = "INSERT INTO articles(username,title,article)
				VALUES('$userid','$title','$blog')";
		$res = mysql_query( $sql );
	}

	echo json_encode($data);


?>