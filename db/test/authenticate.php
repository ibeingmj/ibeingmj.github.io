<?php
	require_once('config.php');

	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$data     = array();
	$sql = "SELECT id
			FROM users
			WHERE username = '$username'
			AND password = '$password'
			AND archive = FALSE";	
	$res = mysql_query( $sql );
	if( mysql_num_rows( $res ) > 0 ){
		$data['status'] = true;
		$res = mysql_fetch_assoc( $res );
		$data['userid'] = $res['id'];
	} else {
		$data['status'] = false;
	}
	echo json_encode( $data );

?>