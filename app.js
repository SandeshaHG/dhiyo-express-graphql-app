const express= require("express");
const app = express();
const express_graphql = require("express-graphql")
var {buildSchema} = require('graphql')

const mongoose= require("mongoose")
mongoose.connect(`mongodb+srv://c7cmsiRs2cH49shr:c7cmsiRs2cH49shr@cluster0-xav7o.mongodb.net/usersDB?retryWrites=true&w=majority`,{useNewUrlParser: true } ,(error) =>{
    if(!error){
        console.log("success");
    }
    else{
        console.log(error)
    }
});


var schema= buildSchema(`

type user{
    name : String!
    userName : String!
    userPassword : String!
}
input userInput{
    name : String!
    userName : String!
    userPassword : String!
}
type showUsers {
    users : [user!]!
}
type signup {
    create(userInput : userInput) : user
}

schema {
    query : showUsers
    mutation : signup
}
`);
app.use('/graphql',express_graphql({
    schema : schema,
    rootValue: root,
    graphiql:true
}));
const users = require("./models/user.model")
var root= {
    users: () => {
        return users.find()
    },
    create: (args) =>{
        
        const newUser = new users({
            name : args.userInput.name,
            userName : args.userInput.userName,
            userPassword : args.userInput.userPassword
        });
        return newUser.save()
         

    }  
};
app.get("/",(req,res)=>{
    res.send("<h1>It works!!</h1>")
})

app.listen("3000" , ()=>{
    console.log("server started")
})