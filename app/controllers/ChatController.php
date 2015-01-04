<?php

  class ChatController extends vume\Controller {

    /**
     * Create a Database entry for chat message.
     */
    public function createDBEntry()
    {
      if( ! $chat = new Chat()) {
        return header($_SERVER['SERVER_PROTOCOL'] . ' 501 Can not create chat object', true, 501);
      }

      return $chat->saveChatMessage();
    }
  }