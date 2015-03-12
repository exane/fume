<?php

  class User extends vume\Model {

    protected $table = 'benutzer';

    /**
     * Check login credentials.
     */
    public function authCheck() {
      $sql = 'SELECT name, passwort FROM ' . $this->table . ' WHERE name = :name';
      $query = $this->db->prepare($sql);
      $query->execute([':name' => input('name')]);

      return $query->rowCount() && $query->fetch()->passwort === md5(input('password'));
    }

    /**
     * Check if user is logged in.
     * todo: hash
     */
    public function isLoggedIn() {
      if(isset($_COOKIE['username']) && isset($_COOKIE['passwort'])) {
        $sql = 'SELECT id FROM ' . $this->table . ' WHERE name = :name && passwort = :password';
        $query = $this->db->prepare($sql);
        $query->execute([':name' => $_COOKIE['username'], ':password' => $_COOKIE['passwort']]);

        return $query->rowCount();
      }

      return false;
    }

    public function loadDesktopApp($contentID) {
      $sql = 'select content from desktopapps where id = :id';
      $query = $this->db->prepare($sql);
      $query->execute([":id" => $contentID]);

      return $query->fetch();
    }

    public function loadDesktop() {
      $sql = 'select title, app id from desktop left join benutzer on user = benutzer.id left join desktopapps on app = desktopapps.id where name = :username';
      $query = $this->db->prepare($sql);
      $query->execute([":username" => $_COOKIE['username']]);

      return $query->fetchAll();
    }

    public function saveAppAs($title, $code) {
      $sql = 'insert into desktopapps(title, content)values(:title, :content)';
      $query = $this->db->prepare($sql);
      $query->execute([":title" => $title, ":content" => $code]);
      $lastID = $this->db->lastInsertId();
      $this->installApp($lastID);
      return ["id" => $lastID, "title" => $title];
    }

    public function installApp($id) {
      $sql = 'insert into desktop(user, app)values(:userid, :appid)';
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appid" => $id]);
      return $this->getAppTitle($id);
    }

    public function removeApp($id) {
      $sql = 'delete from desktop where app = :appid and user = :userid';
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appid" => $id]);
    }

    public function getAppTitle($id) {
      $sql = 'select title from desktopApps where id = :id';
      $query = $this->db->prepare($sql);
      $query->execute([":id" => $id]);
      return $query->fetch();
    }

    public function getUserID() {
      $sql = "select id from benutzer where name = :name";
      $query = $this->db->prepare($sql);
      $query->execute([":name" => $_COOKIE["username"]]);
      return $query->fetch()->id;
    }
  }