<?php

  $route->get('/', 'HomeController@index');

  $route->post('/login', 'UserController@login');
  $route->get('/logout', 'UserController@logout');

  $route->get('/loadConfig', 'AjaxController@getConfig');

  $route->post('/createDBEntry', 'ChatController@createDBEntry');
