var http = require('http');
var Q = require('q');

var request_parameters = {
	host:'localhost',
	port:8080,
	method:'GET',
	path:'/data/texto.txt'
	
};

function startRequest(){
	console.log('Requesting...');		 
	var d = Q.defer();
	var req = http.get(request_parameters, d.resolve);
	req.on('error', d.reject);
	return d.promise;
};

function buildResponse(res) {
	 var d = Q.defer();
	 var results = '';
	 
	 res.on('data',  function(next){
			 results += next;
	 });
	 
	 res.on('end', function(){
			 var date = new Date();
			 d.resolve(results + " a las " + date)
	 });
	 
	 return d.promise;	 
             
};

function processResponse(data){
	console.log(data);
};

function initWorkFlow(){
	return Q(); // Promesa vacia
};
function failFlow(e){
	console.log(e.message);
};
function doRequest(){
	  initWorkFlow()
	 .then(startRequest)
	 .then(buildResponse) 
	 .then(processResponse)
	 .fail(failFlow)
	 .done()
};
// Repita request cada 5 segundos
setInterval(doRequest, 5000);
