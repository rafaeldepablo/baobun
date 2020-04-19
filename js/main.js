
  function update_valor(id,action) {
    if (action == 'plus') {
      document.getElementById(id).innerHTML =  parseInt(document.getElementById(id).innerHTML) +1;
    }
    if (action == 'minus') {
        if (parseInt(document.getElementById(id).innerHTML) != 0) {
          document.getElementById(id).innerHTML =  parseInt(document.getElementById(id).innerHTML) -1;
        }
    }
  }


function get_qr() 
{
	// Cambiar a POST y meter datos en json
	$("#result").innerHTML ="Generando pedido";
	console.log("Llamando get_qr")
	var xmlhttp = new XMLHttpRequest();   
	//var xmlhttp = new createCORSRequest(); 
	//var theUrl = "https://nw215p2qwa.execute-api.us-east-1.amazonaws.com/api/request_authorizer/get_qrstatic";
	var theUrl = "https://nw215p2qwa.execute-api.us-east-1.amazonaws.com/api/request/new";
	xmlhttp.open("POST", theUrl,true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.onreadystatechange = function () {
		if(xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
			var result =JSON.parse(xmlhttp.responseText);
			$("#my_image").attr("src", result['url']);
			$("#result").text(result['result']);
			console.log(result)
			console.log(result['result'])
			console.log(result['data']['id_request'])
			
			var html = '<div class="form-group"><label  class="col-sm-2 control-label">Enter Name</label><div class="col-sm-10"><input type="text" class="form-control" id="nameId" name="fullNme" placeholder="Enter full Name"></div></div>';
			var html = 'Presenta en la caja el código de abajo, tu billete a Taiwan'
			$('#result').html(html);
		}
	};
	var allInputs =$('em.order')
	var i=0;
	var jsonData = {};
	
	for (i=0;i<allInputs.length;i++) {
		//console.log(allInputs[i])
		//console.log(allInputs[i])
		name =allInputs[i]['id']
		jsonData[name] =parseInt(allInputs[i].innerHTML)
	}
	// Create json with the request data
	level ="data_form"
	request_data ={}
	request_data["id_conf_request"] ='e62dca25-a9b1-4d51-9bae-88571a57cbbe'
	request_data["id_entity"] ='abcde'
	request_data[level]={}
	request_data[level] =jsonData
	//Seria la persona que te atiende y te escanea el codigo
	//Cuando se escanea el código se debería vincular
	request_data["authorizers"] =['609221208','XXX-000-YYY']
	console.log(request_data)
	xmlhttp.send(JSON.stringify(request_data));		
}
