<?php

  $route->get('/', 'HomeController@index');

  $route->post('/login', 'UserController@login');
  $route->get('/logout', 'UserController@logout');

  // test for pusher
  $route->get('/pusher', 'UserController@pusher');