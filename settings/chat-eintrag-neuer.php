<?php

include( 'db.php' );

$last_id = $_POST['last_id'];
$new_id = $_POST['new_id'];

$neuer_query = $db->query( "SELECT * FROM chat WHERE id > '$last_id' AND id <= '$new_id' ORDER BY id" );
$neuer_query_obj = $neuer_query->fetch_object();
$farbe = "weiss";
if( isset( $_COOKIE['username'] ) ) {
	if ($_COOKIE['username'] === $neuer_query_obj->benutzer ) {
					$farbe = "gruen";
				} else {
					$farbe = "weiss";
				} 
}


if ($_COOKIE['username'] !== $neuer_query_obj->benutzer ) {
?>


<div class="raum <?php echo $farbe; ?>" data-id="<?php echo $neuer_query_obj->id; ?>">
					<div class="sprite pfeil"></div>
					<p><?php echo nl2br(autolink(str_replace("(str_plus)", "+", $neuer_query_obj->inhalt))); ?></p>
					<span><?php echo date("H:i", $neuer_query_obj->zeit); ?></span>
				</div>

<?php  } ?>