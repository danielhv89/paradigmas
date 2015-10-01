var http = require('http');

var request_parameters ={
	host:'localhost',
	port:8080,
	method:'GET',
	path:'/data/texto.txt'
	
};

function doRequest() {
	         console.log('Requesting...');
	         var req =
			 http.get(request_parameters,  function(res){
				 var results = '';
				 res.on('data',  function(next){
					 results +=next;
				 });
				 res.on('end', function(){
					 var d = new Date();
					 console.log(results + " a las " + d)
				 });
				 res.on('error', function(e){
					 console.log(e);
				 });
             });
			 req.on('error', function(e){
				 console.log(e.message);
			 });
};


setInterval(doRequest, 5000);