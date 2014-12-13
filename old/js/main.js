var url = 'http://localhost:8888/fume/old/';

$(".exane").css("margin", "0 0 10px 0");
$(".pyxl").css("margin", "0 0 10px 0");
/**
CHAT POSTEN 
**/
$("#chat-posten").keypress(function(e) {
	
	if( e.which == 13 && !e.shiftKey ) {
            
    function replaceURLWithHTMLLinks( text ) {

			var link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			var img = /(\b(https?|ftp|file):\/\/([ \S]+\.(jpg|png|gif)))/ig;

			if(text.match(img)) {
				return text.replace(img, "<a href='$1' target='_blank'><img src='$1' width='290px' height='auto' style='margin: 5px 0 0 0;'></a>");
			} else {
				return text.replace( link,"<a target='_blank' href='$1'>$1</a>" ); 
			}

		}
		
			var $text_inhalt = $("#chat-posten textarea").val(),
                $ersetzt = [/\+/g, /\&/g],
                $von = ["(str_plus)", "(str_and)"];
					$text_inhalt2 = $text_inhalt.replace(/\+/g, "(str_plus)").replace(/\&/g, "(str_and)"),
					$text_inhalt = $text_inhalt.replace(/\r?\n/g, '<br />'),
					
					$cookie = $("#chat-posten textarea").data("cookie"),
					$data_id = $(".raum:last-child").data("id"),
					$data_id_1 = $data_id + 1,
 				
                       $(".exane").css("margin", "0 0 10px 0");
    $(".pyxl").css("margin", "0 0 10px 0");
                      
                date = new Date();
    			myDate = date.getHours()+':'+date.getMinutes();
					
			if( $text_inhalt != "" ) {
					$("#chat-posten textarea").val('');				
		
		$("#chat-inhalt").animate({ scrollTop: 9999999999999 }, 0);

				$.ajax({
					
					type: "POST",
					data: "text_inhalt=" + $text_inhalt2 + "&cookie=" + $cookie + "&id=" + $data_id,
					url: url + "settings/chat-eintrag-db.php",
					success: function(val) {
						//$("#chat-posten textarea").val("");
						//$("#chat-posten textarea").focus();
						$("#chat-inhalt").animate({ scrollTop: 9999999999999 }, 0);
					}
					
				});
			} 		
		else {
			return false;
		}
    schreiben_false(); // lässt das schreibt gerade verschwinden
	return false;
	} 
	

})

/**
CHECKBOXEN
**/
$("#chat_offnen").click(function() {
	
	if($(this).prop('checked')) {
		
		$.ajax({
			type: "POST",
			data: "tools_check=chat",
			url: url + "settings/checked.php",
		});
		
		$(".chat-check .red").animate({
			margin: "0 0 0 -44px"
		}, 300);
		$(".chat-check .green").animate({
			margin: "0 0 0 44px"
		}, 300);
		check_check("track");
	} else {
		
		$.ajax({
			type: "POST",
			data: "tools_check=none",
			url: url + "settings/checked.php",
		});
		
		$(".chat-check .red").animate({
			margin: 0
		}, 300);
		$(".chat-check .green").animate({
			margin: "0 0 0 88px"
		}, 300);
	}
	
});

		if($("#chat_offnen").prop('checked')) {
			$(".chat-check .red").animate({
					margin: "0 0 0 -44px"
				}, 300);
				$(".chat-check .green").animate({
					margin: "0 0 0 44px"
				}, 300);
		}

$("#track_offnen").click(function() {
	if($(this).prop('checked')) {
		
		$.ajax({
			type: "POST",
			data: "tools_check=track",
			url: url + "settings/checked.php",
		});
		
		$(".track-check .red").animate({
			margin: "0 0 0 -44px"
		}, 300);
		$(".track-check .green").animate({
			margin: "0 0 0 44px"
		}, 300);
		check_check("chat");
	} else {
		
		$.ajax({
			type: "POST",
			data: "tools_check=none",
			url: url + "settings/checked.php",
		});
		
		$(".track-check .red").animate({
			margin: 0
		}, 300);
		$(".track-check .green").animate({
			margin: "0 0 0 88px"
		}, 300);
	}
	
});

		if($("#track_offnen").prop('checked')) {
			$(".track-check .red").animate({
					margin: "0 0 0 -44px"
				}, 300);
				$(".track-check .green").animate({
					margin: "0 0 0 44px"
				}, 300);
		}

