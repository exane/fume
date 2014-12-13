<?php


    if(isset($_GET["loadConfig"])) {
        $parsedIni = parse_ini_file(__DIR__ . "/../config.ini");
        $res       = [
            "pusher_key" => $parsedIni["pusher_key"],
            "pusher_id" => $parsedIni["pusher_id"],
            "pusher_secret" => $parsedIni["pusher_secret"]];
        echo json_encode($res);
    }