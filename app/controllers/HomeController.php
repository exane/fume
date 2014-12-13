<?php

  class HomeController extends vume\Controller {

    /**
     * Show home or login.
     */
    public function index()
    {
      if(session('username')->exists()) {
        $rndGreetings = ['Howdy', 'Hey', 'Was geht,', 'Yolo'];

        return $this->view('home')
          ->with('greeting', $rndGreetings[array_rand($rndGreetings)]);
      }

      return $this->view('login');
    }
  }
