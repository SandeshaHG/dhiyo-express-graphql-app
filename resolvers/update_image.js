const users = require('../models/user.model')

module.exports = {
    updateImage :  (args) => {
        
        return  users.findOne({
            email : args.email
        })
        .then(user => {
            if(!user){
                throw new Error('User does not exist');
            }

            user.imageName = args.imageName
            return user.save()

        }).catch(err => {
            throw err;
        })
   

    }  
}
