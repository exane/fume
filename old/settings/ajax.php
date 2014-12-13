<?php
include( 'db.php' );

$meine_cookie2 = $_COOKIE['username'];

$cookiedb = $db->query( "SELECT * FROM benutzer" ) or die(mysqli_error($db));


while($cookiedb_obj = $cookiedb->fetch_object()) {

	if($cookiedb_obj->schreibt == "true" && $_COOKIE['username'] == $cookiedb_obj->name) {
		echo "";
	} else if ($cookiedb_obj->schreibt == "true" && $_COOKIE['username'] != $cookiedb_obj->name) {
		echo "schreibt gerade...";
	};

}