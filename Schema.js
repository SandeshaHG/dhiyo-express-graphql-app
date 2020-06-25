var {buildSchema} = require('graphql');
const { ApolloServer, gql } = require('apollo-server');

var schema= buildSchema(`
scalar Upload
type user{
    name : String!
    userName : String!
    userPassword : String!
}
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
type auth{
    userName: String!
    token : String!
    tokenExpiry: Int!
}
input signUpInput{
    name : String!
    userName : String!
    userPassword : String!
}
type allQueries {
    login(userName: String! , userPassword : String!) : auth
    forgotPassword(userName: String!) : String!

}
type allMutations {
    signUp(userInput : signUpInput) : user
    upload(userName : String! , file : Upload!) : File!
    resetPassword(userName : String! , userPassword : String!) : String!
}

schema {
    query : allQueries
    mutation : allMutations
}
`);

module.exports = schema;
