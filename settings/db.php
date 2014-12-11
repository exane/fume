<?php

$config = parse_ini_file(__DIR__ . "/../config.ini");

$db = new mysqli( $config['db_host'], $config['db_user'], $config['db_pw'], $config['db_db']);
$time = time();

function url($matches)
{ // preg_replace_callback() is passed one parameter: $matches.
    if (preg_match('/\.(?:jpe?g|png|gif)(?:$|[?#])/', $matches[0]))
    { // This is an image if path ends in .GIF, .PNG, .JPG or .JPEG.
        return '<img width="290px" height="auto" src="'. $matches[0] .'">';
    } // Otherwise handle as NOT an image.
    return '<a href="'. $matches[0] .'">'. $matches[0] .'</a>';
}




function autolink($str, $attributes=array()) {
  $attrs = '';
  foreach ($attributes as $attribute => $value) {
    $attrs .= " {$attribute}=\"{$value}\"";
  }
$str = ' ' . $str;
$str = preg_replace(
  '`([^"=\'>])(((http|https|ftp)://|www.)[^\s<]+[^\s<\.)])`i',
  '$1<a target="_blank" href="$2"'.$attrs.'>$2</a>',
  $str
);
$str = substr($str, 1);
$str = preg_replace('`href=\"www`','href="http://www',$str);

return $str;
}

$online_user = $db->query( "SELECT * FROM benutzer" );
$username = "";
if(isset($_COOKIE['username'])) {
	$cookie_benutzer = $_COOKIE['username'];
	$user_select = $db->query( "SELECT name, passwort FROM benutzer WHERE name = '$cookie_benutzer'") or die(mysqli_error($db));
	$user_select_obj = $user_select->fetch_object();
	
	$username = $user_select_obj->name;
	$passwort = $user_select_obj->passwort;
}