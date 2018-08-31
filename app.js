var express = require('express');
var app = express();
const port = 3000;

//Body-parser .......................
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//mongoDB Connection .........................
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/harincastle", { useNewUrlParser: true }).then(() => {
    console.log("connection sucessfull");
}).catch((err) => {
    console.log("Connection failed");
});

//Schema ........................................
var UsernameSchema = new mongoose.Schema({
    username: String
});
var User = mongoose.model("User", UsernameSchema);

//endpoint ......................................
app.use("/", express.static("./"));
app.get("/", (req, res) => {
    // res.send("Sadfb");
    res.sendFile(__dirname + "/index.html");
});
app.listen(port, () => {
    console.log("server listening startted");
});

//Create User endpoint ...................................
app.post("/createuser", (req, res) => {
    var user = new User({
        username: req.body.username
    });
    user.save()
        .then((user) => {
            res.sendFile(__dirname + "/text.html");
        })
        .catch(err => {
            res.send("b");
        });
});
