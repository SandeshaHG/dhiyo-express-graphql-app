const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const users = require('./../models/user.model');

module.exports = {
    login :  async (args) => {
        
        const user = await users.findOne({
            email : args.email
        })
            if(!user){
                throw new Error('User does not exist')
            }
            var checkIfEqual = await  bcrypt.compare(args.userPassword,user.userPassword)
            if(!checkIfEqual){
                throw new Error('Incorrect Password')
            }

            const token = jwt.sign({usrName : user.email},'confidential',{expiresIn:'1h'})

            const auth = {
                email : user.email,
                name : user.name,
                token : token,
                tokenExpiry : 1
            }
            return auth
        }
    
            
    
}