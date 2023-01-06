exports.createNewClient = function(req,res){
    let stream = [];
    req.on('data',(info)=>{
        stream.push(info);
    }).on('end',async ()=>{
        const body = (JSON.parse(stream.toString()));
        
        const {MongoClient} = require('mongodb');
        const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();

            const doc = {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                phone: body.phone,
                cin: body.cin,
                address: body.address
            }; 

            client.db('mygarageapp').collection('clients').insertOne(doc).then((response)=>{
                res.send({success:true, message:"clients inserted successfully."})
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            })
           
        });

}


exports.getAllClients = async function(req,res){

    const {MongoClient} = require('mongodb');
        const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();

        client.db('mygarageapp').collection('clients').find({}).toArray().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send({success:false, message:"Something went wrong, pleaase try again."})
        });
}