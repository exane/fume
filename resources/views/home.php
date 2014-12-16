<header class="site-header">
    <a href="<?php echo URL; ?>logout" class="logout">X</a>
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
            <?php for($i = 0; $i < 15; $i++) { ?>
                <div class="box  box-me"><p>bla unser chat</p><span>12:24</span></div>
                <div class="box  box-partner"><p>und weiter gehts</p><span>12:26</span></div>
            <?php } ?>
            <!--<div class="box box-partner">
                <img src="<?php /*echo img_url; */?>gif.gif">
            </div>-->
        </div>
        <textarea class="chatbox" placeholder="Schreib eine Nachricht..."
                  data-cookie="<?php echo session('username')->get(); ?>" autofocus></textarea>
    </div>
</aside>