<style>
.wrap {
	margin: 0 auto;
	max-width: 1020px;
}
</style>
<header id="header">
    <div id="user-logout">
    	<i class="sprite" id="logout"></i>
      <span class="trenner"></span>
      <p>Howdy <?php echo $_COOKIE['username']; ?></p>
    </div>
</header>

	<section id="logo">
		<a href="http://pyxl.crater.uberspace.de/fume/"><img src="http://pyxl.crater.uberspace.de/fume/img/logo.png" width="91" height="57"></a>    
  </section>
  
  <section id="content">
		 <div class="wrap">
      
      <div id="home">
      
      <?php
			$get_titel = $_GET['post'];
			$topics_db = $db->query( "SELECT * FROM topics WHERE titel = '$get_titel'" );
			$topics_obj = $topics_db->fetch_object();
			
			?>     
            
      	<article>
        
        <div class="antworten-icon">
        	<a href="#antworten" class="sprite reply"></a>
          <i class="sprite edit-topic"></i>
        </div>
        
        	<header>
          	<h2 data-id="<?php echo $topics_obj->id; ?>"><?php echo $topics_obj->titel; ?></h2>
            <p><?php echo date("d.m.Y", $topics_obj->zeit); ?>, von <?php echo $topics_obj->benutzer; ?></p>
          </header>
        
        	<p class="content"><?php echo nl2br($topics_obj->inhalt); ?></p>
          
          <div class="topic-antworten">
          
          <?php 
					
						$topic_antworten_db = $db->query( "SELECT * FROM ( SELECT * FROM antworten WHERE topic_id = '$topics_obj->id' ORDER BY zeit DESC LIMIT 4) AS `table` ORDER by id ASC" );
						
						while($topic_antworten_obj = $topic_antworten_db->fetch_object()) {
					
					?>
          
          	<div class="antwort-raum-wrap">
              <div class="antwort-raum">
                <p class="antwort-datum"><?php echo date("d.m.y, H:i", $topic_antworten_obj->zeit); ?> Uhr</p>
                <p><?php echo $topic_antworten_obj->inhalt; ?></p>
              </div>
              <span><?php echo $topic_antworten_obj->benutzer; ?></span>
            </div>

					<?php 
						}
					?>

						<a id="antworten"></a>
						<form method="post" id="topic_antworten">
            	<textarea placeholder="Antworten ..."></textarea>
              <input type="submit" value="Abschicken">
            </form>
          
          </div><!-- /topic-antworten-->
        
        </article>        
      </div><!--home-->
      
			</div><!--wrap-->
    </section>   
  
  <section id="tools">
  	<ul>
    	<li class="sprite" id="chat-icon"><span class="new_messages"></span><i class="ii"></i></li>
      <li class="sprite" id="tracking-icon"><i class="ii"></i></li>
      <li class="sprite" id="edit-icon"><i class="ii"></i></li>
    </ul>
    
    <span class="sprite" id="close"></span>
    
    <div id="tools-wrap">
    <?php 
		include( 'chat.php' );
		include( 'edit.php' );
		include( 'tracking.php' );	
		?>
  	</div>
  </section>