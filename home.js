// var express = require("Express");
// var app = express();

// app.get("/", function(req, res){
//    res.send("Hello world");
// });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });




var express = require("Express");
var app = express();

app.get("/", function(req, res){
   res.send("<h1>404 err</h1>");
});
app.get("/name/:name", function(req, res){
   var name = req.params.name;
   res.redirect("https://www.google.com/search?q="+name)
});
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});









