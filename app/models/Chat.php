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

            try {
              $query->execute([':inhalt' => input('message'), ':zeit' => time(), ':benutzer' => input('user'), ':handy' => $handy]);
            } catch(PDOException $e) {
              header($_SERVER['SERVER_PROTOCOL'] . ' 500 ' . $e->getMessage(), true, 500);
              echo $e->getMessage();
            }
        }

        public function displayMeme($text) {
            if(!$this->memeData) {
                $this->memeData = parse_ini_file(memes_url . "memes.ini");
            }

            foreach($text as $message) {
                foreach($this->memeData as $memekey => $memeval) {
                    $message->inhalt = str_replace($memeval, "<img title='$memeval' class='chat-img meme' src='" . memes_url ."$memekey'>", $message->inhalt);
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