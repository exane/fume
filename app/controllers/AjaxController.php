<?php

    class AjaxController extends vume\Controller {

        public function getConfig() {
            $ini = parse_ini_file(config_path . 'config.ini');
            $res = [];

            foreach($ini as $key => $val) {
                if($key == "db_user" || $key == "db_pw" || $key == "db_host" || $key == "db_db") continue;
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

        /**
         * Get youtube title for chat message.
         */
        public function getYoutubeTitle($id, $index) {
            $res = ["title" => getYoutubeTitle($id), "index" => $index];
            echo json_encode($res);
        }
    }