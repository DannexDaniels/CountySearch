var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/views'));
app.use(bodyparser.urlencoded());

app.set('view engine', 'ejs');

//setting the connection variables
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "county_search"
});

//loading the home page
app.get('/',function (req,res) {


    connection.query("SELECT name FROM place",function (err,result,fields) {
       if(err) throw err;
        res.render('home',{latitude : 0.2827, longitude : 34.7519, rate : "not set", names : "Kakamega", location : "not set", description : "not set",type : "not set", category : "not set"});
        console.log(result)
    });
});

app.post('/getCoordinates',function (req,res) {
    connection.query("SELECT * FROM details WHERE name = '"+req.body.place+"'", function (err,result,fields){
        if (err) throw err;
        console.log(result);
        res.render('home',{latitude : result[0].longitude, longitude : result[0].latitude, rate : result[0].rate,names : result[0].name,location : result[0].location_description,description : result[0].place_description,type : result[0].place_category, category : result[0].category_description});
    });
});

app.listen(1337,function () {
    console.log('server is up and running');
});
