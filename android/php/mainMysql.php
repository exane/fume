<?php

require("Mysql.php");

/**
* Debug
*/
if(isset($_GET["blubb"])){
	//echo "test";
	//$query = new Mysql;
	//echo $query->select("select * from `char`");
	//echo "lol";
	//if($_GET["blubb"] == "lool lol") return;
	//$q = new Mysql;
	//$q->yolo();
}

/**
* Select query
*/
if(isset($_GET["select"])){
//SELECT * FROM `chat` WHERE `id` = 1
	$query = $_GET["select"];
	//$query = "SELECT * FROM `chat` WHERE `id` = 1";
	$sql = new Mysql;
	$res = $sql->select($query);
	echo $res;
}

/**
* Update query
*/
if(isset($_GET["update"])){
	$query = $_GET["update"];
	$sql = new Mysql;
	echo $query;
	$sql->update($query);
}


