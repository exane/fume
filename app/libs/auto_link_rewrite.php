<?php

  function auto_link_text($text) {
    $pattern  = '#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#';
    return preg_replace_callback($pattern, 'auto_link_text_callback', $text);
  }

  function auto_link_text_callback($matches) {
    $max_url_length = 50;
    $max_depth_if_over_length = 2;
    $ellipsis = '&hellip;';

    $url_full = $matches[0];
    $url_short = '';

    if (strlen($url_full) > $max_url_length) {
      $parts = parse_url($url_full);
      $url_short = $parts['scheme'] . '://' . preg_replace('/^www\./', '', $parts['host']) . '/';

      $path_components = explode('/', trim($parts['path'], '/'));
      foreach ($path_components as $dir) {
        $url_string_components[] = $dir . '/';
      }

      if (!empty($parts['query'])) {
        $url_string_components[] = '?' . $parts['query'];
      }

      if (!empty($parts['fragment'])) {
        $url_string_components[] = '#' . $parts['fragment'];
      }

      for ($k = 0; $k < count($url_string_components); $k++) {
        $curr_component = $url_string_components[$k];
        if ($k >= $max_depth_if_over_length || strlen($url_short) + strlen($curr_component) > $max_url_length) {
          if ($k == 0 && strlen($url_short) < $max_url_length) {
            // Always show a portion of first directory
            $url_short .= substr($curr_component, 0, $max_url_length - strlen($url_short));
          }
          $url_short .= $ellipsis;
          break;
        }
        $url_short .= $curr_component;
      }

    } else {
      $url_short = $url_full;
    }

    // Image.
    if(preg_match('/\.(jpeg|jpg|gif|png)$/', $url_full)) {
      return "<a href=$url_full target='_blank'><img class='chat-img' src=$url_full></a>";
    }

    // Youtube.
    if(preg_match('/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/', $url_full, $matches)) {
      $id = $matches[1];
      $title = getYoutubeTitle($id);
      return "<a class='youtube-link' href=$id><small></small><em>$title</em></a>";
    }

    return "<a href='" . $url_full . "' target='_blank'>" . $url_full . "</a>";
  }