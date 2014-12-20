<?php

    class AjaxController extends vume\Controller {

        public function getConfig() {

            $ini    = parse_ini_file('../config/config.ini');
            $res = [];
            foreach($ini as $key => $val){
                if($key == "db_user" || $key == "db_pw" || $key == "db_host" || $key == "db_db") continue;
                $res[$key] = $val;
            }

            $res["username"] = session("username")->get();
            echo json_encode($res);
        }
    }