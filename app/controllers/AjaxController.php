<?php

  class AjaxController extends vume\Controller {

    public function getConfig() {
      $ini = parse_ini_file(config_path . 'config.ini');
      $res = [];

      foreach($ini as $key => $val) {
        if($key == "db_user" || $key == "db_pw" || $key == "db_host" || $key == "db_db")
          continue;
        $res[$key] = $val;
      }

      $res["username"] = session("username")->get();
      echo json_encode($res);
    }

    public function getMeme() {
      $ini = parse_ini_file(memes_path . 'memes.ini');
      $res = [];

      foreach($ini as $key => $val) {
        $res[$key] = $val;
      }

      echo json_encode($res);
    }

    public function loadMissedMessages($time, $username) {
      $chat = new Chat();

      echo json_encode($chat->getMessagesSince($time, $username));
    }

    /**
     * Get youtube title for chat message.
     */
    public function getYoutubeTitle($id, $index) {
      $res = ["title" => getYoutubeTitle($id), "index" => $index];
      echo json_encode($res);
    }

    public function loadDesktopApp($contentID) {
      $user = new User();
      echo json_encode($user->loadDesktopApp($contentID));
    }

    public function loadDesktop() {
      $user = new User();
      echo json_encode($user->loadDesktop());
    }

    public function installApp($id) {
      $user = new User();
      echo json_encode($user->installApp($id));
    }

    public function removeApp($id) {
      $user = new User();
      $user->removeApp($id);
    }

    public function editApp() {
      $user = new User();
      $user->editApp(input("appid"), input("title"), input("content"));
    }

    public function saveAppAs() {
      $title = input("title", false);
      $content = input("content", false);
      $user = new User();
      $result = $user->saveAppAs($title, $content);
      echo json_encode($result);
    }

    public function getSavedTabs() {
      $user = new User();
      echo json_encode($user->getSavedTabs());
    }

    public function saveTab() {
      $user = new User();
      $user->saveTab(input("appID"));
    }
    public function removeTab() {
      $user = new User();
      $user->removeTab(input("appID"));
    }
  }