function check_check(val) {
	
	$("#" + val + "_offnen").attr('checked', false);
	
	$("." + val + "-check .red").animate({
			margin: 0
		}, 300);
		$("." + val + "-check .green").animate({
			margin: "0 0 0 88px"
		}, 300);
	
};

/**
OPEN YT LINK IN CHAT
todo: fix
**/
$(document).on("click", ".yt-btn", function() {
	var $dataLink = $(this).parent().data("link");
	
	var $parent = $(this).parent();
	//$(this).remove().parent().append('<iframe style="position: relative; border: none; left: 0; top: 0" src="http://www.youtube.com/embed/"' + $dataLink + '" allowfullscreen width="290px" height="auto"></iframe>');
	$(this).remove();
	$($parent).html('<iframe style="position: relative; border: none; left: 0; top: 0; margin: 5px 0 0 0;" src="http://www.youtube.com/embed/' + $dataLink + '" allowfullscreen width="290px" height="auto"></iframe>');
	
});

/**
TOOLS ÖFFNEN
**/
var tools_offen = false;
var chats2;

if($("#edit_name").data("tools2") == "chat") {
	
	$("#content").css("margin", "0 500px 0 280px");
	$("#tools").css("margin", 0);
		
	$("#chat").show();
	$("#tracking").hide();
	$("#chat-icon").addClass("chat-icon-active i");
					
	var scroll_runter = $('#chat-inhalt')[0].scrollHeight;
	$("#chat-inhalt").animate({ scrollTop: scroll_runter }, 0);	
					
	$("#chat-posten textarea").focus();
  
    $(".exane").css("margin", "0 0 10px 0");
    $(".pyxl").css("margin", "0 0 10px 0");
	
	chats2 = true;
	tools_offen = true;
}	else if($("#edit_name").data("tools2") == "track") {
	$("#content").css("margin", "0 500px 0 280px");
	$("#tools").css("margin", 0);
		
	$("#tracking").show();
	$("#chat").hide();
	$("#tracking-icon").addClass("tracking-icon-active i");
	
	chats2 = false;
	tools_offen = true;
}

$("#close").click(function() {
	chats2 = false;
	if(tools_offen == true) {
		// content fade out
		$("#chat").fadeOut("fast");
		$("#edit").fadeOut("fast");
		$("#tracking").fadeOut("fast");
		
		// remove icons active
		$("#chat-icon").removeClass("chat-icon-active i");
		$("#edit-icon").removeClass("edit-icon-active i");
		$("#tracking-icon").removeClass("tracking-icon-active i");
		
		// wegsliden
		$("#content").animate({margin: "0 150px 0 280px"}, 500);
		$("#tools").animate({margin:"0 -330px 0 0"}, 500);
		return tools_offen = false;
	}
	
});

function tools_bar(typ, zwei, drei) {
	
	if(tools_offen == false) {
		
		$("#" + typ + "-icon").addClass(typ + "-icon-active i");
		
		$("#content").animate({margin: "0 500px 0 280px"}, 500);
			$("#tools").animate({margin:"0"}, 500, 
				function() {
					$("#" + typ).fadeIn("slow");
					
					var scroll_runter = $('#chat-inhalt')[0].scrollHeight;
					$("#chat-inhalt").animate({ scrollTop: scroll_runter }, 0);	
					
					$("#chat-posten textarea").focus();
				});
        return tools_offen = true;
    } else if (tools_offen == true) {
				$("#" + typ).fadeIn("slow");
				$("#" + zwei).fadeOut("fast");
				$("#" + drei).fadeOut("slow");
				$("#" + zwei + "-icon").removeClass(zwei + "-icon-active i");
				$("#" + typ + "-icon").addClass(typ + "-icon-active i");
				$("#" + drei + "-icon").removeClass(drei + "-icon-active i");
					
				var scroll_runter = $('#chat-inhalt')[0].scrollHeight;
				$("#chat-inhalt").animate({ scrollTop: scroll_runter }, 0);	
					
				$("#chat-posten textarea").focus();
		}
	
}

$("#chat-icon").click(function() { // CHAT
	tools_bar("chat", "tracking", "edit");
	chats2 = true;
});

		$("chat-icon").click(function() { // CHAT
			$("#chat").show();
			$("#edit").hide();
			$("#chat").animate({
					margin: 0
			});
		});

$("#edit-icon").click(function() { // CHAT
	tools_bar("edit", "tracking", "chat");
	chats2 = false;
});

