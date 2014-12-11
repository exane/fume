<?php
include( 'db.php' );
require_once "../lib/Pusher.php";
$config = parse_ini_file("../config.ini");

$key = $config['pusher_key'];
$secret = $config['pusher_secret'];
$app_id = $config['pusher_id'];
$pusher = new Pusher($key, $secret, $app_id);

$user2 = htmlentities($_POST['user']);

$data = Array("benutzer" => $user2);
$pusher->trigger("schreiben", "schreibt", $data);