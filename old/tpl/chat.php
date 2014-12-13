<div id="chat">

<div class="antiscroll-wrap" id="chat-wrap">
    	<div id="chat-inhalt" class="antiscroll-inner">

      <?php
			//$chat2 = $db->query( "SELECT * FROM chat" );
			$chat2 = $db->query( "SELECT id, cookie, inhalt, zeit, benutzer, handy FROM (
  SELECT * 
  FROM chat   
  ORDER BY id DESC
  LIMIT 50
) AS `table` ORDER by id ASC") or die(mysqli_error($db));
			$farbe2 = "exane";
			while( $chat_obj2 = $chat2->fetch_object() ) {
				if( $_SESSION["username"] ) {
					if($_SESSION["username"] === $chat_obj2->benutzer  ) {
						$farbe2 = "pyxl";
					} else {
						$farbe2 = "exane";
					}				
			  }
              
              $ersetzt = array("(str_plus)", "(str_and)");
              $durch = array("+", "&");
			
				 ?>
      	<div class="raum <?php echo $farbe2; ?>" data-id="<?php echo $chat_obj2->id; ?>">
					<div class="sprite pfeil"></div>
					<!--p><?php //echo nl2br(autolink(str_replace($ersetzt, $durch, $chat_obj2->inhalt))); ?></p-->




<?php

$str = str_replace($ersetzt, $durch, $chat_obj2->inhalt);

$link = '/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig';
$img = '/(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig';
//$yt = '/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g';
//$yt =  '#http://www\.youtube\.com/watch\?v=(\w+)[^\s]+#i';
$yt = '#(?:https?://)?(?:www\.)?(?:youtube\.com/(?:v/|watch\?v=)|youtu\.be/)([\w-]+)(?:\S+)?#';

?>

<?php 


$str = preg_replace_callback('#(?:https?://\S+)|(?:www.\S+)|(?:jpe?g|png|gif)#', function($arr){
    if(strpos($arr[0], 'http://') !== 0)
    {
        $arr[0] = 'http://' . $arr[0];
    }
    $url = parse_url($arr[0]);

    // images
    if(preg_match('#\.(png|jp?g|gif)$#', $url['path']))
    {
        return '<a href="' . $arr[0] . '" target="_blank"> <img src="'. $arr[0] . '" style="margin: 5px 0 0 0;" width="290px" height="auto"></a>';
    }
    // youtube
    if(
    	in_array($url['host'], array('www.youtube.com', 'youtube.com', 'youtu.be', 'www.youtu.be'))
      || $url['path'] == '/watch'
      && isset($url['query']))
    {
        parse_str($url['query'], $query);
        //return sprintf('<iframe style="position: relative; border: none; left: 0; top: 0" src="http://www.youtube.com/embed/%s" allowfullscreen width="290px" height="auto"></iframe>', $query['v']);
        return sprintf('<span data-link="%s" style="float: none;"><i class="yt-btn" style="background: url(http://80.240.132.120/fume/img/play_fume.png) no-repeat; cursor: pointer; width: 74px; margin: 10px 100px 10px 110px; height: 49px;"></i></span>', $query['v']);
    }
    





    	return sprintf('<a href="%1$s" target="_blank">%1$s</a>', $arr[0]);	
    	
 
    //links
    
}, $str);





?>




<p><?php echo nl2br($str); ?></p>



























					<span><?php echo date("H:i", $chat_obj2->zeit); ?></span>
                  <?php if( $chat_obj2->handy == true ) { ?>
                    <i></i>
                  <?php } ?>
				</div>
      <?php } ?>
         <!--<div class="raum  exane  am-schreiben">
    <div class="sprite pfeil"></div>
    <div id="am-schreiben"></div>	
  </div>-->
      </div>
      </div>
  	 <form method="post" id="chat-posten">
      	<textarea placeholder="Schreibe eine Nachricht ..." data-cookie="<?php echo $_COOKIE['username']; ?>"></textarea>
      </form>
      
  
</div><!--chat-->