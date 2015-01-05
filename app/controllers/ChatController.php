<?php

  class ChatController extends vume\Controller {

    /**
     * Create a Database entry for chat message.
     */
    public function createDBEntry()
    {
      $chat = new Chat();

      try {
        $chat->saveChatMessage();
      } catch(Exception $e) {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Can not execute query', true, 500);
        return $e->getMessage();
      }
    }
  }