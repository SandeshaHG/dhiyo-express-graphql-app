const forget_password = require('./forgot_password')
const reset_password = require('./reset_password')
const upload_file = require('./upload_file')
const sign_up = require('./sign_up')
const login = require('./login')
const update_image = require('./update_image')
module.exports = {
    
    ... forget_password,
    ... reset_password,
    ... upload_file,
    ... sign_up,
    ... login,
    ... update_image

 
};