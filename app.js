var express = require('express');
var app = express();
const port= 3000;


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:root1234@ds031822.mlab.com:31822/harincastle",{useNewUrlParser: true}).then(() => {
    console.log("connection sucessfull");
}).catch((err) => {
    console.log("Connection failed");
});

var UsernameSchema = new mongoose.Schema({
    username:String
});
var User = mongoose.model("User",UsernameSchema);

app.use("/",express.static("./"));
app.get("/",(req,res) => {
    // res.send("Sadfb");
    res.sendFile(__dirname+"/index.html");
});

app.listen(port,() => {
    console.log("server listening startted");
});


app.post("/createuser",(req,res) => {
    //console.log(req.body);
   var user = new User({
       username: req.body.username
   });
   user.save()
   .then((user) =>{
       console.log(user);
        res.sendFile(__dirname+"/text.html");
        User.find().then((users) => {
            console.log(users);
        })

   })
   .catch(err => {
      res.send("b");
   });
});
