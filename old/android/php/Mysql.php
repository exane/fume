<?php

require("Mysql.h.php");

class Mysql{
	/**
	*	Attributes
	*/
	private $server;
	private $user;
	private $pw;
	private $db;
	
	
	/**
	*	Konstruktor
	*/
	public function __construct(){
		$this->server = SERVER;
		$this->user = USER;
		$this->pw = PW;
		$this->db = DB;
	}
	
	/**
	*	Methods
	*/
	
	/**
	* Connect Function
	*/
	private function connect(){
		mysql_connect($this->server, $this->user, $this->pw);
		mysql_select_db($this->db);
	}
	
	/**
	* Select Function
	* Returns JSON string
	*/
	public function select($query){
		$this->connect();
		$res = null;
		$i = 0;
		
		$q = mysql_query($query);
		
		while($row = mysql_fetch_assoc($q)){
			$res[$i++] = $row;
		}
		$res = json_encode($res);
		return $res;
	}
	
	/**
	* Update Function
	* Set entries like INSERT INTO and UPDATE
	*/
	public function update($query){
		$this->connect();
		mysql_query($query);
		
	}
	
	/**
	* Debug Test Function
	*/
	public function yolo(){
		$this->connect();
		$q = mysql_query("select * from `char`");
		$q = mysql_fetch_assoc($q);
		echo $q["name"];
		
	}
	
}































