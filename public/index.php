<?php

  /**
   * VUME
   *
   * PHP MVC Framework & Project Boilerplate.
   *
   * @author Viktor Geringer <devfakeplus@googlemail.com>
   * @version 0.3.8
   * @license The MIT License (MIT)
   */

  // Load composer autoloader.
  if(file_exists('../vendor/autoload.php')) require '../vendor/autoload.php';

  // Start the core.
  require '../lib/Core.php';
  $core = new vume\Core();
