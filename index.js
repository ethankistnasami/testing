import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";



const app = express();
//const port = 3000;
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

function User (name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
}




app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index");
    
})

var user;

app.post("/sign-in", (req, res) => {

    user = new User(req.body.userName, req.body.userPassword, req.body.userEmail);

    console.log(req.body);
    console.log(user.name, user.password, user.email);

    res.render("sign-in");
}) 


app.post("/submit", (req, res) => {

    if (user.email == req.body.floatingEmail && user.password == req.body.floatingPassword) {
        res.render(__dirname + "/partials/home.ejs", {userDetails: user} );
    } else {
        res.render("sign-in");
        }
    
})


var postStorage = [];

app.post("/make-post", (req, res) => {

    console.log("index is: " + postStorage.indexOf(req.body.usertxt));
    console.log(req.body);

    postStorage.push(req.body.usertxt);
    res.render("home", {userPost: postStorage, userDetails: user});
})


// ROUTE FOR DELETING POSTS
app.post("/delete-post", (req, res) => {

    postStorage.splice(req.body.postIndex, 1);
    console.log("Index is " + postStorage.indexOf(String(req.body.usertxt).trim()));
    console.log("my new function of postindex is " + req.body.postIndex);
    console.log(typeof req.body.usertxt);
    res.render("home", {userPost: postStorage, userDetails: user});
    console.log(postStorage);

}) 


app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

