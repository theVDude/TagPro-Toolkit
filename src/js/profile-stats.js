function stats(){
var games = [];
var todaygames = [];
var weekgames = [];
var monthgames = [];
var allgames = [];
var tableData = $('table.board:first').find(' tbody tr td:nth-child(3)');
    if (tableData.length > 0) {
        tableData.each(function() { games.push($(this).text()); });
    }
$('table.board.smaller').before('<div id="stats-buttons"><button id="total-button">Totals</button><button id="game-button">Per Game</button><button id="minute-button">Per Minute</button></div>')
$('table.board.smaller').after('<table class="board smaller" id="bygame" style="display:none;margin-top:0px;"><tr><th><th>Tags</th><th>Popped</th><th>Grabs</th><th>Drops</th><th>Hold</th><th>Captures</th><th>Prevent</th><th>Returns</th><th>Support</th></th></tr></table>');


var userscores = $('table.board.smaller').find('tbody tr');
var todayscores = $('table.board.smaller tbody tr:nth-of-type(2)').find('td');
if (todayscores.length > 0) {
	todayscores.each(function(){
		todaygames.push($(this).text());
	});
}
var weekscores = $('table.board.smaller tbody tr:nth-of-type(3)').find('td');
if (weekscores.length > 0) {
	weekscores.each(function(){
		weekgames.push($(this).text());
	});
}
var monthscores = $('table.board.smaller tbody tr:nth-of-type(4)').find('td');
if (monthscores.length > 0) {
	monthscores.each(function(){
		monthgames.push($(this).text());
	});
}
var allscores = $('table.board.smaller tbody tr:nth-of-type(5)').find('td');
if (allscores.length > 0) {
	allscores.each(function(){
		allgames.push($(this).text());
	});
}
$('#bygame').append('<tr id="toda"><th>Today</th></tr>');
if (todaygames.length > 0) {
	for (x in todaygames) {
		if (x==4 || x==6){
			var hhmmss = todaygames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/games[0]).toFixed(1);
		}
		else{
		var val = (todaygames[x]/games[0]).toFixed(2);
		}
		$('#toda').append('<td class="alt">'+val+'</td>');
		
	}
}
$('#bygame').append('<tr id="wee"><th>Week</th></tr>');
if (weekgames.length > 0) {
	for (x in weekgames) {
		if (x==4 || x==6){
			var hhmmss = weekgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/games[1]).toFixed(1);
		}
		else{
		var val = (weekgames[x]/games[1]).toFixed(2);
		}
		$('#wee').append('<td>'+val+'</td>');
		
	}
}
$('#bygame').append('<tr id="mont"><th>Month</th></tr>');
if (monthgames.length > 0) {
	for (x in monthgames) {
		if (x==4 || x==6){
			var hhmmss = monthgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/games[2]).toFixed(1);
		}
		else{
		var val = (monthgames[x]/games[2]).toFixed(2);
		}
		$('#mont').append('<td class="alt">'+val+'</td>');
		
	}
}
$('#bygame').append('<tr id="allg"><th>All</th></tr>');
if (allgames.length > 0) {
	for (x in allgames) {
		if (x==4 || x==6){
			var hhmmss = allgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/games[3]).toFixed(1);
		}
		else{
		var val = (allgames[x]/games[3]).toFixed(2);
		}
		$('#allg').append('<td>'+val+'</td>');
		
	}
}

$('table.board.smaller').after('<table class="board smaller" id="byminute" style="margin-top:0px;display:none;"><tr><th><th>Tags</th><th>Popped</th><th>Grabs</th><th>Drops</th><th>Hold</th><th>Captures</th><th>Prevent</th><th>Returns</th><th>Support</th></th></tr></table>');

var times=[];
var timers=document.getElementsByClassName('duration');
for (x = 0; x < 4; x++){var utime=timers[x].textContent;utime=utime.split(':');utime=((+utime[0]) * 60 * 60 + (+utime[1]) * 60 + (+utime[2]));times.push(Math.round(utime/60));}

