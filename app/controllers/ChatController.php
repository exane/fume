<?php

  class ChatController extends vume\Controller {

    /**
     * Create a Database entry for chat message.
     */
    public function createDBEntry()
    {
      $chat = new Chat();
      
      return $chat->saveChatMessage();
    }
  }