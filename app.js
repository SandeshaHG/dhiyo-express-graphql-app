const express = require("express");
const app = express();
const path = require('path')
const express_graphql = require("express-graphql")
const boydParser = require('body-parser')


const multer = require('multer')
var id =null

const PORT = process.env.PORT||5000
app.listen(PORT)
app.use(express.static(__dirname + '/uploads'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


app.post('/uploadjavatpoint',  function (req, res) {
    
    var file_name
    var storage = multer.diskStorage({
        
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            extension = file.mimetype
            filename_id = req.body.name_id
            if(extension == 'image/png') extension = 'png'
            if(extension == 'image/jpg') extension = 'jpg'
            if(extension == 'image/jpeg') extension = 'jpeg'
            file_name = filename_id + "." + extension
            callback(null, file_name);
        }
    });

    var upload = multer({ storage: storage }).single('myfile')
    upload(req, res, function (err) {
        if (err) {
            return res.end('Err');
        }
        return res.json(file_name)
    });
});
//graphql
const schema = require('./Schema')
var graphqlResolvers = require('./resolvers/resolver')

//MongoDB connection 
const mongoose = require("mongoose")
mongoose.connect( process.env.MONGODB_URI ||  'mongodb+srv://c7cmsiRs2cH49shr:c7cmsiRs2cH49shr@cluster0-xav7o.mongodb.net/usersDB?retryWrites=true&w=majority', { useNewUrlParser: true }, (error) => {
    if (!error) {

    }
    else {
        
    }
});

//routing graphql
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('ui/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'ui/build' , 'index.html'))
    })
}

