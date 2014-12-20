<?php

  class Chat extends vume\Model {

    /**
     * Save a chat message.
     */
    public function saveChatMessage()
    {
      $sql = 'INSERT INTO ' . $this->table . ' (inhalt, zeit, benutzer, handy) VALUES (:inhalt, :zeit, :benutzer, :handy)';
      $query = $this->db->prepare($sql);

      $query->execute([':inhalt' => input('nachricht'), ':zeit' => time(), ':benutzer' => session('username')->get(), ':handy' => input('handy')]);
    }
  }