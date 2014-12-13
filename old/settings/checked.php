<?php
include( 'db.php' );

$tools_check = $_POST['tools_check'];
$meine_cookie3 = $_COOKIE['username'];

$db->query( "UPDATE benutzer SET tools = '$tools_check' WHERE name = '$meine_cookie3'" );
