<?php

  class HomeController extends vume\Controller {

    /**
     * Show home or login.
     */
    public function index()
    {
      $user = new User();

      if($user->isLoggedIn()) {
        $this->setUserSession();

        $rndGreetings = ['Howdy', 'Hey', 'Was geht,', 'Yolo'];

        return $this->view('home')
          ->with('greeting', $rndGreetings[array_rand($rndGreetings)]);
      }

      return $this->view('login');
    }

    /**
     * Set user session to work with them.
     */
    private function setUserSession()
    {
      session('username')->set($_COOKIE['username']);
    }
  }
