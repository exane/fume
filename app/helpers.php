<?php
  use Madcoda\Youtube;

  /**
   * Return the title of a youtube video.
   */
  function getYoutubeTitle($id)
  {
    $youtube = new Youtube(array('key' => YT_API));
    $video = $youtube->getVideoInfo($id);

    return $video->snippet->title;
  }