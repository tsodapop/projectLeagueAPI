var sumName = "";

//use summoner id to pull level, id information//
function summonerLookUp() {
	sumName = $('#summonerName').val(); 
	
	if (sumName != "") {
		$.ajax({
			url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=0f7b94a4-44fb-45bf-9645-8a4f78341b7f',
			type: 'GET',
			dataType: 'json',
			data: {},
			success: function(json) {
				var sumNamenospace = sumName.replace(" ","");
				sumNamenospace = sumNamenospace.toLowerCase().trim();
				summonerLevel = json[sumNamenospace].summonerLevel;
				summonerID = json[sumNamenospace].id;

				$('#sLevel')[0].innerHTML = summonerLevel; 
				document.getElementById('sID').innerHTML = summonerID;

				//pull information of champion ids through summoner id//
				sumName = json[sumNamenospace].name;
						$.ajax({
						url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + summonerID + '/ranked?season=SEASON2016&api_key=0f7b94a4-44fb-45bf-9645-8a4f78341b7f',
						type: 'GET',
						data: { get_param: 'value' }, 
						dataType: 'json',
						data: {},
						success: function(data) {
							//$('#sChampions').html() = "i am trash";
							$.each(data, function() {
                            	$.each(this, function() {
                            		var champId = this.id;
                            		console.log("You play the champion " + champId);
                            		$('#sChampions').append("<div>boy</div>");//.text("You play the champion " + champId);
                            		//$('#sChampions').text("You play the champion " + champId);
                            	});
                            })  
							//summonerChampions = [data.champions[0].id,data.champions[1].id];
							//document.getElementById('sChampions').innerHTML = summonerChampions;
						}
						});

				
			},
			error: function(XMLHTTPRequest, textStatus, errorThrown) {
				alert("error getting summoner data");
			}
		});
	}
	else {}
}



