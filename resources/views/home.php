<header class="site-header">
  <a href="<?php echo URL; ?>logout" class="logout"><i class="sprite-logout"></i></a>
  <span class="username"><?php echo $greeting . ' ' . session('username')->get(); ?></span>
</header>

<aside class="site-logo">
  <a href="<?php echo URL; ?>">
    <img src="<?php echo IMG_URL; ?>logo.png" width="91" height="57" alt="fume" class="logo">
  </a>
</aside>

<section class="site-content">
  bla
</section>

<aside class="site-tools">
  <div class="chat-wrap">
    <div class="chats">
      <?php foreach($messages as $message): ?>
        <div class="box <?php print $message->benutzer == $username ? 'box-me' : 'box-partner'; ?>">
          <p><?php echo $message->inhalt; ?></p>
          <span>
            <?php
              echo date('H:i', $message->zeit);
              echo $message->handy ? '<i></i>' : '';
            ?>
          </span>
        </div>
      <?php endforeach; ?>
    </div>
    <textarea class="chatbox" placeholder="Schreib eine Nachricht..."
              data-cookie="<?php echo session('username')->get(); ?>" autofocus></textarea>
  </div>
</aside>