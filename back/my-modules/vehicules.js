const { ObjectId } = require('mongodb');

exports.addNewVehicule = function(req,res){
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
                mark: body.mark,
                model: body.model,
                dmepc: body.dmepc,
                registration: body.registration,
                color: body.color,
                
                owner: body.owner
            }; 

            client.db('mygarageapp').collection('vehicuels').insertOne(doc).then((response)=>{
                res.send({success:true, message:"vehicule inserted successfully."})
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            })
           
        });
}



exports.getClientVehicules = async function(req,res){
 
        
    const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
            const filter = {
                owner: req.query.owner
            };

 
            client.db('mygarageapp').collection('vehicuels').find(filter).toArray().then((response)=>{
                res.send(response)
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            });

   
}



exports.findVehiculeByID = async function(req,res){
 
        
    const {MongoClient} = require('mongodb');
        const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        
        const filter = {
            _id: ObjectId(req.query.id)
        };


        client.db('mygarageapp').collection('vehicuels').findOne(filter).then((response)=>{
            if (response != null) {
                res.send(response)
            
            } else {
                res.send({ success : false, message:'Vehicule not found' })
            }
        }).catch((err)=>{
            res.send({success:false, message:"Something went wrong, pleaase try again."})
        });
}






exports.addNewIntervention = function(req,res){
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
                price: body.price,
                vehicule: body.vehicule,
                description: body.description,
                operationID: body.operationID
                
            }; 

            client.db('mygarageapp').collection('interventions').insertOne(doc).then((response)=>{
                res.send({success:true, message:"interventions inserted successfully."})
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            })
           
        });
}








exports.getInterventionsListByVehiculeID = async function(req,res){
      
    const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect(); 
            
            const filter = {
                vehicule: req.query.vehicule
            }; 

            client.db('mygarageapp').collection('interventions').find(filter).toArray().then((response)=>{
                res.send(response)
            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong, pleaase try again."})
            });
 
}





exports.getOperationsList = async function(req,res){
      
    const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://rayen:rayen@cluster0.ocut89q.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect(); 

        client.db('mygarageapp').collection('operations').find({}).toArray().then((response)=>{
            res.send(response)
        }).catch((err)=>{
            res.send({success:false, message:"Something went wrong, pleaase try again."})
        });

}
