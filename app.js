var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var app = express();
var contexid = "";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var conversation_id = "";
var w_conversation = watson.conversation({
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || 'cc8d0bd6-dfa7-4760-97d7-dea907055aed',
    password: process.env.CONVERSATION_PASSWORD || 'vlXPSBmtdD6T',
    version: 'v1',
    version_date: '2016-07-11'
});
var workspace = process.env.WORKSPACE_ID || 'workspaceId';

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'EAAK9vthBJUABAE30KmssSaAWTJtRCw3ZAZA2w0r1bRpFmK3UZCxb3lH5lZC0ADch9rlCZAef98hQgFq3iKZBr5c0XLM7cgs2MMTwBFCGMEfM2Dl6oY7qmija5hiQZABkWEWVK2ZCS5UoZAybD549BvcQwtU7maZBsmfSGlQADnml2JLQZDZD') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Erro de validação no token.');
});

app.post('/webhook/', function (req, res) {
	var text = null;
	
    messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {	
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;

        if (event.message && event.message.text) {
			text = event.message.text;
		}else if (event.postback && !text) {
			text = event.postback.payload;
		}else{
			break;
		}
		
		var params = {
			input: text,
			context:contexid
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
		 console.log(convResults);
		contexid = convResults.context;
		
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

function sendMessage(sender, text_) {
	text_ = text_.substring(0, 319);
	messageData = {	text: text_ };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

var token = "EAAK9vthBJUABAE30KmssSaAWTJtRCw3ZAZA2w0r1bRpFmK3UZCxb3lH5lZC0ADch9rlCZAef98hQgFq3iKZBr5c0XLM7cgs2MMTwBFCGMEfM2Dl6oY7qmija5hiQZABkWEWVK2ZCS5UoZAybD549BvcQwtU7maZBsmfSGlQADnml2JLQZDZD";
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);