<?php 
include('tpl/head.php'); 


if(isset($_SESSION['username']) && $_SESSION['username']  == $username) { 
	include( 'tpl/topics.php' );
} else {
	include( 'tpl/anmelden.php' );
}


include('tpl/footer.php');