var {buildSchema} = require('graphql');
const { ApolloServer, gql } = require('apollo-server');

var schema= buildSchema(`
scalar Upload
type user{
    name : String!
    email : String!
    userPassword : String!
}
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
type auth{
    email: String!
    name: String!
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
    upload(email : String! , file : Upload!) : File!
    resetPassword(email : String! , userPassword : String!) : user!
}

schema {
    query : allQueries
    mutation : allMutations
}
`);

module.exports = schema;
