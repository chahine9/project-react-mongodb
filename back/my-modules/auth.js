var sha1 = require('sha1');
var jwt = require('jsonwebtoken');


exports.createUser = function (req,res){
    let stream = [];
    req.on('data',(info)=>{
        stream.push(info);
    }).on('end', async ()=>{
        const body = (JSON.parse(stream.toString()));
        const {MongoClient} = require('mongodb');
        const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        
            
            const doc = {
                username: body.username.trim(),
                password : sha1(body.password),
                email: body.email.trim()
            }; 

            client.db('mygarageapp').collection('users').insertOne(doc).then((response)=>{
                res.send({success:true, message:"user created successfully."})
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            })
 
        });
   
}




exports.authUser = function (req,res){
    let stream = [];
    req.on('data',(info)=>{
        stream.push(info);
    }).on('end', async()=>{
        const body = (JSON.parse(stream.toString()));
        
        const {MongoClient} = require('mongodb');
        const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
            
            const filter = {
                username: body.username,
                password : sha1(body.password)
            }; 

                client.db('mygarageapp').collection('users').findOne(filter).then((response)=>{
                
                if (response != null) {
                    // first we need to install jwt
                    // npm i jsonwebtoken
                    var token = jwt.sign( {  exp: Math.floor(Date.now() / 1000) + (60 * 60),  user : response } , 'secret-key-in-string-fomr');


                    res.send({success:true, message:"connected." , token:token})
                } else {
                    res.send({success:false, message:"wrong username or password."})
                }

            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            })
            
            
           
        });

   
}