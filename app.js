var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var watson = require("watson-developer-cloud");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var conversation_id = "";
var w_conversation = watson.conversation({
    url: "https://gateway.watsonplatform.net/conversation/api",
    username: process.env.CONVERSATION_USERNAME || "cc8d0bd6-dfa7-4760-97d7-dea907055aed",
    password: process.env.CONVERSATION_PASSWORD || "vlXPSBmtdD6T",
    version: "v1",
    version_date: "2016-07-11"
});

var workspace = process.env.WORKSPACE_ID || "workspaceId";

app.get("/webhook/", function (req, res) {
    if (req.query["hub.verify_token"] === "EAAK9vthBJUABAE30KmssSaAWTJtRCw3ZAZA2w0r1bRpFmK3UZCxb3lH5lZC0ADch9rlCZAef98hQgFq3iKZBr5c0XLM7cgs2MMTwBFCGMEfM2Dl6oY7qmija5hiQZABkWEWVK2ZCS5UoZAybD549BvcQwtU7maZBsmfSGlQADnml2JLQZDZD") {
        res.send(req.query["hub.challenge"]);
    }
    res.send("Erro de validação no token.");
});

app.post("/webhook/", function (req, res) {
	var text = null;
	
    var messaging_events = req.body.entry[0].messaging;
	for (var i = 0; i < messaging_events.length; i++) {	
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        var receive = event.recipient.id;

        if (event.message && event.message.text) {
			text = event.message.text;
		}else if (event.postback && !text) {
			text = event.postback.payload;
		}else{
			break;
		}
		 			
		request.post(
        "https://verius.com.br/bluehack/service.php?node="+text+"&facebook_id="+receive,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Enviado com sucesso: ", body);
            } else {
                console.log("Erro ao enviar: ", error);
            }
        }
        );
		
		
		var params = {
			input: text,
			context: {"conversation_id": conversation_id}
		}

		var payload = {
			workspace_id: "4bedccd4-7934-45ef-aa34-51dfd5fbe897"
		};

		if (params) {
			if (params.input) {
				params.input = params.input.replace("\n","");
				payload.input = { "text": params.input };
			}
			if (params.context) {
				payload.context = params.context;
			}
			
		}
		callWatson(payload, sender);
    }
    res.sendStatus(200);
});

