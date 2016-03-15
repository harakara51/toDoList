var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var handlebars = require('express-handlebars')
 .create({defaultLayout: 'application'});

 app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

console.log("loaded app.js");


var mysql = require('mysql');
var conn = mysql.createConnection({
    host : 'localhost',
    user : 'queryapp',
    password : 'queryapp',
    database : 'todo'
});


app.use(express.static(__dirname + '/public'));

// app.get('/', function(req,res) {
// 	res.render('index.html');
// });

// app.get('/hello', function(req,res) {
// 	res.send('Hello world');
// });


conn.connect();

app.get('/todos', function(req,res) {
	console.log("in to do route")
;    conn.query('SELECT * FROM todo', function(err,rows,fields) {
        if (err) {
            console.log("Something is amiss...");
            console.log(err);
        } else {
        	console.log("type of object recieved before sending "+ typeof(rows));
            res.json(rows);
            // console.log(rows);
        }
    }); 
});


app.post('/addTask', function(req,res) {
	console.log("in add task route and data recieved is " + req + req.task);
var input =req.body.task;
console.log("input in server is " + input);

	query = "INSERT INTO todo (task) VALUES  ('" + input + "')";
;    conn.query(query, function(err) {
        if (err) {
            console.log("Something is amiss...");
            console.log(err);
        } else {
        	console.log("table has been updated ");
            // res.json(rows);
            // console.log(rows);
        }
    }); 
});


app.listen(3000, function() {
	console.log("listening on 3000");
});


// conn.end();