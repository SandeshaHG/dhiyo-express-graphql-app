const connection = require("./models");
const express= require("express");

app.get("/",(req,res)=>{
    res.send("<h1>It works!!</h1>")
})

app.listen("3000" , ()=>{
    console.log("server started")
})