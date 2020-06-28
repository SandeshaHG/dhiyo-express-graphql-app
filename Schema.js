var {buildSchema} = require('graphql');

var schema= buildSchema(`
type user{
    _id : String!
    name : String!
    email : String!
    userPassword : String!
    imageName : String!
}
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
type auth{
    _id : String!
    email: String!
    name: String!
    imageName : String 
    token : String!
    tokenExpiry: Int!
}
input signUpInput{
    name : String!
    email : String!
    userPassword : String!
}
type allQueries {
    login(email: String! , userPassword : String!) : auth
    forgotPassword(email: String!) : user!

}
type allMutations {
    signUp(userInput : signUpInput! ) : user!
    resetPassword(email : String! , userPassword : String!) : user!
    updateImage(email : String! , imageName : String!) : user!
}

schema {
    query : allQueries
    mutation : allMutations
}
`);

module.exports = schema;
