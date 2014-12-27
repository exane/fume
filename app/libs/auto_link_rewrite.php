<?php

  function auto_link_text($text) {
    //$pattern  = '#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#';
    $pattern  = "~(?i)\b((?:https?:(?:/{1,3}|[a-z0-9%])|[a-z0-9.\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)/)(?:[^\s()<>{}\[\]]+|\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\))+(?:\([^\s()]*?\([^\s()]+\)[^\s()]*?\)|\([^\s]+?\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’])|(?:(?<!@)[a-z0-9]+(?:[.\-][a-z0-9]+)*[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\b/?(?!@)))~";
    return preg_replace_callback($pattern, 'auto_link_text_callback', $text);
  }

  function auto_link_text_callback($matches) {
    $max_url_length = 40;
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

    $url_short = preg_replace('#^http://#', '', $url_full);
    $url_short = preg_replace('/^www\./', '', $url_short);
    if(strlen($url_full) > $max_url_length) {
      $url_short = substr($url_short, 0, $max_url_length) . '..';
    }

    //return "hey";

    // Image.
    if( ! isMobile() && preg_match('/\.(jpeg|jpg|gif|png)$/', $url_full)) {
      return "<a href=$url_full target='_blank'><img class='chat-img' src=$url_full></a>";
    }

    // Youtube.
    if( ! isMobile() && preg_match('/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/', $url_full, $matches)) {
      $id = $matches[1];
      $title = getYoutubeTitle($id);
      return "<a class='youtube-link' href=$id><small></small><em>$title</em></a>";
    }

    return "<a href='" . $url_full . "' target='_blank'>" . $url_short . "</a>";
  }

  /**
   * Detect if user is on mobile.
   */
  function isMobile()
  {
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
  }
