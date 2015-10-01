  function addZero(s){
     return  (s.length < 2) ? ("0"+s) : s;
  }
	// Registro de eventos (onload)
  $(document).ready(function(){
    // Simulamos un modelo
	function Model(){

	   this.modeltext= '';
	   this.count = 0;
	   this.results =[];
	   console.log("Contador:"+this.count+"results"+this.results);
	   
	};
	Model.prototype.update = function(data){
	  var date = new Date();
	  this.results[this.count++] = data + " a las " + date;
	}
	Model.prototype.last = function(){
	  return this.results[this.results.length-1];
	}
	var model = new Model();
	
	function startRequest(){
	 return Q();
	};
	function getFile(){
		var d = Q.defer();
		var f= model.modeltext;
		d.resolve(f);
		return d.promise;

	}
	function serverRequest(e){
	//console.log('En serverRequest'+e);
	  
	 var req = $.ajax({url: '/data/'+e, 
			   type:'GET',
			   dataType:'text' 
			 });
	 console.log('serverRequest after');
	 console.log('request'+req);
	 return Q(req); // CONVIERTE LA PROMESA DE JQUERY A Q

	};
	
	function fail_msg(e){
			alert('ERROR: '+e.status+"_"+e.statusText);
	}
	function modelUpdate(result){
	  var d = Q.defer();
	  model.update(result);
	  d.resolve(model);
	  return d.promise;
	};
	
	function viewResult(model){
	  console.log('viewResult');
	  $("#text h2 span")
						.html(model.last())
						.addClass("big red underline");
	};
	
	function disableRequests(){
	  $("#requestAjax").prop("disabled", true );
	};
	
	function updateHistory(){
	  $("#requests").append("<br/>" + model.count + ". "+ model.last());
	};
	
	function enableRequests(){
	   $("#requestAjax").prop("disabled", false );
	
	};

	function setTextModel(){
		model.modeltext=f;
		
	}
	function workFlowRequest(){
	  	startRequest()
	  	.then(getFile)
	  	.then(serverRequest)
	    .fail(fail_msg)
		.then(modelUpdate)
	    .then(viewResult)
		.then(disableRequests)
		.delay(5000)
		.then(updateHistory)
		.then(enableRequests)
		.done()
	};
	$("#datalist").keydown(function (e) {
  if (e.keyCode == 13) {
   		var f= $("#datalist").val();// VALOR
   		




  }
});
	// onclick request
	$("#requestAjax").click(workFlowRequest);
	var timer = setInterval(function(){
	   var date = new Date();
	   var time = [date.getHours(), date.getMinutes(), date.getSeconds()]
				  .map(function(s){return addZero(s.toString());})
				  .join(":");
	   $("#time").text(time)
	}, 10);
	}); //ready
