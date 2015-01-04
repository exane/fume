<?php

    class Chat extends vume\Model {

        private $memeData = 0;

        /**
         * Save a chat message.
         */
        public function saveChatMessage() {
            $handy = input('handy') == 'true' ? true : false;

            $sql   = 'INSERT INTO ' . $this->table . ' (inhalt, zeit, benutzer, handy) VALUES (:inhalt, :zeit, :benutzer, :handy)';
            $query = $this->db->prepare($sql);

            if( ! $query->execute([':inhalt' => input('message'), ':zeit' => time(), ':benutzer' => session('username')->get(), ':handy' => $handy])) {
              header($_SERVER['SERVER_PROTOCOL'] . ' 500 Can not execute query', true, 500);
              return $this->db->errorInfo();
            }
        }

        public function displayMeme($text) {
            if(!$this->memeData) {
                $this->memeData = parse_ini_file(memes_path . "memes.ini");
            }

            foreach($text as $message) {
                foreach($this->memeData as $memekey => $memeval) {
                    $message->inhalt = str_replace($memeval, "<strong class='meme meme-$memekey'></strong>", $message->inhalt);
                }
            }

            return $text;
        }

        /**
         * Get chat messages.
         */
        public function getMessages() {
            $sql = 'SELECT id, inhalt, benutzer, zeit, handy
              FROM (
                SELECT *
                FROM ' . $this->table . '
                ORDER BY ' . $this->primaryKey . ' DESC
                LIMIT 50
              ) AS `table` ORDER BY ' . $this->primaryKey . ' ASC';

            $query = $this->db->prepare($sql);
            $query->execute();

            return $query->fetchAll();
        }

        public function getMessagesSince($time, $username){
            $sql = "
            select count(id) ids
            from chat
            where zeit > $time and benutzer != '$username'";

            $query = $this->db->prepare($sql);
            $query->execute();
            return $query->fetchAll();
        }
    }