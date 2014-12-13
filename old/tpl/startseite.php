  <header id="header">
    <div id="user-logout">
    	<i class="sprite" id="logout"></i>
      <span class="trenner"></span>
      <p>Howdy <?php echo $_COOKIE['username']; ?></p>
    </div>
    
    <!--<div id="user-online">
    	<i class="sprite online-icon"></i>
      <!--<span><?php //echo $online_user->num_rows; ?></span>-->
    <!--</div>
    <div id="user-online-ansicht">-->
    
    <?php 		
		/*while( $online_user_obj = $online_user->fetch_object() ) { ?>
			<div class="user-anzeige">
				<h4><?php echo $online_user_obj->name; ?></h4>
				<p>zuletzt aktiv:
        <?php
					$dif = $time - $online_user_obj->aktiv;
					if($dif < 30) {
						echo "jetzt";
						$online_offline = "online";
					} else if($dif > 30 && $dif < 60) {
						echo "vor kurzem";
						$online_offline = "afk";
					} else {
						echo "vor " . round($dif/60) . " minuten";
						$online_offline = "offline";
					}
				*/ ?> 
        <!--</p>
        <i class="sprite <?php //echo $online_offline; ?>"></i>
        <div class="trenner2"></div>
      </div>
    */  -->
     
    <?php //} ?>
     
    <!--</div>!-- /user-online-anzeige-->
  </header>

	<section id="logo">
		<a href="<?php echo $config['url']; ?>"><img src="<?php echo $config['url']; ?>img/logo.png" width="91" height="57"></a>
  </section>
  
  <section id="content">
  
		 <div class="wrap">
      
      <div id="neuer-topic-wrap">
        <div id="neuer-topic">
        
          <form method="post" id="neuer_topic">
            <input type="text" class="neuer_topic" placeholder="Titel eingeben ...">
            <textarea placeholder="Inhalt eingeben ..."></textarea>
            <input type="submit" value="Abschicken">
          </form>
          <div class="sprite" id="close_topic"></div>
        
      	</div>  
      </div><!-- /neuer-topic-wrap-->
      
      
      <div id="home">
           
      	<!--div id="add"><i class="sprite add-icon"></i></div-->

        
        <?php
          //$topics_db = $db->query( "SELECT * FROM topics ORDER BY aktuell DESC" );
          //while($topics_obj = $topics_db->fetch_object()) { 
        ?>
         
          <!--div class="post">
            <a href="http://pyxl.crater.uberspace.de/fume/post/<?php //echo $topics_obj->titel; ?>">
						<?php 
						//if(strlen($topics_obj->titel) >= 7) { ?>
							<h2 class="small"><?php //echo $topics_obj->titel; ?></h2>	
						<?php //} else { ?>
							<h2><?php //echo $topics_obj->titel; ?></h2>
            <?php // } ?>
						</a>
            <footer class="post-stuff">
              <a href="#" class="sprite post-antworten"></a>
              <span>23</span>
            </footer>
          </div-->
          
        <?php 
					//}
				?>

<style>
      
      .iframe {
        width:522px;
        height:497px;
        overflow:hidden;
        position:relative;
        border: 15px solid #F3F3F3
        }

      iframe {
        left: -200px;
        position: absolute;
        top: -806px;
      }
      
    </style>

    <!--div class="iframe">
      <iframe src="https://app.cloudforge.com/projects/180977" width="1000px" height="1322px"></iframe>
    </div-->
			<div>
				<h3>Workout routine:</h3>
				<p>Warm Up: <a href="http://i.imgur.com/5554VwH.png" target="_blank">Link</a></p>
				<p>Workout: <a href="http://i.imgur.com/oCoUiUB.png" target="_blank">Link</a></p>
				<p><a href="http://imgur.com/a/il9mS" target="_blank">Album</a></p>
				
				<h1>FUME THE GAME&trade;</h1>
				<a target="_blank" href="http://80.240.132.120/bluePython/">LINK yo</a>
				<h1>Fume Damage Spreadsheet</h1>
				<a target="_blank" href="http://goo.gl/THzoXV">link</a>
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
		include( 'tpl/chat.php' );
		include( 'tpl/edit.php' );
		include( 'tpl/tracking.php' );	
		?>
  	</div>
  </section>