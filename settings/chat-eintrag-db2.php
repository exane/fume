<?php
function autolink($str, $attributes=array()) {
  $attrs = '';
  foreach ($attributes as $attribute => $value) {
    $attrs .= " {$attribute}=\"{$value}\"";
  }
$str = ' ' . $str;
$str = preg_replace(
  '`([^"=\'>])(((http|https|ftp)://|www.)[^\s<]+[^\s<\.)])`i',
  '$1<a target="_blank" href="$2"'.$attrs.'>$2</a>',
  $str
);
$str = substr($str, 1);
$str = preg_replace('`href=\"www`','href="http://www',$str);
return $str;
}
$time2 = time();

$text_inhalt = htmlentities($_POST['text_inhalt'], ENT_COMPAT, 'UTF-8');
$data_id = $_POST['id'];
?>

<div class="raum gruen" data-id="<?php echo $data_id + 1; ?>">
					<div class="sprite pfeil"></div>
					<p><?php echo nl2br(autolink(str_replace("(str_plus)", "+", $text_inhalt))); ?></p>
					<span><?php echo date("H:i", $time2); ?></span>
</div>