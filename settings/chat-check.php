<?php
include( 'db.php' );

$sql = "SELECT * FROM chat ORDER BY id DESC";
$check_id = $db->query($sql);
$check_id_obj = $check_id->fetch_object();

echo $check_id_obj->id;