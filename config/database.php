<?php

  return [

    'development' => [

      'driver' => 'mysql',
      'host' => $configIni['db_host'],
      'db' => $configIni['db_db'],
      'user' => $configIni['db_user'],
      'pw' => $configIni['db_pw']

    ],

    'production' => [

      'driver' => '',
      'host' => '',
      'db' => '',
      'user' => '',
      'pw' => ''

    ],

    'testing' => [

      'driver' => '',
      'host' => '',
      'db' => '',
      'user' => '',
      'pw' => ''

    ]

  ];
