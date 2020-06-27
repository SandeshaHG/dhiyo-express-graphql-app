const users = require('./../models/user.model')
const bcrypt = require('bcryptjs')

module.exports = {
    resetPassword :  (args) => {
        console.log(args)
        return  users.findOne({
            email : args.email
        })
        .then(user => {
            if(!user){
                throw new Error('User does not exist');
            }

            bcrypt.hash(args.userPassword,12, (err,hash) => {
                user.userPassword = hash 
                user.save()
            });
            return user

        }).catch(err => {
            throw err;
        })
   

    }  
}
