<?php
session_start();
include( 'db.php' );

$benutzer2 = htmlentities($_POST['benutzer']);
$pw2 = md5($_POST['pw']);

$benutzer_pw = $db->query( "SELECT name, passwort FROM benutzer WHERE name = '$benutzer2'" );

$benutzer_pw_obj = $benutzer_pw->fetch_object();

if($benutzer_pw_obj->passwort == $pw2) {
	setcookie("username",$benutzer_pw_obj->name,time() + 9999999, '/', NULL, 0 );
	setcookie("passwort",$benutzer_pw_obj->passwort,time() + 9999999, '/', NULL, 0 );
	$_SESSION['username'] = $benutzer_pw_obj->name;
}