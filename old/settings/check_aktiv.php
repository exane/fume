<?php

include( 'db.php' );
$name_cookie2 = $_COOKIE['username'];


$db->query( "UPDATE benutzer SET aktiv = '$time' WHERE name = '$name_cookie2'" );