<?php

  class Chat extends vume\Model {

    /**
     * Save a chat message.
     */
    public function saveChatMessage()
    {
      $handy = input('handy') == 'true' ? true : false;

      $sql = 'INSERT INTO ' . $this->table . ' (inhalt, zeit, benutzer, handy) VALUES (:inhalt, :zeit, :benutzer, :handy)';
      $query = $this->db->prepare($sql);

      $query->execute([':inhalt' => input('message'), ':zeit' => time(), ':benutzer' => session('username')->get(), ':handy' => $handy]);
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
                ORDER BY ' . $this->primaryKey . ' DESC
                LIMIT 100
              ) AS `table` ORDER BY ' . $this->primaryKey . ' ASC';

      $query = $this->db->prepare($sql);
      $query->execute();

      return $query->fetchAll();
    }
  }