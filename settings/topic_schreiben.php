<?php
include( 'db.php' );

$user_name = $_POST['name'];
$topic_inhalt = $_POST['inhalt'];
$topic_titel = $_POST['titel'];

$db->query( "INSERT INTO topics (titel, benutzer, inhalt, zeit, aktuell) VALUES ('$topic_titel', '$user_name', '$topic_inhalt', '$time', '$time')" );