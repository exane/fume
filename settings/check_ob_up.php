<?php
include( 'db.php' );
$meine_cookie = $_COOKIE['username'];

$db->query( "UPDATE benutzer SET schreibt = 'false' WHERE name = '$meine_cookie'" );