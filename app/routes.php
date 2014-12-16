<?php

    $route->get('/', 'HomeController@index');

    $route->post('/login', 'UserController@login');
    $route->get('/logout', 'UserController@logout');

    $route->get('/loadConfig', 'AjaxController@getConfig');

    // test for pusher
    $route->get('/pusher', 'UserController@pusher');