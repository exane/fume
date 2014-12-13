<?php

define("DEBUG",false);

$config = parse_ini_file("../../config.ini");

  if(DEBUG){
	/**
	* localhost Debugging
	*/
	
}
else {
	define("USER", $config['db_user']);
	define("PW", $config['db_pw']);
	define("SERVER", $config['db_host']);
	define("DB", $config['db_db']);
}












