<?php

  class ChatController extends vume\Controller {

    /**
     * Create a Database entry for chat message.
     */
    public function createDBEntry()
    {

      $chat = new Chat();
      if( ! $chat->saveChatMessage()) {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
      }
    }
  }