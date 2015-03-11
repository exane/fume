<!doctype html>
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>fume</title>

  <link href="<?php echo autoCache('assets/css/core.css'); ?>" rel="stylesheet">
  <link href="<?php echo autoCache('assets/css/vex.css'); ?>" rel="stylesheet">
  <link href="<?php echo autoCache('assets/css/vex-theme-flat-attack.css'); ?>" rel="stylesheet">
  <link href="<?php echo autoCache('favicon.ico'); ?>" rel="icon" type="image/x-icon">

</head>
<body>

    <?php
      require session('vume_view')->get();
    ?>

    <script src="<?php echo URL; ?>assets/js/build/build.js"></script>
</body>
</html>