<?php
include( 'db.php' );

$user_name = $_POST['user'];
$antwort_inhalt = $_POST['inhalt'];
$topic_id = $_POST['topic_id'];

$db->query( "INSERT INTO antworten (topic_id, benutzer, inhalt, zeit) VALUES ('$topic_id', '$user_name', '$antwort_inhalt', '$time')" );
$db->query( "UPDATE topics SET aktuell = '$time' WHERE id = '$topic_id'" );