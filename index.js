var myArray = require('./myArray.json');
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	let pan = request.query.pan;
	response.send(search(pan));
})

function search(pan){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].PAN === pan) {
            return myArray[i];
        }
    }
    return "NOT FOUND";
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