var tablelist=[]
if (todaygames.length > 0) {
	var lines=[]
	lines.push('<tr id="toda"><th>Today</th>');
	for (x in todaygames) {
		if (x==4 || x==6){
			var hhmmss = todaygames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/times[0]).toFixed(1);
		}
		else{
		var val = (todaygames[x]/times[0]).toFixed(2);
		}
		lines.push('<td class="alt">'+val+'</td>');
		
	}
	lines.push('</tr>')
	tablelist.push(lines)
}
if (weekgames.length > 0) {
	var lines=[]
	lines.push('<tr id="toda"><th>Week</th>');
	for (x in weekgames) {
		if (x==4 || x==6){
			var hhmmss = weekgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/times[1]).toFixed(1);
		}
		else{
		var val = (weekgames[x]/times[1]).toFixed(2);
		}
		lines.push('<td>'+val+'</td>');
		
	}
	lines.push('</tr>')
	tablelist.push(lines)
}
if (monthgames.length > 0) {
	var lines=[]
	lines.push('<tr id="toda"><th>Month</th>');
	for (x in monthgames) {
		if (x==4 || x==6){
			var hhmmss = monthgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/times[2]).toFixed(1);
		}
		else{
		var val = (monthgames[x]/times[2]).toFixed(2);
		}
		lines.push('<td class="alt">'+val+'</td>');
		
	}
	lines.push('</tr>')
	tablelist.push(lines)
}
if (allgames.length > 0) {
	var lines=[]
	lines.push('<tr id="toda"><th>All</th>');
	for (x in allgames) {
		if (x==4 || x==6){
			var hhmmss = allgames[x].split(':');
		var val = (((+hhmmss[0]) * 60 * 60 + (+hhmmss[1]) * 60 + (+hhmmss[2]))/times[3]).toFixed(1);
		}
		else{
		var val = (allgames[x]/times[3]).toFixed(2);
		}
		lines.push('<td>'+val+'</td>');
		
	}
	lines.push('</tr>')
	tablelist.push(lines)
}
$('#byminute').append(tablelist.join());
if(document.getElementById('showSettings')!==null && typeof highscores!==undefined){
$('#minute-button').after('<button id="high-button">High Scores</button>');
var timeNow = Date.now()-10800000;
timeNow= new Date(timeNow);
var oldTime = new Date(highscores.lastreset);
var pmlist = document.createElement('table');
pmlist.className="board smaller";
pmlist.id="high-table";
pmlist.style.display="none";
pmlist.style.marginTop="0px";
var tablebody="<tbody><tr><th></th>";
var scoreAtt = ['s-tags', 's-grabs', 's-returns', 's-captures','s-support', 's-hold', 's-prevent', 'score', 'points',];
var scoreName = ['Tags', 'Grabs', 'Returns', 'Caps','Support', 'Hold', 'Prevent', 'Score', 'Points',];
if(oldTime.getUTCDay()!==timeNow.getUTCDay()){
	highscores.lastreset=timeNow;
	for (x in scoreAtt){highscores.day[scoreAtt[x]]={"value":0,"set":timeNow};}
		if(timeNow.getUTCDay()==1){
			for (x in scoreAtt){highscores.week[scoreAtt[x]]={"value":0,"set":timeNow};}
						}
					}
		if(oldTime.getUTCMonth()!==timeNow.getUTCMonth()){
			for (x in scoreAtt){highscores.month[scoreAtt[x]]={"value":0,"set":timeNow};}
					}
for (x in scoreName){tablebody+="<th>"+scoreName[x]+"</th>";}
tablebody+="</tr><tr><th>Today</th>";
for (x in scoreAtt){tablebody+='<td class="alt">'+highscores.day[scoreAtt[x]].value+"</td>";}
tablebody+="</tr><tr><th>Week</th>";
for (x in scoreAtt){tablebody+='<td>'+highscores.week[scoreAtt[x]].value+"</td>";}
tablebody+="</tr><tr><th>Month</th>";
for (x in scoreAtt){tablebody+='<td class="alt">'+highscores.month[scoreAtt[x]].value+"</td>";}
tablebody+="</tr><tr><th>All</th>";
for (x in scoreAtt){tablebody+='<td>'+highscores.all[scoreAtt[x]].value+"</td>";}

tablebody+="</tr></tbody></table>";
pmlist.innerHTML=tablebody;
$('table.board:last-of-type').before(pmlist);
}



$(document).on('click','#game-button',function(){
	$('table.board.smaller').hide();
	$('#bygame').show();
});

$(document).on('click','#minute-button',function(){
	$('table.board.smaller').hide();
	$('#byminute').show();
});

$(document).on('click','#total-button',function(){
	$('table.board.smaller').hide();
	$('table.board.smaller:first').show();
});

$(document).on('click','#high-button',function(){
	$('table.board.smaller').hide();
	$('#high-table').show();
});

}
function run(){if(typeof toolkit!="undefined" && typeof serverstats!="undefined"){stats();}else{setTimeout(run,100);}}
run()