function tags(){
if(document.getElementById('showSettings')!==null){
var bestwith=[];
var bestagainst=[];
var mostgames=[];
var mostwins=[];
var mostlosses=[], mostlosses2=[], mostwins2=[];
for (x in usertags){bestwith.push([x,usertags[x].plus.with]);}
bestwith.sort(function(a,b){return a[1] - b[1]});
for (x in usertags){bestagainst.push([x,usertags[x].plus.against]);}
bestagainst.sort(function(a,b){return a[1] - b[1]});
for (x in usertags){mostgames.push([x,usertags[x].games.total]);}
mostgames.sort(function(a,b){return a[1] - b[1]});
mostgames.reverse();
mostgames.splice(0,1);
for (x in usertags){mostwins2.push([x,usertags[x].games.with.losses]);}
mostwins2.sort(function(a,b){return a[1] - b[1]});
mostwins2.reverse();
for (x in usertags){mostlosses2.push([x,usertags[x].games.against.losses]);}
mostlosses2.sort(function(a,b){return a[1] - b[1]});
mostlosses2.reverse();
if(bestwith.length>4&&bestagainst.length>4&&mostgames.length>4){
$('#minute-button').after('<button id="best-button">Best Users</button><button id="worst-button">Worst Users</button><button id="map-button">By Map</button><button id="server-button">By Server</button>');
var pmlist = document.createElement('table');
pmlist.className="board smaller";
pmlist.id="worst-table";
pmlist.style.display="none";
pmlist.style.marginTop="0px";
pmlist.innerHTML="<tr><th>Worst Teammates</th><th>+-</th><th></th><th>Losses</th><th>Weakest Enemies</th><th>+-</th><th></th><th>Losses</th></tr>";
for(x in bestwith){if(x<5){pmlist.innerHTML+='<tr><td class="alt">'+bestwith[x][0]+'</td><td>'+bestwith[x][1]+'</td><td class="alt">'+mostwins2[x][0]+'</td><td>'+mostwins2[x][1]+'</td><td class="alt">'+bestagainst[x][0]+'</td><td>'+bestagainst[x][1]+'</td><td class="alt">'+mostlosses2[x][0]+'</td><td>'+mostlosses2[x][1]+'</td></tr>';}}
pmlist.innerHTML+="</table>";
$('table.board:last-of-type').before(pmlist);
bestwith.reverse();
bestagainst.reverse();
for (x in usertags){mostwins.push([x,usertags[x].games.with.wins]);}
mostwins.sort(function(a,b){return a[1] - b[1]});
mostwins.reverse();
for (x in usertags){mostlosses.push([x,usertags[x].games.against.wins]);}
mostlosses.sort(function(a,b){return a[1] - b[1]});
mostlosses.reverse();
var pmlist = document.createElement('table');
pmlist.className="board smaller";
pmlist.id="best-table";
pmlist.style.display="none";
pmlist.style.marginTop="0px";
pmlist.innerHTML="<tr><th>Best Teammates</th><th>+-</th><th></th><th>Wins</th><th>Greatest Enemies</th><th>+-</th><th></th><th>Wins</th><th>Most Games</th><th>#</th></tr>";
for(x in bestwith){if(x<5){pmlist.innerHTML+='<tr><td class="alt">'+bestwith[x][0]+'</td><td>'+bestwith[x][1]+'</td><td class="alt">'+mostwins[x][0]+'</td><td>'+mostwins[x][1]+'</td><td class="alt">'+bestagainst[x][0]+'</td><td>'+bestagainst[x][1]+'</td><td class="alt">'+mostlosses[x][0]+'</td><td>'+mostlosses[x][1]+'</td><td class="alt">'+mostgames[x][0]+'</td><td>'+mostgames[x][1]+'</td></tr>';}}
pmlist.innerHTML+="</table>";
$('table.board:last-of-type').before(pmlist);}

var bestmaps=[];
var scoreAtt = ['games','wins','losses','caps-for','caps-against','s-tags', 's-pops', 's-grabs', 's-returns', 's-captures','s-drops', 's-support', 's-hold', 's-prevent', 'score', 'points','played'];
for (x in serverstats.maps){var mapdata=[];mapdata.push(x);for(z in scoreAtt){mapdata.push(serverstats.maps[x][scoreAtt[z]])};bestmaps.push(mapdata);};
bestmaps.sort(function(a,b){return a[1] - b[1]});
bestmaps.reverse();

var pmlist = document.createElement('table');
pmlist.className="board smaller";
pmlist.id="maps-table";
pmlist.style.display="none";
pmlist.style.marginTop="0px";
pmlist.innerHTML='<tr><th>Maps</th><th>Games</th><th>Wins</th><th>Losses</th><th>%</th><th title="Caps For">CF</th><th title="Caps Against">CA</th><th>Tags</th><th>Pops</th><th>Returns</th><th>Caps</th><th>Seconds / Game</th></tr>';
for(x in bestmaps){
	var newline = document.createElement('tr');var tableList=[1,2,3,4,5,6,7,9,10];
	for(z in bestmaps[x]){
		for(y in tableList){
			if (tableList[y]==z){
		var newcell = document.createElement('td');
		newcell.textContent=bestmaps[x][z];
		newline.appendChild(newcell);
			if (z==3){
				var newcell = document.createElement('td');
		newcell.textContent=Math.round(100*bestmaps[x][2]/bestmaps[x][1]);
		newcell.className="alt";
		newline.appendChild(newcell);
			}
		}
		}if(z==0){
			var newcell = document.createElement('th');
			newcell.textContent=bestmaps[x][z];
			newline.appendChild(newcell);
			}
		}
		var newcell = document.createElement('td');
			newcell.textContent=Math.round(bestmaps[x][17]/bestmaps[x][1])
			newline.appendChild(newcell);
		pmlist.appendChild(newline);}
pmlist.innerHTML+="</table>";
$('table.board:last-of-type').before(pmlist);
var bestmaps=[];
var scoreAtt = ['games','wins','losses','caps-for','caps-against','s-tags', 's-pops', 's-grabs', 's-returns', 's-captures','s-drops', 's-support', 's-hold', 's-prevent', 'score', 'points','played'];
for (x in serverstats.servers){var mapdata=[];mapdata.push(x);for(z in scoreAtt){mapdata.push(serverstats.servers[x][scoreAtt[z]])};bestmaps.push(mapdata);};
bestmaps.sort(function(a,b){return a[1] - b[1]});
bestmaps.reverse();

var pmlist = document.createElement('table');
pmlist.className="board smaller";
pmlist.id="server-table";
pmlist.style.display="none";
pmlist.style.marginTop="0px";
pmlist.innerHTML="<tr><th>Maps</th><th>Games</th><th>Wins</th><th>Losses</th><th>Caps for</th><th>Caps Against</th><th>Tags</th><th>Pops</th><th>Returns</th><th>Caps</th></tr>";
for(x in bestmaps){
	var newline = document.createElement('tr');var tableList=[1,2,3,4,5,6,7,9,10];
	for(z in bestmaps[x]){
		for(y in tableList){
			if (tableList[y]==z){
		var newcell = document.createElement('td');
		newcell.textContent=bestmaps[x][z];
		newline.appendChild(newcell);
		}}if(z==0){
			var newcell = document.createElement('th');
			newcell.textContent=bestmaps[x][z];
			newline.appendChild(newcell);
			}
		}pmlist.appendChild(newline);}
pmlist.innerHTML+="</table>";
$('table.board:last-of-type').before(pmlist);

}

$(document).on('click','#best-button',function(){
	$('table.board.smaller').hide();
	$('#best-table').show();
});
$(document).on('click','#worst-button',function(){
	$('table.board.smaller').hide();
	$('#worst-table').show();
});

$(document).on('click','#map-button',function(){
	$('table.board.smaller').hide();
	$('#maps-table').show();
});

$(document).on('click','#server-button',function(){
	$('table.board.smaller').hide();
	$('#server-table').show();
});
}
setTimeout(tags,200);