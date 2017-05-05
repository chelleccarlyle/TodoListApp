var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('todos',['todos']); //Database and collections
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public")); //Refers to index.html
app.use(bodyParser.json()); //Format to get data from database

//Main page
app.get('/todos', function(req, res) {

    //Get information from database
    console.log("I received a GET request, sending data...");

    db.todos.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

app.post("/todos", function(req, res){
	console.log(req.body);
    //Put information in database
	db.todos.save(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/todos/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todos.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/todos/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.todos.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     res.json(doc);
  });
});

//Mark as done
app.post('/todos/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.todos.findAndModify(
    { query: {_id: mongojs.ObjectId(id)}, //Document to update with certain parameter
        update: {$set: {status: "Done"}}, 
        new: true //Return new document 
    }, function(err, doc){
        res.json(doc);
    });
    
});

app.put('/todos/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todos.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, //Document to update with certain parameter
     update: {$set: {title: req.body.title, text: req.body.text, due: req.body.due}}, 
     new: true //Return new document 
   }, function(err, doc){
     res.json(doc);
   });
});

app.listen(3000); //Listen for HTTP requests on port 3000
console.log("Server running on port 3000");