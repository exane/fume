<?php
include( 'db.php' );

$meine_cookie2 = $_COOKIE['username'];

$db->query( "UPDATE benutzer SET schreibt = 'true' WHERE name = '$meine_cookie2'" );