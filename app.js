const express= require("express");
const app = express();
const express_graphql = require("express-graphql")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var {buildSchema} = require('graphql')



//MongoDB connection 
const mongoose= require("mongoose")
mongoose.connect(`mongodb+srv://c7cmsiRs2cH49shr:c7cmsiRs2cH49shr@cluster0-xav7o.mongodb.net/usersDB?retryWrites=true&w=majority`,{useNewUrlParser: true } ,(error) =>{
    if(!error){
        console.log("success");
    }
    else{
        console.log(error)
    }
});


//GraphQL Schema
var schema= buildSchema(`

type user{
    name : String!
    userName : String!
    userPassword : String!
}
type auth{
    userName: String!
    token : String!
    tokenExpiry: Int!
}
input userInput{
    name : String!
    userName : String!
    userPassword : String!
}
type showUsers {
    users : [user!]!
    login(userName: String! , userPassword : String!) : auth
}
type signup {
    create(userInput : userInput) : user
}

schema {
    query : showUsers
    mutation : signup
}
`);


//get the Users model
const users = require("./models/user.model")
var root= {
    
    users: () => {
        return users.find()
    },
    login : async (args) => {
        const user = await users.findOne({
            userName : args.userName
        })
            if(!user){
                throw new Error('User does not exist')
            }
            var checkIfEqual = await bcrypt.compare(args.userPassword,user.userPassword)
            if(!checkIfEqual){
                throw new Error('Incorrect Password')
            }

            const token = jwt.sign({usrName : user.userName},'confidential',{expiresIn:'1h'})

            const auth = {
                userName : user.userName,
                token : token,
                tokenExpiry : 1
            }
            return auth
            
       
    },
    create: (args) =>{
        return users.findOne({
            userName : args.userInput.userName
        })
        .then(user => {
            if(user){
                throw new Error('username already present');
            }

            return bcrypt.hash(args.userInput.userPassword,12)
        })
        .then(hashedPassword =>{
            
            const newUser = new users({
                name : args.userInput.name,
                userName : args.userInput.userName,
                userPassword : hashedPassword
            });
            return newUser.save()
        }).catch(err => {
            throw err;
        })
   

    }  
};

//routing graphql
app.use('/graphql',express_graphql({
    schema : schema,
    rootValue: root,
    graphiql:true
}));


//Init
app.get("/",(req,res)=>{
    res.send("<h1>It works!!</h1>")
})

app.listen("3000" , ()=>{
    console.log("server started")
})