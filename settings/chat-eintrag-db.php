<?php

include( 'db.php' );
include "../lib/Pusher.php";
$config = parse_ini_file("../config.ini");

$key = $config['pusher_key'];
$secret = $config['pusher_secret'];
$app_id = $config['pusher_id'];
$pusher = new Pusher($key, $secret, $app_id);

$text_inhalt = htmlspecialchars($_POST['text_inhalt']);
$cookie = htmlentities($_POST['cookie']);
$data_id = $_POST['id'];
$time2 = date("H:i", time());

$data = Array("nachricht" => $text_inhalt, "benutzer" => $cookie, "zeit" => $time2, "handy" => false);
$pusher->trigger("nachrichten", "nachrichten senden", $data);

$chat_eintrag = $db->prepare( "INSERT INTO chat (benutzer, inhalt, zeit) VALUES (?, ?, ?)" ) or die(mysql_error());
$chat_eintrag->bind_param( "ssi", $cookie, $text_inhalt, $time );
$chat_eintrag->execute();
