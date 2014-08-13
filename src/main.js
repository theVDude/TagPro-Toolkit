window.addEventListener('DOMContentLoaded', function(e) {

  function injectScript(path) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.src = chrome.extension.getURL(path);
    script.onload = removeScript;
    (document.head||document.documentElement).appendChild(script);
  }

  function removeScript() {
	this.parentNode.removeChild(this);
  }
  
  function createtag(){
	var thebutton = document.getElementById("create-tag");
	edittag();
	thebutton.remove();
  }
  
  function edittagdata(){
	  var entry = document.getElementById("tag-input-div");
	  var proname = document.getElementsByTagName('h3')[0].innerHTML.split('<div>')[0];
	  var tagbox=document.getElementById("new-tag").value;
	  var colorbox=document.getElementById('select-input');
	  var newcolorval=colorbox[colorbox.selectedIndex].value;
	chrome.runtime.sendMessage({
    	from:    'prefs',
    	subject: 'edittag',
		username: proname,
		newtag: tagbox,
		newcolor: newcolorval
				});  
		entry.remove();
		var oldtag = document.getElementById("user-tag");
		if (oldtag!=null){
		oldtag.remove();}
		setTimeout(updateprotags,500);
  }
  
  function edittag(){
	  var oldc = document.getElementById('tag-input-div');
	if(oldc!=null){oldc.remove();}
	  var proname = document.getElementsByTagName('h3')[0].innerHTML.split('<div>')[0];
	var tagdiv = document.createElement("div");
	tagdiv.id="tag-input-div"
	var currenttag = document.getElementsByTagName('h3')[0];
	var tagbox = document.createElement("input");
	tagbox.id="new-tag";
	var colorbox = document.createElement("select");
	colorbox.id="select-input";
	var whiteinput = document.createElement("option");
	whiteinput.value="#FFFFFF";
	whiteinput.textContent="White";
	whiteinput.style.backgroundColor="#FFFFFF";
	var redinput = document.createElement("option");
	redinput.value="#FF0000";
	redinput.textContent="Red";
	redinput.style.backgroundColor="#FF0000";
	var yellowinput = document.createElement("option");
	yellowinput.value="#FFFC19";
	yellowinput.textContent="Yellow";
	yellowinput.style.backgroundColor="#FFFC19";
	colorbox.appendChild(whiteinput);
	colorbox.appendChild(redinput);
	colorbox.appendChild(yellowinput);
	chrome.runtime.sendMessage({subject:"get_tags"},
    function(response) {
		if(response[proname]){
			tagbox.value=response[proname].tag;
			for ( var i = 0; i < colorbox.options.length; i++ ) {
        if ( colorbox.options[i].value == response[proname].color ) {
            colorbox.options[i].selected = true;
            return;
        }
    }
		}
		});
	tagbox.value="";
	var tagboxsubmit = document.createElement("button");
	tagboxsubmit.id="submit-new-tag";
	tagboxsubmit.innerHTML="Submit";
	tagdiv.appendChild(tagbox);
	tagdiv.appendChild(colorbox);
	tagdiv.appendChild(tagboxsubmit);
	currenttag.appendChild(tagdiv);
	tagboxsubmit.onclick=edittagdata;
  }
  
  function updateprotags(){
	   var proname = document.getElementsByTagName('h3')[0].innerHTML.split('<div>')[0];
	chrome.runtime.sendMessage({subject:"get_tags"},
    function(response) {
		if(response[proname]){
		var usertag = document.createElement('div');
		usertag.id="user-tag";
		usertag.style.fontSize="35%";
		usertag.style.color=response[proname].color;
		usertag.innerHTML=response[proname].tag+' ['+response[proname].plus.with+'/'+response[proname].plus.against+']';
		document.getElementsByTagName('h3')[0].appendChild(usertag);
		usertag.onclick = edittag;
		}else{var tagboxsubmit = document.createElement("button");
	tagboxsubmit.id="create-tag";
	tagboxsubmit.innerHTML="Create Tag";
	document.getElementsByTagName('h3')[0].appendChild(tagboxsubmit);
	tagboxsubmit.onclick = createtag;
	}
		});
  }
  
  function refreshtags(){
	  var datadump = document.getElementById('usertags-log').textContent;
	  if(document.getElementById('userscore-log')!=null){
	  var userscoredump = document.getElementById('userscore-log').textContent;}else{
		  chrome.runtime.sendMessage({subject:"get_high"},
    function(response) {
		var userscoredump = response;
		});
		  }
		  if(document.getElementById('serverscore-log')!=null){
	  var serverdump = document.getElementById('serverscore-log').textContent;}else{
		  chrome.runtime.sendMessage({subject:"get_server_stats"},
    function(response) {
		var serverdump = response;
		});}
  chrome.runtime.sendMessage({
    	from:    'prefs',
    	subject: 'updatetags',
		utags: datadump,
		serverscores: serverdump,
		uscore: userscoredump
				});		
}  

	//pull settings
	chrome.runtime.sendMessage({subject:'profile_id'}, function(response){
		var settingstag = document.createElement('script');
		settingstag.setAttribute("type", "application/javascript");
		settingstag.textContent="var toolkit ="+JSON.stringify(response);
		document.head.appendChild(settingstag);
		document.head.removeChild(settingstag);
if(document.URL.indexOf("/boards") >= 0){
	  if(response.leaderboards.plusminus==true){
		  injectScript('js/boards.js');
		  };
    }if(document.URL.indexOf(":8") >= 0){
		
		//document.getElementById('tiles').src='leaving this for next version';
		
				  chrome.runtime.sendMessage({subject:"get_tags"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var usertags ="+JSON.stringify(response)+';var scorecashe={"red":0,"blue":0}';
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		injectScript('js/user-tags.js');
		});
		window.addEventListener('beforeunload', function (e) {
refreshtags();
return;
	});
		var spin = document.createElement('img');
		spin.src=chrome.extension.getURL("img/spin_outline.png");
		spin.id="spin-image";
		document.head.appendChild(spin);
		injectScript('js/draw-tags.js');


		chrome.runtime.sendMessage({subject:"get_high"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var highscores ="+JSON.stringify(response);
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		});
		
		chrome.runtime.sendMessage({subject:"get_server_stats"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var serverstats ="+JSON.stringify(response);
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		});
  }
  if(document.URL.indexOf("/profile") >= 0){
	  if(document.getElementById('showSettings')!==null){
  chrome.runtime.sendMessage({subject:"get_high"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var highscores ="+JSON.stringify(response);
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		});
  }
	  chrome.runtime.sendMessage({subject:"get_tags"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var usertags="+JSON.stringify(response);
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		});
		updateprotags();
		
	  if(response.profile.flairwins==true){
		  injectScript('js/profile.js');
		  };
		if(response.profile.stats==true){
		  injectScript('js/profile-stats.js');
		  injectScript('js/profile-tags.js');
		};
		
		chrome.runtime.sendMessage({subject:"get_server_stats"},
    function(response) {
		var usertag = document.createElement('script');
		usertag.setAttribute("type", "application/javascript");
		usertag.textContent="var serverstats ="+JSON.stringify(response)+';';
		document.head.appendChild(usertag);
		document.head.removeChild(usertag);
		});
  /*chrome.extension.sendRequest({greeting:"get_scripts"},
    function(response) {
		for(x in response){
			if(response[x].profile==true){
			eval(response[x].script);}
		}
	})*/
  
  }
	});
  
  function submitnewscript(){
	openoptions();
  }
  
  //Not used yet.
  function appendscript(){
	var old = document.getElementById("main-settings");
	if(old!=null){old.remove();}
	var newcontent = document.getElementById("toptions");
	var titlep = document.createElement('p');
	titlep.textContent="Title: ";
	var authorp = document.createElement('p');
	authorp.textContent="Author: ";
	var titlebox = document.createElement('input');
	titlebox.id="script-title";
	titlebox.setAttribute('type','text');
	var authorbox = document.createElement('input');
	authorbox.id="script-author";
	authorbox.setAttribute('type','text');
	var scriptbox = document.createElement('textarea');
	scriptbox.style.width="100%";
	scriptbox.id="script-content";
	var addbutton = document.createElement('button');
	addbutton.setAttribute('type','submit');
	addbutton.textContent="Add";
	var cancelbutton = document.createElement('button');
	cancelbutton.setAttribute('type','submit');
	cancelbutton.textContent="Cancel";
	titlep.appendChild(titlebox);
	authorp.appendChild(authorbox);
	newcontent.appendChild(titlep);
	newcontent.appendChild(authorp);
	newcontent.appendChild(scriptbox);
	newcontent.appendChild(addbutton);
	newcontent.appendChild(cancelbutton);
	addbutton.onclick=submitnewscript;
	cancelbutton.onclick=openoptions;
  }
 
  
  function savepref(){
	  var submit1 = document.getElementById("text1");
	  var theValue = submit1.value;
	  var lon = document.getElementById("leaderboard-check");
		var lValue = lon.checked;
		var wtodon = document.getElementById("wtod-check");
		var wtodValue = wtodon.checked;
		var advstatson = document.getElementById("advstats-check");
		var advstatsValue = advstatson.checked;
		var box5 = document.getElementById("tags-check");
		var box5Value = box5.checked;
		var box6 = document.getElementById("tags-pm-check");
		var box6Value = box6.checked;
		var box7=document.getElementById("spin-border").checked;
		var box8=document.getElementById("spin-balls").checked;
		var box9=document.getElementById("tags-pubs-check").checked;
		var box10=document.getElementById("live-tags").checked;
		var box11=document.getElementsByClassName('draw-object')[0].value;
		var newset=JSON.stringify({"leaderboards":{"plusminus":lValue},"profile":{"flairwins":wtodValue,"stats":advstatsValue},"tags":{"collect":box5Value,"nogroups":box9,"draw":{"on":box6Value,"live":box10,"border":box7,"spin":box8,"values":[{"x":1,"y":1,"input":box11}]}}});
	  chrome.runtime.sendMessage({
    	from:    'prefs',
    	subject: 'profile',
		settings: newset
				});
		setTimeout(function(){openoptions(document.getElementById('tm-title').textContent.replace('TagPro Toolbox >> ',''))},500);
		//pull settings
	chrome.runtime.sendMessage({subject:'profile_id'}, function(response){
		var settingstag = document.createElement('script');
		settingstag.setAttribute("type", "application/javascript");
		settingstag.textContent="var toolkit ="+JSON.stringify(response);
		document.head.appendChild(settingstag);
		document.head.removeChild(settingstag);});
  }
  
  function exitpref(){
	  var opwindow = document.getElementById("toptions");
	  if (opwindow){
		opwindow.parentNode.removeChild(opwindow);}
		document.getElementById('overlay-back').remove();
  }
  
  function openoptions(e){
	  var opwindow = document.getElementById("toptions");
	  if (opwindow){
		opwindow.parentNode.removeChild(opwindow);}
	var xhr = new XMLHttpRequest(); 
	xhr.open( "GET", chrome.extension.getURL('options.html'),false);
	xhr.send();
	var opwindow = document.createElement('div');
	opwindow.id = "toptions";
	opwindow.innerHTML = xhr.responseText;
	opwindow.style.marginLeft = -(window.innerWidth/4)+"px";
	opwindow.style.marginTop = -(window.innerHeight/4)+"px";
	document.body.appendChild( opwindow ); 
	chrome.runtime.sendMessage({subject:"profile_id"},
    function(response) {
	  //var box1 = document.getElementById("text1");
	  //box1.value = response.profileid;
	  var box2 = document.getElementById("leaderboard-check");
	  box2.checked = response.leaderboards.plusminus;
	  var box4 = document.getElementById("advstats-check");
	  box4.checked = response.profile.stats;
	  var box3 = document.getElementById("wtod-check");
	  box3.checked = response.profile.flairwins;
	  var box5 = document.getElementById("tags-check");
	  box5.checked = response.tags.collect;
	  var box6 = document.getElementById("tags-pm-check");
	  box6.checked = response.tags.draw.on;
	 /*box5.addEventListener("change", function(e){
         if(e.target.checked) 
              box6.checked=true;
          else
              box6.checked=false;
});*/
	var box7=document.getElementById("spin-border");
	box7.checked=response.tags.draw.border;
	var box8=document.getElementById("spin-balls");
	box8.checked=response.tags.draw.spin;
	document.getElementById("tags-pubs-check").checked=response.tags.nogroups;
	document.getElementById("live-tags").checked=response.tags.draw.live;
	var pagesList=["Settings","Interface","Credits"]
	var tabs=document.getElementById("tabs");
	for(x in pagesList){
		var newHeight=document.getElementById('toptions').clientHeight-200+"px";
		document.getElementById(pagesList[x]).style.height=newHeight;
		document.getElementById(pagesList[x]).style.overflowY="scroll";
		var newTab = document.createElement('button');
		newTab.id=pagesList[x]+'-button';
		newTab.textContent=pagesList[x];
		document.getElementById(pagesList[x]).style.display="none";
		newTab.onclick=function(){for(x in pagesList){document.getElementById(pagesList[x]).style.display="none";document.getElementById(this.textContent).style.display="block";document.getElementById('tm-title').textContent="TagPro Toolbox >> "+this.textContent;}};
		tabs.appendChild(newTab);
	}document.getElementById(e).style.display="block";
	var oldblack = document.getElementById('overlay-back');
	if(oldblack!=null){oldblack.remove();}
	var blackground=document.createElement('div');
	blackground.id="overlay-back";
	document.body.appendChild(blackground);
	  var scriptlist = document.getElementById("settings-current-scripts");
	  var tagslist = document.getElementById('tags-list');
	  var scoreAtt = ['usertags plusminus','usertags averagepm','s-tags s-pops','s-tags', 's-pops', 's-grabs', 's-returns', 's-captures','s-drops', 's-support', 's-hold', 's-prevent', 'score'];
	  var textAtt=['Usertags +-','Average +-','Tags/Pops','Tags', 'Pops', 'Grabs', 'Returns', 'Captures','Drops', 'Support', 'Hold', 'Prevent', 'Score'];
	  for (i in response.tags.draw.values){
	  var newbox = document.createElement("select");
	newbox.id="select-input-"+i;
	newbox.className="draw-object";
	for(op in scoreAtt){
	var newoption = document.createElement("option");
	newoption.value=scoreAtt[op];
	newoption.textContent=textAtt[op];
	newbox.appendChild(newoption);
	}
	tagslist.appendChild(newbox);
	for ( var x = 0; x < newbox.options.length; x++ ) {
        if ( newbox.options[x].value == response.tags.draw.values[i].input ) {
            newbox.options[x].selected = true;
        }
    }
	var xinput=document.createElement('input');
	xinput.value=response.tags.draw.values[i].x;
	xinput.disabled=true;
	tagslist.appendChild(xinput);
	var yinput=document.createElement('input');
	yinput.value=response.tags.draw.values[i].y;
	yinput.disabled=true;
	tagslist.appendChild(yinput);
	/*var deletebutton=document.createElement('button');
	deletebutton.textContent="Delete"
	tagslist.appendChild(deletebutton);*/
	  }
	  //for (x in response.tags.draw.
	  /*chrome.extension.sendRequest({greeting:"get_scripts"},
    function(response2) {
	  if(response2.length>0){
		  var scripttable='<table><tbody><tr><th>Script</th><th>Edit</th></tr>';
	  for(x in response2){
		  scripttable+='<tr><td>'+response2[x].title+'</td><td><button id="'+x+'">Edit</button></td></tr>';
		  scripttable+='</tr>';
		  scriptlist.innerHTML=scripttable;
			//eval(response.scripts[x].script);
	  }
	  var scriptbutton = document.getElementById("new-script");
	  scriptbutton.onclick=appendscript;
	  
		}
		});*/
		document.getElementById(e).style.display="block";
    }
  );

  opwindow.style.display = "inline";
  	var submit1 = document.getElementById("submit1");
	submit1.onclick = savepref;
	var prefexit = document.getElementById("tm-exit");
	prefexit.onclick = exitpref;
  }
  
  function appendsettings(){
  	var sound = document.getElementById("sound");
	var content = document.createElement('img');
	content.src = chrome.extension.getURL('img/logo32.png');
	content.style.top = "0px";
	var optionslink = document.createElement('a');
	optionslink.href="#";
	optionslink.appendChild(content);
	optionslink.id = "t-options";
	optionslink.onclick = function(){openoptions('Settings')};
	if (sound!=null){
	sound.appendChild(optionslink);}else{
		optionslink.style.position="fixed";
		optionslink.style.top="10px";
		optionslink.style.right="10px";
		document.body.appendChild(optionslink);		
	}
	}
  setTimeout(appendsettings, 200);
  

});