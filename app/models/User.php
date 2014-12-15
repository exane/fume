<?php

  class User extends vume\Model {

    protected $table = 'benutzer';

    /**
     * Check login credentials.
     */
    public function authCheck()
    {
      $sql = 'SELECT name, passwort FROM ' . $this->table . ' WHERE name = :name';
      $query = $this->db->prepare($sql);
      $query->execute([':name' => input('name')]);

      return $query->rowCount() && $query->fetch()->passwort === md5(input('password'));
    }

    /**
     * Check if user is logged in.
     * todo: hash
     */
    public function isLoggedIn()
    {
      if(isset($_COOKIE['username']) && isset($_COOKIE['passwort'])) {
        $sql = 'SELECT id FROM ' . $this->table . ' WHERE name = :name && passwort = :password';
        $query = $this->db->prepare($sql);
        $query->execute([':name' => $_COOKIE['username'], ':password' => $_COOKIE['passwort']]);

        return $query->rowCount();
      }

      return false;
    }
  }