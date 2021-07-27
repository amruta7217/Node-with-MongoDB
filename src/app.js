const express = require("express");
const connection = require("./db/connection")
const bodyParser = require("body-parser");

const app = express();
// app.use(express.json())

const port = process.env.Port || 8080
const user = require("./models/Users")

app.use(bodyParser.json());

app.use(
  bodyParser.json({
    limit: "1gb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "1gb",
    extended: true,
  })
);

app.use(function (req, res, next) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": true,
    };
  
    res.header(headers);
  
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.post("/login",(req,res) => {
    // const data = new user(req.body.email)
    console.log("-------------",req.body)
    user.find(req.body).then((user)=>{
        if(user.length < 1){
            return res.status(401).json({
                msg: "User does not exist"
            })
        }else{
            return res.status(200).json({
                msg: "User exist",
                data:user
            })
        }
    }).catch((e)=>{
        res.status(400).send(e)        
    })
})
app.post("/register",(req,res) => {
    console.log("-------------",req.body)
    const data = new user(req.body)
    data.save().then(()=>{
        res.status(200).send(data)
    }).catch((e)=>{
        res.status(400).send(e)        
    })
})

app.listen(port,() => {
    console.log(`Connection is set up ${port}`)
})