$("#tracking-icon").click(function() { // CHAT
	tools_bar("tracking", "edit", "chat");
	chats2 = false;
});


// Benutzername ändern
$("#edit_name").blur(function() {
	
	var $benutzer_name = $(this).val();
	
	$.ajax({
		
		type: "POST",
		data: "name=" + $benutzer_name,
		url: url + "settings/name-aendern.php",
		success: function(val) {
			$("#edit-icon").hide().fadeIn("slow");
		}
		
	});
	
});

// Benutzer AFK

	var zeit = 0,
			antworten = 0;
			offline = false,
			online = true,
			$document = $(document);
	
	

$(window).on('beforeunload', function() { // sobald der browser/tab geschlossen wird
   schreiben_false();
});

	function check_zeit() {
		zeit++;
		if(zeit > 20) {
			offline = true;
			online = false;			
		} else {
			offline = false;
			online = true;
			checker2();
		}
		setTimeout("check_zeit()", 1000);
	}
	check_zeit();
	
	function checker() {
		antworten++;
		if(online == true) {
			//document.title = "fume";
			$(".new_messages").hide();
		} else if (offline == true) {
				//document.title = "(" + antworten + ") fume";
				if(chats2 != true) {
					$(".new_messages").text(antworten).show();
				}
				
		}
	}
	
	function checker2() {
		antworten = 0;
		//document.title = "fume";
		$(".new_messages").hide();
	}
	
/**
AM SCHREIBEN
**/

var press = false,
    timeout,
    $user_name2 = $("#chat-posten textarea").data("cookie");

function schreiben_false() {
  //if( press == true ) {
    $.ajax({
      type: "POST",
      data: "user=" + $user_name2,
      url: url + "settings/schreibt_austrag_pusher.php",
      success: function( val ) {
        press = false;
      } // success
    }); // $.ajax
 // }
}

$("#chat-posten textarea").keypress(function() {
  
  if ( press == false ) {
    press = true;
    $.ajax({
      type: "POST",
      data: "user=" + $user_name2,
      url: url + "settings/schreibt_eintrag_pusher.php",
      success: function( val ) {
      } // success
    }); // $.ajax
  } // if
  
  if( press == true ) {
    clearTimeout( timeout ); 
  }
  
  timeout = setTimeout( "schreiben_false()", 5000 );
  
});



/**
Nachrichten Tab
**/
var nachrichtenAnzahl = "";
  function nachrichtenTabs() {
    if( nachrichtenAnzahl > 0 && binAfk == true ) {
      nachrichtenAnzahl = nachrichtenAnzahl + " | "; 
    } else if ( nachrichtenAnzahl > 0 && binAfk == false ) {
      nachrichtenAnzahl = ""; 
    }
  }

var binAfk = false,
    timeAfk = setTimeout( "istAfk()", 200000 );

var tippt = "";
function istAfk() {
  binAfk = true;
}
function warAfk() {
  binAfk = false;
  nachrichtenAnzahl = "";
  document.title = nachrichtenAnzahl + " fume " + tippt;
  setTimeout( "istAfk()", 20000 );
}

$document.mousemove(function() {
  if(chats2 == true) {
    clearTimeout( timeAfk );
    warAfk();
  }
})
$document.keypress(function() {
  if(chats2 == true) {
    clearTimeout( timeAfk );
    warAfk();
  }
});
$document.click(function() {
  if(chats2 == true) {
    clearTimeout( timeAfk );
    warAfk();
  }
});
$(window).blur(function(){
  istAfk();
});


/**
ANMELDEN
**/
$("#anmelden_form").submit(function() {
	
	var $benutzer = $("#benutzer").val(),
			$pw = $("#pw").val();
			
	$.ajax({
		
		type: "POST",
		data: "benutzer=" + $benutzer + "&pw=" + $pw,
		url: url + "settings/anmeldung.php",
		success: function(val) {
			location.reload();
		}
	});
	
	return false;
});

/**
LOGOUT
**/
$("#logout").click(function() {
	
	$.ajax({
		type: "POST",
		url: url + "settings/logout.php",
		success: function(val) {
			location.reload();
		}	
	});
	
});


