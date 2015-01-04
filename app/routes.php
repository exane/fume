<?php

  $route->get('/', 'HomeController@index');

  $route->post('/login', 'UserController@login');
  $route->get('/logout', 'UserController@logout');

  $route->get('/loadConfig', 'AjaxController@getConfig');
  $route->get('/loadMeme', 'AjaxController@getMeme');
  $route->get('/loadMissedMessages/{time}/{username}', 'AjaxController@loadMissedMessages');
  $route->get('/getYoutubeTitle/{id}/{index}', 'AjaxController@getYoutubeTitle');

  $route->post('/createDBEntry', 'ChatController@createDBEntry');
