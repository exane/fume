<?php

  error_reporting(-1);
  ini_set('display_errors', 'On');

include('tpl/head.php');

if(isset($_SESSION['username']) && $_SESSION['username']  == $username) { 
	include( 'tpl/startseite.php' );
} else {
	include( 'tpl/anmelden.php' );
}

include('tpl/footer.php');