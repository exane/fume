<?php 
$cookie_benutzer2 = $_COOKIE['username'];
$db_name = $db->query( "SELECT tools FROM benutzer WHERE name = '$cookie_benutzer2'" ) or die(mysqli_error($db));
$db_name_obj = $db_name->fetch_object();
?>

<div id="edit">
	
  <label for="edit_name" class="label">Benutzername:</label>
  <input type="text" id="edit_name" data-tools2="<?php echo $db_name_obj->tools; ?>" value="<?php echo "name" //$db_name_obj->name; ?>">
  
  <div class="check chat-check">
    <label for="chat_offnen" class="label">Chat automatisch öffnen?</label>
    <div class="check_bg chat-check">
    	<span class="red"><i class="sprite track_red"></i></span>
      <span class="green"><i class="sprite track_green"></i></span>
    	<input type="checkbox" id="chat_offnen" 
			<?php if($db_name_obj->tools == "chat") { ?>
      	checked="checked" 
      <?php } ?>
      autocomplete="off">
    </div>
  </div>
  
  <div class="check track-check">
    <label for="track_offnen" class="label">Tracking automatisch öffnen?</label>
    <div class="check_bg tracking-check">
    	<span class="red"><i class="sprite track_red"></i></span>
      <span class="green"><i class="sprite track_green"></i></span>
    	<input type="checkbox" id="track_offnen" 
      <?php if($db_name_obj->tools == "track") { ?>
      	checked="checked" 
      <?php } ?>
      autocomplete="off">
    </div>
  </div>
 
</div><!-- /edit-->