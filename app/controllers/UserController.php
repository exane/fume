<?php

  class UserController extends vume\Controller {

    /**
     * Login.
     */
    public function login()
    {
      $user = new User();

      if($user->authCheck()) {
        setcookie("username", input('name'), time() + 9999999, '/', NULL, 0);
        setcookie("passwort", md5(input('password')), time() + 9999999, '/', NULL, 0);
        session('username')->set(input('name'));
      }

      return $this->redirect()->to(URL);
    }

    /**
     * Logout for user.
     */
    public function logout()
    {
      session()->destroy();
      setcookie('username', '', time() - 999999999999999999, '/', NULL, 0);
      setcookie('passwort', '', time() - 999999999999999999, '/', NULL, 0);

      return $this->redirect()->to(URL);
    }
  }