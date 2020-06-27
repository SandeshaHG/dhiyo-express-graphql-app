const node_mailer = require('nodemailer')

const transporter = node_mailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'sandeshhg1997@gmail.com',
        pass : 'Sandy.kewlyo4'
    }
})
 
const users = require('./../models/user.model')



module.exports = {
    forgotPassword: (args) =>{

        return users.findOne({
            email : args.email
        })
        .then(user => {
            if(!user){
                throw new Error('email does not exist ');
            }
            var body = {
                from : 'sandeshhg1997@gmail.com',
                subject : 'Reset Password' ,
                to : args.email,
                html : `
                <p>Hey there</p>
                <p>Please click on the link below to reset your password</p>
                <a href="http://localhost:3000/reset_password" >Reset Your Password</a> 
                    `
            }
             transporter.sendMail(body,(err,result) =>{
                if(err){
                    console.log(err)
                }else{
                    console.log("sent")
                }
             })
             return user.save()
        })
        .catch((err)=>{
             throw err;
        })
        
        
          
        
}
}