(function ($) {

/**
ANTWORT SCHREIBEN TOPIC
**/
$("#topic_antworten").submit(function() {
	
	var $topic_antworten_inhalt = $("#topic_antworten textarea").val(),
			$user_name = $("#chat-posten textarea").data("cookie"),
			$topic_id = $("article header h2").data("id");
			
	$.ajax({
		
		type: "POST",
		data: "inhalt=" + $topic_antworten_inhalt + "&user=" + $user_name + "&topic_id=" + $topic_id,
		url: url + "settings/topic_antworten.php",
		success: function(val) {
			location.reload();
		}
	});
	
	return false;
});

/**
NEUER TOPIC SCHREIBEN ÖFFNEN
**/
$("#add").click(function() {
	$("#overlay").fadeIn("slow");
	$("#neuer-topic").fadeIn("slow");
	$(".neuer_topic").focus();
});

$("#overlay").click(function() {
	$(this).fadeOut("fast");
	$("#neuer-topic").fadeOut("fast");
});

$("#close_topic").click(function() {
	$("#overlay").fadeOut("fast");
	$("#neuer-topic").fadeOut("fast");
});

/**
NEUER TOPIC SCHREIBEN
**/
$("#neuer_topic").submit(function() {
	
	var $topic_schreiben_inh = $("#neuer_topic textarea").val(),
			$topic_schreiben_titel = $(".neuer_topic").val(),
			$user_name2 = $("#chat-posten textarea").data("cookie");
	
	$.ajax({
		type: "POST",
		data: "inhalt=" + $topic_schreiben_inh + "&titel=" + $topic_schreiben_titel + "&name=" + $user_name2,
		url: url + "settings/topic_schreiben.php",
		success: function(val) {
			window.location.replace(url + "post/" + $topic_schreiben_titel);
		}
	});
	
	return false;
});

  
/**
SLIDE CHATS IN
**/


/**
SMOTH SCROLL
**/
$(function(){
$('a[href*=#]').click(function() {
  if (location.pathname.replace(/^\//,") == this.pathname.replace(/^\//,")
    && location.hostname == this.hostname) {
  var target = $(this.hash);
  target = target.length && target || $("[name=' + this.hash.slice(1) +']");
  if (target.length) {
    var targetOffset = target.offset().top;
    $('html,body').animate({scrollTop: targetOffset}, 400);
    return false;
  }
  }
});
});

/**
SCROLLBAR
**/


  /**
* Augment jQuery prototype.
*/

  $.fn.antiscroll = function (options) {
    return this.each(function () {
      if ($(this).data('antiscroll')) {
        $(this).data('antiscroll').destroy();
      }

      $(this).data('antiscroll', new $.Antiscroll(this, options));
    });
  };

  /**
* Expose constructor.
*/

  $.Antiscroll = Antiscroll;

  /**
* Antiscroll pane constructor.
*
* @param {Element|jQuery} main pane
* @parma {Object} options
* @api public
*/

  function Antiscroll (el, opts) {
    this.el = $(el);
    this.options = opts || {};

    this.x = (false !== this.options.x) || this.options.forceHorizontal;
    this.y = (false !== this.options.y) || this.options.forceVertical;
    this.autoHide = false !== this.options.autoHide;
    this.padding = undefined == this.options.padding ? 2 : this.options.padding;

    this.inner = this.el.find('.antiscroll-inner');
    this.inner.css({
        'width': '+=' + (this.y ? scrollbarSize() : 0)
      , 'height': '+=' + (this.x ? scrollbarSize() : 0)
    });

    this.refresh();
  };

  /**
* refresh scrollbars
*
* @api public
*/

  Antiscroll.prototype.refresh = function() {
    var needHScroll = this.inner.get(0).scrollWidth > this.el.width() + (this.y ? scrollbarSize() : 0),
needVScroll = this.inner.get(0).scrollHeight > this.el.height() + (this.x ? scrollbarSize() : 0);

    if (this.x) {
      if (!this.horizontal && needHScroll) {
        this.horizontal = new Scrollbar.Horizontal(this);
      } else if (this.horizontal && !needHScroll) {
        this.horizontal.destroy();
        this.horizontal = null;
      } else if (this.horizontal) {
        this.horizontal.update();
      }
    }

    if (this.y) {
      if (!this.vertical && needVScroll) {
        this.vertical = new Scrollbar.Vertical(this);
      } else if (this.vertical && !needVScroll) {
        this.vertical.destroy();
        this.vertical = null;
      } else if (this.vertical) {
        this.vertical.update();
      }
    }
  };

  /**
* Cleans up.
*
* @return {Antiscroll} for chaining
* @api public
*/

  Antiscroll.prototype.destroy = function () {
    if (this.horizontal) {
      this.horizontal.destroy();
      this.horizontal = null
    }
    if (this.vertical) {
      this.vertical.destroy();
      this.vertical = null
    }
    return this;
  };

  /**
* Rebuild Antiscroll.
*
* @return {Antiscroll} for chaining
* @api public
*/

  Antiscroll.prototype.rebuild = function () {
    this.destroy();
    this.inner.attr('style', '');
    Antiscroll.call(this, this.el, this.options);
    return this;
  };

  /**
* Scrollbar constructor.
*
* @param {Element|jQuery} element
* @api public
*/

  function Scrollbar (pane) {
    this.pane = pane;
    this.pane.el.append(this.el);
    this.innerEl = this.pane.inner.get(0);

    this.dragging = false;
    this.enter = false;
    this.shown = false;

    // hovering
    this.pane.el.mouseenter($.proxy(this, 'mouseenter'));
    this.pane.el.mouseleave($.proxy(this, 'mouseleave'));

    // dragging
    this.el.mousedown($.proxy(this, 'mousedown'));

    // scrolling
    this.innerPaneScrollListener = $.proxy(this, 'scroll');
    this.pane.inner.scroll(this.innerPaneScrollListener);

    // wheel -optional-
    this.innerPaneMouseWheelListener = $.proxy(this, 'mousewheel');
    this.pane.inner.bind('mousewheel', this.innerPaneMouseWheelListener);

    // show
    var initialDisplay = this.pane.options.initialDisplay;

    if (initialDisplay !== false) {
      this.show();
      if (this.pane.autoHide) {
          this.hiding = setTimeout($.proxy(this, 'hide'), parseInt(initialDisplay, 10) || 3000);
      }
    }
  };

  /**
* Cleans up.
*
* @return {Scrollbar} for chaining
* @api public
*/

  Scrollbar.prototype.destroy = function () {
    this.el.remove();
    this.pane.inner.unbind('scroll', this.innerPaneScrollListener);
    this.pane.inner.unbind('mousewheel', this.innerPaneMouseWheelListener);
    return this;
  };

  /**
* Called upon mouseenter.
*
* @api private
*/

  Scrollbar.prototype.mouseenter = function () {
    this.enter = true;
    this.show();
  };

  /**
* Called upon mouseleave.
*
* @api private
*/

  Scrollbar.prototype.mouseleave = function () {
    this.enter = false;

    if (!this.dragging) {
        if (this.pane.autoHide) {
            this.hide();
        }
    }
  };

  /**
* Called upon wrap scroll.
*
* @api private
*/

  Scrollbar.prototype.scroll = function () {
    if (!this.shown) {
      this.show();
      if (!this.enter && !this.dragging) {
        if (this.pane.autoHide) {
            this.hiding = setTimeout($.proxy(this, 'hide'), 1500);
        }
      }
    }

    this.update();
  };

  /**
* Called upon scrollbar mousedown.
*
* @api private
*/

  Scrollbar.prototype.mousedown = function (ev) {
    ev.preventDefault();

    this.dragging = true;

    this.startPageY = ev.pageY - parseInt(this.el.css('top'), 10);
    this.startPageX = ev.pageX - parseInt(this.el.css('left'), 10);

    // prevent crazy selections on IE
    this.el[0].ownerDocument.onselectstart = function () { return false; };

    var pane = this.pane,
move = $.proxy(this, 'mousemove'),
self = this

    $(this.el[0].ownerDocument)
      .mousemove(move)
      .mouseup(function () {
        self.dragging = false;
        this.onselectstart = null;

        $(this).unbind('mousemove', move);

        if (!self.enter) {
          self.hide();
        }
      });
  };

  /**
* Show scrollbar.
*
* @api private
*/

  Scrollbar.prototype.show = function (duration) {
    if (!this.shown && this.update()) {
      this.el.addClass('antiscroll-scrollbar-shown');
      if (this.hiding) {
        clearTimeout(this.hiding);
        this.hiding = null;
      }
      this.shown = true;
    }
  };

  /**
* Hide scrollbar.
*
* @api private
*/

  Scrollbar.prototype.hide = function () {
    if (this.pane.autoHide !== false && this.shown) {
      // check for dragging
      this.el.removeClass('antiscroll-scrollbar-shown');
      this.shown = false;
    }
  };

  /**
* Horizontal scrollbar constructor
*
* @api private
*/

  Scrollbar.Horizontal = function (pane) {
    this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-horizontal">', pane.el);
    Scrollbar.call(this, pane);
  };

  /**
* Inherits from Scrollbar.
*/

  inherits(Scrollbar.Horizontal, Scrollbar);

  /**
* Updates size/position of scrollbar.
*
* @api private
*/

  Scrollbar.Horizontal.prototype.update = function () {
    var paneWidth = this.pane.el.width(),
trackWidth = paneWidth - this.pane.padding * 2,
innerEl = this.pane.inner.get(0)

    this.el
      .css('width', trackWidth * paneWidth / innerEl.scrollWidth)
      .css('left', trackWidth * innerEl.scrollLeft / innerEl.scrollWidth);

    return paneWidth < innerEl.scrollWidth;
  };

  /**
* Called upon drag.
*
* @api private
*/

  Scrollbar.Horizontal.prototype.mousemove = function (ev) {
    var trackWidth = this.pane.el.width() - this.pane.padding * 2,
pos = ev.pageX - this.startPageX,
barWidth = this.el.width(),
innerEl = this.pane.inner.get(0)

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackWidth - barWidth);

    innerEl.scrollLeft = (innerEl.scrollWidth - this.pane.el.width())
      * y / (trackWidth - barWidth);
  };

  /**
* Called upon container mousewheel.
*
* @api private
*/

  Scrollbar.Horizontal.prototype.mousewheel = function (ev, delta, x, y) {
    if ((x < 0 && 0 == this.pane.inner.get(0).scrollLeft) ||
        (x > 0 && (this.innerEl.scrollLeft + Math.ceil(this.pane.el.width())
          == this.innerEl.scrollWidth))) {
      ev.preventDefault();
      return false;
    }
  };

  /**
* Vertical scrollbar constructor
*
* @api private
*/

  Scrollbar.Vertical = function (pane) {
    this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-vertical">', pane.el);
    Scrollbar.call(this, pane);
  };

  /**
* Inherits from Scrollbar.
*/

  inherits(Scrollbar.Vertical, Scrollbar);

  /**
* Updates size/position of scrollbar.
*
* @api private
*/

  Scrollbar.Vertical.prototype.update = function () {
    var paneHeight = this.pane.el.height(),
trackHeight = paneHeight - this.pane.padding * 2,
innerEl = this.innerEl;
      
    var scrollbarHeight = trackHeight * paneHeight / innerEl.scrollHeight;
    scrollbarHeight = scrollbarHeight < 20 ? 20 : scrollbarHeight;
    
    var topPos = trackHeight * innerEl.scrollTop / innerEl.scrollHeight;
    
    if((topPos + scrollbarHeight) > trackHeight) {
        var diff = (topPos + scrollbarHeight) - trackHeight;
        topPos = topPos - diff - 3;
    }

    this.el
      .css('height', scrollbarHeight)
      .css('top', topPos);

return paneHeight < innerEl.scrollHeight;
  };

  /**
* Called upon drag.
*
* @api private
*/

  Scrollbar.Vertical.prototype.mousemove = function (ev) {
    var paneHeight = this.pane.el.height(),
trackHeight = paneHeight - this.pane.padding * 2,
pos = ev.pageY - this.startPageY,
barHeight = this.el.height(),
innerEl = this.innerEl

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackHeight - barHeight);

    innerEl.scrollTop = (innerEl.scrollHeight - paneHeight)
      * y / (trackHeight - barHeight);
  };

  /**
* Called upon container mousewheel.
*
* @api private
*/

  Scrollbar.Vertical.prototype.mousewheel = function (ev, delta, x, y) {
    if ((y > 0 && 0 == this.innerEl.scrollTop) ||
        (y < 0 && (this.innerEl.scrollTop + Math.ceil(this.pane.el.height())
          == this.innerEl.scrollHeight))) {
      ev.preventDefault();
      return false;
    }
  };

  /**
* Cross-browser inheritance.
*
* @param {Function} constructor
* @param {Function} constructor we inherit from
* @api private
*/

  function inherits (ctorA, ctorB) {
    function f() {};
    f.prototype = ctorB.prototype;
    ctorA.prototype = new f;
  };

  /**
* Scrollbar size detection.
*/

  var size;

  function scrollbarSize () {
    if (size === undefined) {
      var div = $(
          '<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:scroll;'
        + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%">'
        + '</div>'
      );

      $('body').append(div);
      var w1 = $(div).innerWidth();
      var w2 = $('div', div).innerWidth();
      $(div).remove();

      size = w1 - w2;
    }

    return size;
  };

})(jQuery);


