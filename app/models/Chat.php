<?php

  class Chat extends vume\Model {

    /**
     * Save a chat message.
     */
    public function saveChatMessage()
    {
      $sql = 'INSERT INTO ' . $this->table . ' (inhalt, zeit, benutzer, handy) VALUES (:inhalt, :zeit, :benutzer, :handy)';
      $query = $this->db->prepare($sql);

      $query->execute([':inhalt' => input('nachricht'), ':zeit' => time(), ':benutzer' => session('username')->get(), ':handy' => (boolean) input('handy')]);
    }

    /**
     * Get chat messages.
     */
    public function getMessages()
    {
      $sql = 'SELECT inhalt, benutzer, zeit, handy
              FROM (
                SELECT *
                FROM ' . $this->table . '
                ORDER BY id DESC
                LIMIT 100
              ) AS `table` ORDER BY id ASC';

      $query = $this->db->prepare($sql);
      $query->execute();

      return $query->fetchAll();
    }
  }