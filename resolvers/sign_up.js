const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const users = require('./../models/user.model');

module.exports = {
    signUp: (args) =>{

        
        return users.findOne({
            email : args.userInput.email
        })
        .then(user => {
            if(user){
                throw new Error('email already present');
            }

            return bcrypt.hash(args.userInput.userPassword,12)
        })
        .then(hashedPassword =>{
            
            const newUser = new users({
                name : args.userInput.name,
                email : args.userInput.email,
                userPassword : hashedPassword,
                imageName : null
                
            });
            
            return newUser.save()
        }).catch(err => {
            throw err;
        })
   

    }  
};