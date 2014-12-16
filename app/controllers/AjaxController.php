<?php


    class AjaxController extends vume\Controller {

        public function getConfig() {
            $res = ["pusher_key" => pusher_key, "pusher_id" => pusher_id, "pusher_secret" => pusher_secret, "url" => url, "img_url" => img_url, "username" => session("username")->get()];

            echo json_encode($res);
        }



    }