function callWatson(payload, sender) {
	w_conversation.message(payload, function (err, convResults) {
        if (err) {
            return responseToRequest.send("Erro.");
        }
		
		if(convResults.context != null)
    	   conversation_id = convResults.context.conversation_id;
        if(convResults != null && convResults.output != null){
			var i = 0;
			while(i < convResults.output.text.length){
			 
					sendMessage(sender, convResults.output.text[i++]);
			 
				
				
			}
		}
            
    });
}

 
 
 
 
 
 
 
 function SANDERO(sender){
   	  
	  
    sendMessage2(sender,"Opa, estou com alguns veiculos que são sua cara! da uma olhada ai ;) ");
    
      messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                     "title": "R$ 160,00",
                    "subtitle": "SANDERO 1.4 TOTAL FLEX",
                    "image_url": "http://motosnovas.com.br/wp-content/uploads/2016/01/Novo-Sandero-2017-lancamento.jpg",   "buttons": [{
                        "type": "web_url",
                        "url": "https://verius.com.br/pagamento",
                        "title": "RESERVAR"
                    }, {
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, /*{
                     "title": "R$ 160,00",
                    "subtitle": "SANDERO 1.4 TOTAL FLEX - POR DENTRO",
                    "image_url": "http://motosnovas.com.br/wp-content/uploads/2016/01/Novo-Sandero-2017-lancamento.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }*/]
            }
        }
    };
     
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 
 
 
 
 
 
  
 function DOBLO(sender){
   	   
      
    
      messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                     "title": "R$ 160,00",
                    "subtitle": "DOBLO 2015 1.8 FLEX",
                    "image_url": "http://triautoautopecas.com.br/media/catalog/category/kit-embreagem-fiat-doblo-triauto-auto-pecas.jpg",
                 "buttons": [{
                        "type": "web_url",
                        "url": "https://verius.com.br/pagamento",
                        "title": "RESERVAR"
                    }, {
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, /*{
                        "title": "R$ 160,00",
                    "subtitle": "DOBLO 2015 1.8 FLEX",
                    "image_url": "http://triautoautopecas.com.br/media/catalog/category/kit-embreagem-fiat-doblo-triauto-auto-pecas.jpg",
                 
                    "buttons": [{
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }*/]
            }
        }
    };
     
     
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 
 
 
 
 
 
 
 
 








 function BMW(sender){
   	  
 
    
    
      messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "R$ 460,00",
                    "subtitle": "BMW 120i SPORT ACTIVEFLEX",
                    "image_url": "http://img0.icarros.com/dbimg/imgadicionalanuncio/5/67532558_1",   "buttons": [{
                        "type": "web_url",
                        "url": "https://verius.com.br/pagamento",
                        "title": "RESERVAR"
                    }, {
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, /*{
                       "title": "R$ 460,00",
                    "subtitle": "BMW 120i SPORT ACTIVEFLEX",
                    "image_url": "http://img0.icarros.com/dbimg/imgadicionalanuncio/5/67532558_1",
                    "buttons": [{
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }
                */]
            }
        }
    };
    
     
     
      
     
     
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 
 

 function MOBI(sender){
   	   
       messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "R$ 165,00",
                    "subtitle": "MOBI LIKE 2017 1.4 TOTAL FLEX",
                    "image_url":  "http://www.fiat.com.br/content/dam/fiat-brasil/desktop/produtos/modelos/341/versoes/341A4X0/178.png",
                     "buttons": [{
                        "type": "web_url",
                        "url": "https://verius.com.br/pagamento",
                        "title": "PAGAR COM SEGURANÇA"
                    }],
                }, /*{
                    "title": "R$ 165,00",
                    "subtitle": "MOBI LIKE 2017 1.4 TOTAL FLEX",
                    "image_url":  "http://www.fiat.com.br/content/dam/fiat-brasil/desktop/produtos/modelos/341/versoes/341A4X0/178.png",
                     "buttons": [{
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }*/
               ]
            }
        }
    };
    
     
     
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 
 
 
 
 
 
 function GOL(sender){
   	  
 
    
      var  data = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "R$ 150,00",
                    "subtitle": "GOL POWER 2017 1.4 TOTAL FLEX",
                    "image_url": "https://precoscarros.com.br/wp-content/uploads/2015/11/Novo-Gol-2017-02.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://verius.com.br/pagamento",
                        "title": "RESERVAR"
                    }, {
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, /*{
                    "title": "R$ 150,00",
                    "subtitle": "GOL POWER 2017 1.4 TOTAL FLEX",
                    "image_url": "https://precoscarros.com.br/wp-content/uploads/2015/11/Novo-Gol-2017-02.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "ADICIONAIS",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }*/
                ]
            }
        }
    };
    
    
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: data,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 
 
 
 
 
 
 
 
 
 










 function LISTAR(sender){
   	  
   
    
    var messageData = { "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "R$ 160,00",
                    "subtitle": "SANDERO 1.4 TOTAL FLEX",
                    "image_url": "http://motosnovas.com.br/wp-content/uploads/2016/01/Novo-Sandero-2017-lancamento.jpg", 
                    "buttons": [ {
                        "type": "postback",
                        "title": "sandero",
                        "payload": "sandero",
                    }],
                },{
                        "title": "R$ 160,00",
                    "subtitle": "DOBLO 2015 1.8 FLEX",
                    "image_url": "http://triautoautopecas.com.br/media/catalog/category/kit-embreagem-fiat-doblo-triauto-auto-pecas.jpg",   "buttons": [{
                        "type": "postback",
                        "title": "doblo",
                        "payload": "doblo",
                    }],
                },{
                        "title": "R$ 165,00",
                    "subtitle": "MOBI LIKE 2017 1.4 TOTAL FLEX",
                    "image_url": "https://i.ytimg.com/vi/CvzTqWO0cb8/maxresdefault.jpg",   
                    "buttons": [{
                        "type": "postback",
                        "title": "mobi",
                        "payload": "mobi",
                    }],
                },{
                        "title": "R$ 150,00",
                    "subtitle": "GOL POWER 2017 1.4 TOTAL FLEX",
                    "image_url": "http://automoveis.freewords.com.br/wp-content/gallery/gol-g7-2016/gol-g7-2016-19.jpg",  
                    "buttons": [ {
                        "type": "postback",
                        "title": "gol",
                        "payload": "gol",
                    }],
                },{
                        "title": "R$ 460,00",
                    "subtitle": "BMW 120i SPORT ACTIVEFLEX",
                    "image_url": "http://img0.icarros.com/dbimg/imgadicionalanuncio/5/67532558_1", 
                    "buttons": [  {
                        "type": "postback",
                        "title": "bmw",
                        "payload": "bmw",
                        }],
                 }]
            }
        }
    };
     
     
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
         
    });
    
    
 }
 











 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 function GET_LOCAL(sender){
   	    
    var mm = {
    "text":"Onde deseja retirar o veiculo?",
    "quick_replies":[
      {
        "content_type":"location",
      }
    ]
  };
    
     
    
    
    
        request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: mm,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
           
    });
    
    
 
 }
 
 
 
 
 function PERGUNTA_LOCAL(sender){
   	   
    
    var mm =  {
    "text":"Deseja usar sua localização para priorizar nossas unidades proximas a você?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Usar Minha Localização",
        "title":"Usar Meu Local",
        "payload":"Sim mostre minha localização!"
      },
      {
        "content_type":"text",
        "title":"Não",
        "payload":"Não, vou escolher uma unidade na lista."
      }
    ]
  };
    
    
    text_ = "Beleza!";
	messageData = {	text: text_ };
  
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: mm,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
    
 }
 
 /*
  * 
  * 
  * {
    "text":"Please share your location:",
    "quick_replies":[
      {
        "content_type":"location",
      }
    ]
  }
  * 
  * 
  */
 
 
 
 

