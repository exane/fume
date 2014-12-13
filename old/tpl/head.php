<?php
	session_start();

  $config = parse_ini_file("config.ini");

	include( 'settings/db.php' );

	if(isset($_COOKIE['username']) && $_COOKIE['username'] == $username && isset($_COOKIE['passwort']) && $_COOKIE['passwort'] == $passwort) {
		$_SESSION["username"] = $username;	
	}

	if (!isset($_COOKIE["benutzer"])) {
		$cookie_rnd = rand(1,2000);
		setcookie("benutzer", $cookie_rnd, time() + 99999999);
	}
?>
<!doctype html>
<html>
<head>

<!--
user online richtig checken:
neue tabelle (user_online), dort die session id reinmachen -> online angezeigt
alle 1 minute checken ob die session drin ist, wenn 1x nicht drin -> afk, beim zweiten check -> offline
-->

	<meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0" name="viewport">
  <title>fume</title>
  <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet'>
  <link rel="stylesheet" href="<?php echo $config['url']; ?>css/style2.css">
  <link rel="icon" href="<?php echo $config['url']; ?>favicon.ico" type="image/x-icon">

</head>
<body id="nope">
<div id="overlay"></div>