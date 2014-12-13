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
  }