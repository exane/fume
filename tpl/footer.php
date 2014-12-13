<script src="http://js.pusher.com/2.1/pusher.min.js"></script>
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<!--<script src="<?php /*echo $config['url']; */?>js/VerbalExpressions.js"></script>
<script src="<?php /*echo $config['url']; */?>js/main.js"></script>-->
<script src="<?php echo $config['url']; ?>js/build/build.js"></script>
<script>
    /*var pusher = new Pusher("<?php echo $config['pusher_key']; ?>"),
        nachrichtenChannel = pusher.subscribe("nachrichten"),
        schreibtgeradeChannel = pusher.subscribe("schreiben"),
        schreibtnichtChannel = pusher.subscribe("schreiben-keine"),
        $cookie2 = $("#chat-posten textarea").data("cookie");

    nachrichtenChannel.bind("nachrichten senden", function(data){
        var $data_id2 = $(".raum:last-child").data("id"),
            $data_id3 = $data_id2 + 1;

        var cont = $("#chat-inhalt"),
            $farbe = "exane";
        if($cookie2 == data.benutzer){
            $farbe = "pyxl";
        }
        else {
            $farbe = "exane";
        }


        function replaceURLWithHTMLLinks(text){

            var link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            var img = /(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig;
            var yt = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

            //return html.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');


            if(text.match(yt)){
                //return text.replace(yt, '<iframe style="position: relative; border: none; left: 0; top: 0" src="http://www.youtube.com/embed/$1" allowfullscreen width="290px" height="auto"></iframe>');

                return text.replace(yt, '<span data-link="$1" style="float: none;"><i class="yt-btn" style="background: url(' + url + 'img/play_fume.png) no-repeat; width: 74px; margin: 10px 100px 10px 110px; height: 49px; cursor: pointer;"></i></span>');
            }
            else if(text.match(img)){
                return text.replace(img, "<a href='$1' target='_blank'><img src='$1' width='290px' height='auto' style='margin: 5px 0 0 0;'></a>");
            }
            else {
                return text.replace(link, "<a target='_blank' href='$1'>$1</a>");
            }


            //var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            //return text.replace( exp,"<a target='_blank' href='$1'>$1</a>" );
        }

        function imageReplace(text){
            var expImage = /(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig;
            return text.replace(expImage, "<a href='$1' target='_blank'><img src='$1' width='290px' height='auto'></a>");
        }

        var nachricht2 = data.nachricht;

        /*//*//**//* nachricht2 = nachricht1.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a target='_blank' href='$1'>$1</a>").replace(/(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig, "<img src=\"$1\" width=\"250\" height= \"auto\">"), *//**//*

        nachricht2 = nachricht2.split('(str_plus)').join('+').split('(str_and)').join("&"),
            handy = "";
        if(data.handy == "true"){
            handy = "<i></i>";
        }


        var val2 = "<div class='raum " + $farbe + "' data-id='" + $data_id3 + "'><div class='sprite pfeil'></div><p>" + replaceURLWithHTMLLinks(nachricht2) + "</p><span>" + data.zeit + "</span>" + handy + "</div>";

        nachrichtenAnzahl++;
        if(binAfk == true && data.benutzer != $cookie2){
            document.title = nachrichtenAnzahl + " fume " + tippt;
        }
        else if(binAfk == false){
            nachrichtenAnzahl = "";
            document.title = nachrichtenAnzahl + " fume " + tippt;
        }
        $("#chat-inhalt").append(val2);
        $(".exane").css("margin", "0 0 10px 0");
        $(".pyxl").css("margin", "0 0 10px 0");
        $("#chat-inhalt").animate({ scrollTop: 9999999999999 }, 0);
    });

    var val3 = "<div class='raum  exane  am-schreiben'><div class='sprite  pfeil'></div><div id='am-schreiben'></div></div>";


    schreibtgeradeChannel.bind("schreibt", function(data){
        if(data.benutzer != $cookie2){
            tippt = "...";
            document.title = nachrichtenAnzahl + " fume " + tippt;
            $("#chat-inhalt").append(val3);
            $("#chat-inhalt").animate({ scrollTop: 9999999999999 }, 0);
        }
    });

    schreibtnichtChannel.bind("schreibt-nicht", function(data){
        if(data.benutzer != $cookie2){
            tippt = "";
            document.title = nachrichtenAnzahl + " fume " + tippt;
            $(".am-schreiben").remove();
        }
    });


    $(function(){
        $('.antiscroll-wrap').antiscroll();
    });*/
</script>
</body>
</html>