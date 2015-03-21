<header class="site-header">
  <a href="<?php echo URL; ?>logout" class="logout"><i class="sprite-logout"></i></a>
  <span class="username"><?php echo $greeting . ' ' . session('username')->get(); ?></span>

  <div class="search">
    <i class="sprite-search"></i>
    <input type="text" placeholder="Suche">
  </div>
</header>
<!--<aside class="site-logo">
  <a href="<?php /*echo URL; */?>">
    <img src="<?php /*echo IMG_URL; */?>logo.png" width="91" height="57" alt="fume" class="logo">
  </a>
</aside>-->
<section class="site-content">
  <!--  <div class="youtube-wrap"></div>-->
  <!--<div class="fume-tab">
      tab1
  </div>
  <div class="fume-tab">
      tab2
  </div>-->
  <div class="fume-tabs">

  </div>
  <div class="fume-tab-content">
  </div>
</section>
<aside class="site-tools">
  <div class="splashscreen">
    <img id="splashscreenloader" src="<?php echo img_url ?>splashscreenloader.gif">
    <span>Lade Chat</span>
  </div>
  <div class="chat-wrap">
    <div class="chats">
      <?php foreach($messages as $message): ?>
        <div data-id="<?php echo $message->id; ?>"
             class="box <?php echo $message->benutzer == $username ? 'box-me' : 'box-partner'; ?>">
          <p><?php echo $message->inhalt; ?></p>
          <span>
            <?php
              echo date('H:i', $message->zeit);
              echo $message->handy ? '<i></i>' : '';
            ?>
          </span>

          <div class='chat-state-icon'></div>
        </div>
      <?php endforeach; ?>
      <div class="box box-partner typing"><img></div>
    </div>
    <textarea class="chatbox" placeholder="Schreib eine Nachricht..."
              data-cookie="<?php echo $username; ?>" autofocus></textarea>
  </div>
</aside>