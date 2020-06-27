const express= require("express");
const app = express();
const express_graphql = require("express-graphql")

//graphql
const schema = require('./Schema')
var graphqlResolvers = require('./resolvers/resolver')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
//MongoDB connection 
const mongoose= require("mongoose")
mongoose.connect(`mongodb+srv://c7cmsiRs2cH49shr:c7cmsiRs2cH49shr@cluster0-xav7o.mongodb.net/usersDB?retryWrites=true&w=majority`,{useNewUrlParser: true } ,(error) =>{
    if(!error){
    
    //routing graphql
    app.use('/graphql',express_graphql({
        schema : schema,
        rootValue: graphqlResolvers,
        graphiql:true
    }));

    }
    else{
        console.log(error)
    }
});

//Init
app.get("/",(req,res)=>{
    res.send("<h1>It works!!</h1>")
})

app.listen("5000" , ()=>{
    console.log("server started")
})