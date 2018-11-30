var myArray = require('./myArray.json');
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	let pan = request.query.pan;
	let age =  request.query.age;
	if(pan && age){
		response.send(searchByPanAndAge(pan,age));
	}else if (pan){
		response.send(search(pan));
	}else if (age){
		response.send(searchByAge(age));
	}else{
		response.send("send pan or age or both");
	}
})

// get by age (first match)
app.get('/age/', function(request, response) {
	let pan = request.query.age;
	response.send(searchByAge(age));
})

function search(pan){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].PAN === pan) {
            return myArray[i];
        }
    }
    return "NOT FOUND";
}

function searchByAge(age){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].Age === age) {
            return myArray[i];
        }
    }
    return "NOT FOUND";
}

function searchByPanAndAge(pan,age){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].Age === age && myArray[i].PAN === pan) {
            return myArray[i];
        }
    }
    return "NOT FOUND";
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
