const express= require("express");
const app = express();
const express_graphql = require("express-graphql")

//graphql
const schema = require('./Schema')
var graphqlResolvers = require('./resolvers/resolver')

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

app.listen("3000" , ()=>{
    console.log("server started")
})