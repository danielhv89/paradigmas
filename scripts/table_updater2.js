
function table_clear(){
	$("#elections tbody").remove();
	
};

function bindDelete() {
	$("#deleteBtn").click(table_clear);
};

function bindPolling() {
	$("#pollBtn").click(startPolling);
};

var the_votes = {
	"Heredia":{voters: 70000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"San Jose":{voters: 200000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"Alajuela":{voters: 80000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"Cartago":{voters: 50000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"Puntarenas":{voters:100000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"Limon":{voters: 60000, parties:{pln:0, pac:0, plib:0, rc:0}},
	"Guanacaste": {voters:90000, parties:{pln:0, pac:0, plib:0, rc:0}}
	
};
function print_votes(){
	for(prov in the_votes){
	   for(p in the_votes[prov].parties)
		   console.log(prov + " party-vote: "+ p + " " +the_votes[prov].parties[p] );
	}
}
function updateTable(votes){
	table_clear();
	var table = $("#elections");
	var tbody = table.append($("<tbody/>"));
	$.each(votes, function(province, data){
		            var row = $("<tr/>");
					row.append($("<td/>")).html(province);
                     $.each(data.parties, function(partyName, partyValue){
						var td = $("<td/>");
						td.html(partyValue);
						row.append(td);
						td = $("<td/>");
						td.html(0);
						row.append(td);
						
					});
					
					tbody.append(row);				
	});
	
};
var timer;
function startPolling(){
 timer = setInterval(function(){updateTable(obtainNewVotes(the_votes));}, 5000);
	
};
var times = 0;
function obtainNewVotes(votes){
	 var live = 0;
     for(var place in votes){
		 var prov = votes[place];
		 if (prov.voters == 0) continue;
		 live++;
		 for(var p in prov.parties){
			 var prob = Math.random();
			 var v = Math.round(prov.voters*prob);
			 if (v > prov.voters) v = prov.voters;
			 prov.parties[p] += v;
			 prov.voters -= v;
			 if (prov.voters < 0) prove.voters = 0;
		 }	 
	 };
	 if(live == 0){
		 console.log('Elections is finished')
		 clearInterval(timer);
	 };
	 return votes;
};