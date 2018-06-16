'use strict';
var express = require('express');
var app = express();
var fs = require("fs");
var config;
app.listen(process.env.PORT, function() {
 console.log("Server running on port 8080.");
});
//Serve www folder
app.use(express.static(__dirname + '/www'));
app.use('*', express.static(__dirname + '/www/index.html'));