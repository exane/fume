<?php

  class AjaxController extends vume\Controller {

    public function getConfig()
    {
      $ini = parse_ini_file(config_path . 'config.ini');
      $res = [];

      foreach($ini as $key => $val) {
        if($key == "db_user" || $key == "db_pw" || $key == "db_host" || $key == "db_db") continue;
        $res[$key] = $val;
      }

      $res["username"] = session("username")->get();
      echo json_encode($res);
    }

    /**
     * Get youtube title for chat message.
     */
    public function getYoutubeTitle($id)
    {
      $videoTitle = file_get_contents('http://gdata.youtube.com/feeds/api/videos/' . $id . '?v=2&fields=title');
      preg_match('/<title>(.+?)<\/title>/is', $videoTitle, $titleOfVideo);

      echo $titleOfVideo[1];
    }
  }