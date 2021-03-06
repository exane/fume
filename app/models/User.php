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
      $sql = 'select content, title from desktopApps where id = :id';
      $query = $this->db->prepare($sql);
      $query->execute([":id" => $contentID]);

      return $query->fetch();
    }

    public function loadDesktop() {
      $sql = 'select title, app id from desktop left join benutzer on user = benutzer.id left join desktopApps on app = desktopApps.id where name = :username';
      $query = $this->db->prepare($sql);
      $query->execute([":username" => $_COOKIE['username']]);

      return $query->fetchAll();
    }

    public function saveAppAs($title, $content) {
      $sql = 'insert into desktopApps(title, content)values(:title, :content)';
      $query = $this->db->prepare($sql);
      $query->execute([":title" => $title, ":content" => $content]);
      $lastID = $this->db->lastInsertId();
      $this->installApp($lastID);
      return ["id" => $lastID, "title" => $title];
    }

    public function editApp ($appid, $title, $content) {
      $content = html_entity_decode($content);
      $sql = 'update desktopApps set title = :title, content = :content where id = :appid';
      $query = $this->db->prepare($sql);
      $query->execute([":title" => $title, ":content" => $content, ":appid" => $appid]);
    }

    public function installApp($id) {
      if($this->hasApp($id)) return $this->getAppTitle($id);
      $sql = 'insert into desktop(user, app)values(:userid, :appid)';
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appid" => $id]);
      return $this->getAppTitle($id);
    }

    public function removeApp($id, $allUser) {
      $sql = 'delete from desktop where app = :appid and user = :userid';
      if($allUser == true) {
        $sql = 'delete from desktop where app = :appid';
      }
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appid" => $id]);
    }

    public function getAppTitle($id) {
      $sql = 'select title from desktopApps where id = :id';
      $query = $this->db->prepare($sql);
      $query->execute([":id" => $id]);
      return $query->fetch();
    }

    public function hasApp($appid) {
      $sql = "select count(app) apps from desktop where user = :userid and app = :appid";
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appid" => $appid]);
      $res = $query->fetch()->apps;
      if($res > 0) return true;
      return false;
    }

    public function getUserID() {
      $sql = "select id from benutzer where name = :name";
      $query = $this->db->prepare($sql);
      $query->execute([":name" => $_COOKIE["username"]]);
      return $query->fetch()->id;
    }

    public function getSavedTabs() {
      $sql = "select app from desktop where user = :userid and open = 1";
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID()]);
      return $query->fetchAll();
    }

    public function saveTab($appID) {
      $sql = "update desktop set open = 1 where app = :appID and user = :userid";
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appID" => $appID]);
    }

    public function removeTab($appID) {
      $sql = "update desktop set open = 0 where app = :appID and user = :userid";
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID(), ":appID" => $appID]);
    }

    public function loadAllApps() {
      $sql = "select * from desktopApps where private = 0 or private = :userid";
      $query = $this->db->prepare($sql);
      $query->execute([":userid" => $this->getUserID()]);

      return $query->fetchAll();
    }

    public function deleteApp($appID) {
      $sql = "delete from desktopApps where id = :appID";
      $query = $this->db->prepare($sql);
      $query->execute([":appID" => $appID]);
    }
  }