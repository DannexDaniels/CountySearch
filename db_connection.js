var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "county_search"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected!");

});

app.get('/',function(req,resp){
	connection.query("SELECT * FROM categories", function (err,result,fields){
	if (err) throw err;
	console.log(result[4]);
	console.log(fields);
	resp.send(result[2]);
});

app.listen(1337,'127.0.0.1');
