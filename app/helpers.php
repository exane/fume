<?php

  /**
   * Autolink chat messages.
   */
  function autolink($text)
  {
    return auto_link_text($text);
  }

  /**
   * Return the title of a youtube video.
   */
  function getYoutubeTitle($id)
  {
    $videoTitle = file_get_contents('http://gdata.youtube.com/feeds/api/videos/' . $id . '?v=2&fields=title');
    preg_match('/<title>(.+?)<\/title>/is', $videoTitle, $titleOfVideo);

    return $titleOfVideo[1];
  }