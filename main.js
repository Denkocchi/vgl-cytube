$('<link id="chanfavicon" href="https://implyingrigged.info/favicon.ico" type="image/x-icon" rel="shortcut icon" />')
	  .appendTo("head");
$('.navbar-brand').attr('href','https://implyingrigged.info/wiki/Main_Page');
$('.navbar-brand').text('Implying Rigged');	  
$('head').append('<script type="text/javascript" src="https://implyingrigged.info/cytube/NND.js">');
$('head').append('<script type="text/javascript" src="https://implyingrigged.info/cytube/4cc/teamcolor.js">');
//$('head').append('<script type="text/javascript" src="https://implyingrigged.info/cytube/anon.js">');
$('head').append('<script type="text/javascript" src="https://implyingrigged.info/cytube/emotememory.js">');
$( document ).ready(function() {
	/* Navbar */ { 
		//Options/Account
		$('.dropdown-toggle').each(function(){
			if ($(this).text() == 'Account'){
				var name = $('#welcome').text().replace('Welcome, ', '');
				$('#welcome').text('Welcome, ');
				$('#welcome').append('<a class="dropdown-toggle" href="#" data-toggle="dropdown">' + name + ' <b class="caret"></b></a>'); 
				$('#welcome').addClass('dropdown');
				$(this).parent().find('.dropdown-menu').detach().appendTo('#welcome');
				$(this).parent().remove();
			} else if ($(this).text() == 'Layout'){ 
				$(this).html($(this).html().replace('Layout','ï¸<b>âš™</b>'));
				$(this).parent().attr('ID','settingsMenu');
				$('li a').each(function(){
					if($(this).text() == 'Options'){
						$(this).text('User Settings').detach().appendTo('#settingsMenu .dropdown-menu').wrap('<li></li>');
					}
				});
				$('#showchansettings').detach().appendTo('#settingsMenu .dropdown-menu').wrap('<li></li>');
			}
		});
		
		//Team select style toggle
		var teamToggleButton = $('<button id="toggleTeamSelStyle" class="btn" data-toggle="button" aria-pressed="false">Team Selector: <span class="glyphicon glyphicon-list"></span><span class="glyphicon glyphicon-th"></span><span> List</span><span> Grid</span></button>')
			.appendTo('#settingsMenu .dropdown-menu')
			.wrap('<li></li>')
			.click(function(event){
				event.stopPropagation();
				$(this).button('toggle');
				var gridMode = $(this).hasClass('active');
				setOpt(CHANNEL.name + "_SELECTTEAM_GRID", gridMode);
				if(gridMode)
					$('#selectteam').addClass('grid');
				else
					$('#selectteam').removeClass('grid');
			});
		//Bigger Emotes
		$('<button id="btn_emoteSize" class="btn">Emote Size: <span>Small</span><span>Big</span></button>')
			.appendTo('#settingsMenu .dropdown-menu')
			.wrap('<li></li>')
			.click(function(event){
				event.stopPropagation();
				$(this).button('toggle');
				var bigEmotes = $(this).hasClass('active');
				setOpt(CHANNEL.name + "_BIG_EMOTES", bigEmotes);
				if(bigEmotes)
					$('#messagebuffer').addClass('bigEmotes');
				else
					$('#messagebuffer').removeClass('bigEmotes');
			});
		if(getOrDefault(CHANNEL.name + "_BIG_EMOTES", false))
			$('#btn_emoteSize').click();
	
		//Playlist
		$('body').append('<span id="pnl_options" style="position:absolute;display:none;left:0;top:30px;padding-top:10px;width:100%;background:rgba(0,0,0,0.5);z-index:2;"></span>');
		$('#rightcontrols').detach().appendTo('#pnl_options');
		$('#playlistrow').detach().appendTo('#pnl_options');
		$('#nav-collapsible ul:first-child').append('<li><a id="btn_playList" class="pointer">Playlist</a></li>');
		$('#btn_playList').click(function(){
			if ($('#pnl_options').css('display')=='none'){
				$('#pnl_options').slideDown();
			} else {
				$('#pnl_options').slideUp();
			}
		});
		//Match Schedule
		$('#nav-collapsible ul:first-child').append("<li class='dropdown'><a class='dropdown-toggle' href='#' data-toggle='dropdown' aria-expanded='false'>Match Schedule<b class='caret'></b></a><ul class='dropdown-menu' id='matchSchedule'><li>Times in UTC</li></ul></li>");
		for(var i = 1; i <= 24; i++){
			if (i == 1){
				$('#matchSchedule').append('<li id="day1"></li>');
			} else if (i == 9) {
				$('#matchSchedule').append('<li id="day2"></li>');
			} else if (i == 17){
				$('#matchSchedule').append('<li id="day3"></li>');
			}
			$('#matchSchedule').append('<li id="match' + i + '"></li>');
		}
		$('#matchSchedule').append("<li><a style='background:grey' href='https://implyingrigged.info/wiki/2019_4chan_Winter_Cup'>Cup Page</a></li>");
		//Other shit
		$('#nav-collapsible ul:first-child').append("<li class='dropdown'><a target='_blank' href='https://implyingrigged.info/gametips/'>Submit a Gametip</a></li>");
		$('#nav-collapsible ul:first-child').append('<li><a href="https://www.youtube.com/c/The4chanCup?sub_confirmation=1" target="_blank">Get notifications when LIV</a></li>');
		$('#nav-collapsible ul:first-child').append('<li><a href="https://www.youtube.com/c/The4chanCup" target="_blank"><img src="https://s.ytimg.com/yts/img/favicon-vfl8qSV2F.ico"/></a></li>');
		$('#nav-collapsible ul:first-child').append('<li><a href="https://boards.4channel.org/vg/catalog#s=4ccg" target="_blank"><img src="https://s.4cdn.org/image/favicon.ico"/></a></li>');
	}
	
	$('#userlisttoggle').click();
	//Moving controls around
	$('#videowrap').append("<span id='vidchatcontrols' style='float:right'>");
	$('#newpollbtn').detach().prependTo('#vidchatcontrols');
	$('#pollwrap').detach().appendTo('#videowrap');
	$('<div id="emotebtndiv"></div>');
	$('#emotelistbtn').detach().insertBefore('#chatline').wrap('<div id="emotebtndiv"></div>').text(':^)').attr('title', 'Emote List');
	$('#leftcontrols').remove();
		
	
	
	var previousMessage = "";
	
	//Overwriting the chat functions
	$('#chatline').off();
	$("#chatline").keydown(function(e) {
		if (13 != e.keyCode) {
			if (9 == e.keyCode) {
				try {
					chatTabComplete(e.target)
				} catch (e) {
					console.error(e)
				}
				return e.preventDefault(),
				!1
			}
			return 38 == e.keyCode ? (CHATHISTIDX == CHATHIST.length && CHATHIST.push($("#chatline").val()),
			0 < CHATHISTIDX && (CHATHISTIDX--,
			$("#chatline").val(CHATHIST[CHATHISTIDX])),
			e.preventDefault(),
			!1) : 40 == e.keyCode ? (CHATHISTIDX < CHATHIST.length - 1 && (CHATHISTIDX++,
			$("#chatline").val(CHATHIST[CHATHISTIDX])),
			e.preventDefault(),
			!1) : void 0
		}
		if (!CHATTHROTTLE) {
			var t = $("#chatline").val();
			if (t.trim() && $('#chatline').val().trim() != previousMessage) {
				var a = {};
				USEROPTS.adminhat && 255 <= CLIENT.rank ? t = "/a " + t : USEROPTS.modhat && CLIENT.rank >= Rank.Moderator && (a.modflair = CLIENT.rank),
				2 <= CLIENT.rank && 0 === t.indexOf("/m ") && (a.modflair = CLIENT.rank,
				t = t.substring(3));
				var o = t.replace(/\s/g, "");
				if (CLIENT.rank < 2){
					t = t.replace(':pic','');
				}
				if (/skettifactory/.test(o) && "skettifactory" !== CHANNEL.name.toLowerCase())
					return Callbacks.kick({
						reason: "spam detected (skettifactory)"
					}),
					void socket.disconnect();
				if (/synchtube\.ru/.test(o))
					return Callbacks.kick({
						reason: "spam detected (synchtube.ru)"
					}),
					void socket.disconnect();
				previousMessage = t.trim();
				if (TEAMCOLOR){
					t = t + ' -team' + TEAMCOLOR + '-';
					a.modflair = 'b';
				}
				var emotes = t.match(/(:[^:]+:)/g);
				//emoteMammory(emotes);
				socket.emit("chatMsg", {
					msg: t,
					meta: a
				}),
				CHATHIST.push($("#chatline").val()),
				CHATHISTIDX = CHATHIST.length,
				$("#chatline").val("")
			} else {
				$("#chatline").val("");
			}
		}
	});
	formatChatMessage = function(data, last) {
		//editing this to look like the original cytube again -t. scoops
		
		// Backwards compat    
		if (!data.meta || data.msgclass) {
			data.meta = {
				addClass: data.msgclass,
				addClassToNameAndTimestamp: data.msgclass
			};
		}
		// Determine whether to show the username or not
		var skip = data.username === last.name;
		if(data.meta.addClass === "server-whisper")
			skip = true;
		// Prevent impersonation by abuse of the bold filter
		if(data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/))
			skip = false;
		if (data.meta.forceShowName)
			skip = false;
		
		data.msg = stripImages(data.msg);
		data.msg = execEmotes(data.msg);
		
		
		
		last.name = data.username;
		
		//4CC Team Colors
		var teamClass = data.msg.match(/(-team.+-)/gi);
		if (teamClass){
			teamClass = teamClass[0].replace(new RegExp('-','g'),'');
		} else {
			teamClass = '';
		}
		if ($('#btn_anon').hasClass('label-success')){
			teamClass += ' anon';
		}
		
		var div = $("<div/>");
		/* drink is a special case because the entire container gets the class, not
		just the message */
		if (data.meta.addClass === "drink") {
			div.addClass("drink");
			data.meta.addClass = "";
		}
		
		// Add timestamps (unless disabled)
		if (USEROPTS.show_timestamps) {
			var time = $("<span/>").addClass("timestamp").appendTo(div);
			var timestamp = new Date(data.time).toTimeString().split(" ")[0];
			time.text("["+timestamp+"] ");
			if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
				time.addClass(data.meta.addClass);
			}
		}
		
		// Add username
		var name = $("<span/>");
		if (!skip) {
			name.appendTo(div);
		}
		$("<strong/>").addClass("username " + teamClass).text(data.username + ": ").appendTo(name);
		if (data.meta.modflair) {
			name.addClass(getNameColor(data.meta.modflair));
		}
		if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
			name.addClass(data.meta.addClass);
		}
		if (data.meta.superadminflair) {
			name.addClass("label")
				.addClass(data.meta.superadminflair.labelclass);
			$("<span/>").addClass(data.meta.superadminflair.icon)
				.addClass("glyphicon")
				.css("margin-right", "3px")
				.prependTo(name);
		}
		
		// Add the message itself
		var message = $("<span/>").appendTo(div);
		message[0].innerHTML = data.msg;

		// For /me the username is part of the message
		if (data.meta.action) {
			name.remove();
			message[0].innerHTML = data.username + " " + data.msg;
		}
		if (data.meta.addClass) {
			message.addClass(data.meta.addClass);
		}
		if (data.meta.shadow) {
			div.addClass("chat-shadow");
		}
		
		//convert image embeds that are actually videos to video embeds
		chatImageToVideo(div);
		
		return div;
	};
	
	//convert videos already in chat
	chatImageToVideo($("#messagebuffer"));
});

function chatImageToVideo(div){
	//convert image embeds that are actually videos to video embeds
	var videoFileTypes = [ ".webm", ".mp4" ];
	div.find("a>img")
		.each(function(index, img){ 
			if(videoFileTypes.some(function(ext){ return img.src.endsWith(ext);	})){
				var toReplace = $(img).parent("a[href='" + img.src + "']");
				if(toReplace.length == 0)
					toReplace = $(img);
				toReplace.replaceWith("<video autoplay loop muted src=\"" + img.src + "\">" + img.src + "</video>");
			}
		});
}
