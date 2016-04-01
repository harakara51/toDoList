var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var credentials = require('./credentials.js');


var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'application'
    });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

console.log("loaded app.js + " + credentials.cookieSecret);

app.use(cookieParser(credentials.cookieSecret));
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'queryapp',
    password: 'queryapp',
    database: 'todo'
});


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    key: "user"
}));


app.use(express.static(__dirname + '/public'));


app.get("/setCookie", function(req, res) {
    console.log("in setCookie");
    res.cookie("test", []);
    res.send(true);
});

conn.connect();


app.post('/userSet', function(req, res) {
    console.log("inside userSet");
    if (req.session.user) {
        res.send(true);
    }


});

app.get('/todos', function(req, res) {


    console.log("ln 56 user ID now: " + req.session.user);


    if (req.session.user) {
        var id = req.session.user;

        var query = "SELECT * FROM todo where userid =" + id;
        console.log("ln 62, ID" + id + " and query is " + query);
        console.log("in to do route");
        conn.query(query, function(err, rows, fields) {
            if (err) {
                console.log("Something is amiss...");
                console.log(err);
            } else {
                console.log("type of object recieved before sending " + typeof(rows));
                res.json(rows);

            }
        });
    } else {
        console.log("ln 76, pull data from cookies: " + req.cookies.test);
        res.json(req.cookies.test);

    }
});


app.delete('/delete', function(req, res) {
    console.log("in delete task, req  is :  " + req + req.body + req.body.id);
    var input = req.body.id;
    console.log("input in server is " + input);

    var query = "delete from todo where id in (" + input + ")";
    console.log("query is :" + query);
    conn.query(query, function(err) {
        if (err) {
            console.log("Something is amiss...");
            console.log(err);
        } else {
            console.log("table has been updated ");
        }
    });
});

app.post('/addTask', function(req, res) {

    if (req.session.user) {
        console.log("ln 110, in add task route and data recieved is " + req + req.task);
        var input = req.body.task;
        console.log("input in server is " + input);

        query = "INSERT INTO todo (task, userid) VALUES  ('" + input + "', " + req.session.user + ")";
        conn.query(query, function(err) {
            if (err) {
                console.log("Something is amiss...");
                console.log(err);
            } else {
                userStatus = true;

                res.send(userStatus);
                console.log("table has been updated ");

            }
        });

    } else {


        // console.log("inside of else of add to task");
        var tasks = req.body.task;
        console.log("data from client :" + tasks);


        console.log("data in  request object / cookie : " + req.cookies.test);
        var array = req.cookies.test;
        array.push(tasks);
        console.log(" data in array to be pushed to cookie : " + array);
        console.log("creating new response cookie object");
        res.cookie("test", array);

        userStatus = false;

        res.send(userStatus);
        // res.cookie('test', tempCart.push(productid));
        // console.log("final cookie data "+ res.cookie.test);
        // res.send(true);




    }
});

app.post('/createAccount', function(req, res) {
    console.log("in route to create account");

    console.log("input in server is " + req);
    var userTempID;
    var query = "insert into users (username, password, email) values ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.email + "')";

    console.log("Query is : " + query);
    conn.query(query, function(err, result) {
        if (err) {
            console.log("Something is amiss...");
            console.log(err);
        } else {

            userTempID = result.insertId;


            console.log("table has been updated ");
            // res.json(rows);
            // console.log(rows);
        }

        req.session.user =req.body.username;

        for (var i = 0; i < req.cookies.test.length; i++) {
            var query2 = "insert into todo (task, userid" + ") values ('" + req.cookies.test[i] + "' ," + userTempID + ")";
            console.log(query2);
            conn.query(query2, function(err, result) {
                if (err) {
                    console.log("Something is amiss...");
                    console.log(err);
                } else {


                    console.log("table for todos has been updated ");
                    // res.json(rows);
                    // console.log(rows);
                }



            });

        }
		res.clearCookie('test');
    	res.cookie("test", []);

        	res.send(true);
    });
});


app.get('/allCookies', function(req, res) {
    console.log("Cookies: ", req.cookies);
});


app.put("/login", function(req, res) {

    console.log("creating session user");
    // req.session.user  =  req.body.username;
    var user = req.body.username;

    query = "SELECT * FROM users where username = '" + user + "'";
    console.log(query);

    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("ln 158: Something is amiss...");
            console.log(err);
        } else {

            req.session.user = rows[0].id;
            console.log(" ln 210: user info " + (rows[0].id) + " user.id = " + user + " username id in session:  " + req.session.user);
            res.json(rows);

        }
    });

    console.log("ln 216 :user " + req.body.username + user + " login");
    // res.send(req.body);


});


app.get("/logout", function(req, res) {

    console.log("in logout route");
    req.session.user = null;
    req.session.destroy();
    
    res.clearCookie('test');
    res.cookie("test", []);
    res.send(true);

    //console.log("user has logged out" +req.session.user + " again " + req.session.user) ;

});


app.listen(3000, function() {
    console.log("listening on 3000");
});


// conn.end();
