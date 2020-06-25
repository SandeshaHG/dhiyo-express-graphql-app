const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const users = require('./../models/user.model');

module.exports = {
    signup: (args) =>{
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