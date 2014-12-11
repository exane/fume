<?php
require_once("../../lib/Pusher.php");
//require_once("Pusher.php");

  class Trigger{
	/**
	*	Attributes
	*/
	private static		$pusher;
	private static          $data = array();

  public function __construct()
  {
    $config = parse_ini_file("../../config.ini");

    defne("APP_KEY", $config['pusher_key']);
    defne("APP_ID", $config['pusher_id']);
    defne("APP_SECRET", $config['pusher_secret']);
    define("CHANNEL", "nachrichten");
    define("EVENT", "nachrichten senden");
  }
	
	/**
	*	Push new Message
	*/
	public static function push($msg, $usr, $time, $handy){
                /**
                 * Create new Pusher instance
                 */
		self::$pusher = new Pusher(Trigger::APP_KEY, Trigger::APP_SECRET, Trigger::APP_ID);
                
                /**
                 * save params into private static vars
                 */
		self::$data["nachricht"] = $msg;
		self::$data["benutzer"] = $usr;
		self::$data["zeit"] = $time;
		self::$data["handy"] = $handy;
                
                /**
                 * trigger Pusher to send data
                 */
		self::$pusher->trigger(Trigger::CHANNEL, Trigger::EVENT, self::$data);
	}
        
        /**
         * Get current Username
         */
        public static function getUsr(){
            return self::$data["benutzer"];
        }
        
        /**
         * Get current Message
         */
        public static function getMsg(){
            return self::$data["nachricht"];
        }
        
        /**
         * Get current Time
         */
        public static function getTime(){
            return self::$data["zeit"];
        }
}


/**********************************
 * need to receive data from java
 *********************************/
/**
 * if push param is set 
 * AND 
 * if push param is equal to Pusher App Key
 */
if(isset($_GET["push"]) && $_GET["push"] == Trigger::APP_KEY){
        /**
         * save both delivered GET params usr and msg
         * into local vars $usr and $msg
         */
	$usr = $_GET["usr"];
	$msg = $_GET["msg"];
	$time = $_GET["time"];
        $handy = $_GET["handy"];
	
        /**
         * Calls push method of Trigger class
         */
	Trigger::push($msg, $usr, $time, $handy);
        
        /**
         * only debugging,
         * not necessary
         */
        echo Trigger::getMsg() . "<br>";
        echo Trigger::getTime() . "<br>";
        echo Trigger::getUsr();
}














