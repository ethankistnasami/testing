import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

function User (name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
}




app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render(__dirname + "/partials/index.ejs");
    
})

var user;

app.post("/sign-in", (req, res) => {

    user = new User(req.body.userName, req.body.userPassword, req.body.userEmail);

    console.log(req.body);
    console.log(user.name, user.password, user.email);

    res.render(__dirname + "/partials/sign-in.ejs");
}) 


app.post("/submit", (req, res) => {
    

    /*
    console.log(req.body);
    console.log(user.name, user.password, user.email);

    user = new User(req.body.userName, req.body.userPassword, req.body.userEmail);
    res.render(__dirname + "/partials/home.ejs", {userDetails: user} ); */

    if (user.email == req.body.floatingEmail && user.password == req.body.floatingPassword) {
        res.render(__dirname + "/partials/home.ejs", {userDetails: user} );
    } else {
        res.render(__dirname + "/partials/sign-in.ejs");
        }
    
})

/*app.post("/home-page", (req, res) => {

    if (user.email == req.body.userEmail && user.password == req.body.userPassword) {
        res.render(__dirname + "/partials/home.ejs", {userDetails: user} );
    } else {
        res.render(__dirname + "sign in page", {data: value} );
        }
    
}) */

var postStorage = [];

app.post("/make-post", (req, res) => {

    console.log("index is: " + postStorage.indexOf(req.body.usertxt));
    console.log(req.body);

    postStorage.push(req.body.usertxt);
    res.render(__dirname + "/partials/home.ejs", {userPost: postStorage, userDetails: user});
})


// ROUTE FOR DELETING POSTS
app.post("/delete-post", (req, res) => {

    postStorage.splice(req.body.postIndex, 1);
    console.log("Index is " + postStorage.indexOf(String(req.body.usertxt).trim()));
    console.log("my new function of postindex is " + req.body.postIndex);
    console.log(typeof req.body.usertxt);
    res.render(__dirname + "/partials/home.ejs", {userPost: postStorage, userDetails: user});
    console.log(postStorage);

}) 


app.listen(port, () => {
    console.log("Server is running...");
})