function posMapa(sender) {
	  var mm =  {
    "text":"Temos as seguintes datas proximas disponiveis para retirar o veiculo:",
    "quick_replies":[
      {
        "content_type":"text", 
        "title":"15 de abril, 2017",
        "payload":"15 de abril, 2017"
      },
      {
        "content_type":"text",
       "title":"26 de abril, 2017",
        "payload":"26 de abril, 2017"
      },
      {
        "content_type":"text",
       "title":"28 de abril, 2017",
        "payload":"26 de abril, 2017"
      },
      {
        "content_type":"text",
       "title":"29 de abril, 2017",
        "payload":"29 de abril, 2017"
      }
    ]
  };
       
     	
     	
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: mm,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
	  
     };
 	
 
     

 function COMPROVANTE(sender){
 	
 	
	  var mm =  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Bruno Brito",
        "order_number":"12345678902",
        "currency":"BRL",
        "payment_method":"Visa, Master, Dyners, Boleto e Transfêrencia",        
        "order_url":"http://bluehack.org",
        "timestamp":"1490528750", 
        "elements":[
          {
            "title":"MOBI LIKE 2017 1.4 TOTAL FLEX",
            "subtitle":"Completo + Seguro",
            "quantity":2,
            "price":165,
            "currency":"BRL",
            "image_url":"https://cdn4.iconfinder.com/data/icons/car-service-bolt-line-vol-2-2/128/service-59-512.png"
          }],
        "address":{
          "street_1":"R. Tutoia, 1157 - Vila Mariana",
          "street_2":"",
          "city":"São Paulo",
          "postal_code":"04007-900",
          "state":"SP",
          "country":"BR"
        },
        "summary":{
          "subtotal":165.00,
          "shipping_cost":0,
          "total_tax":0,
          "total_cost":165.00
        } 
      }
    }
};

       
     	
     	
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: mm,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
        
        MOBI(sender);
        
    });
     
 	
 };
 
 

function sendMessage(sender, text_) {
	text_ = text_.substring(0, 319);
	messageData = {	text: text_ };
     
  	
  	if(text_.indexOf("gol") != -1){
	 	GOL(sender);	  
     text_ = null;
     } else if(text_.indexOf("sandero") != -1){
	 	SANDERO(sender);	  
     text_ = null;
     } else if(text_.indexOf("bmw") != -1){
	 	BMW(sender);	  
     text_ = null;
     } else if(text_.indexOf("doblo") != -1){
	 	DOBLO(sender);	  
     text_ = null;
     } else if(text_.indexOf("mobi") != -1){
	 	MOBI(sender);	  
     text_ = null;
     } else if(text_.indexOf("___LOCAL") != -1){
	 	PERGUNTA_LOCAL(sender);	  
     text_ = null;
    } else if(text_.indexOf("__EXIBIR_LOCAL") != -1){
	 	posMapa(sender);	  
     text_ = null;
   } else if(text_.indexOf("___VIEW_CARS") != -1){
	 	 LISTAR(sender);	  
     text_ = null;
  } else if(text_.indexOf("abril") != -1){
	 	 COMPROVANTE(sender);	  
     text_ = null;
     }else{
     	
     	
     	
     	
     	
     	
     	
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
	  
     }
 	
	 	
   	  
 
    
};
  

function sendMessage2(sender, text_) {
	text_ = text_.substring(0, 319);
	messageData = {	text: text_ };
      
     	
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: ", error);
        } else if (response.body.error) {
            console.log("Error: ", response.body.error);
        }
    });
    
	  
};



var token = "EAAK9vthBJUABAE30KmssSaAWTJtRCw3ZAZA2w0r1bRpFmK3UZCxb3lH5lZC0ADch9rlCZAef98hQgFq3iKZBr5c0XLM7cgs2MMTwBFCGMEfM2Dl6oY7qmija5hiQZABkWEWVK2ZCS5UoZAybD549BvcQwtU7maZBsmfSGlQADnml2JLQZDZD";
var host = (process.env.VCAP_APP_HOST || "localhost");
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);