// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongo db server");
    }
    console.log("connected to mongo db server");
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5d29cd64fb19715742e68f94')
    },{
        $set:{
            completed: true
        }
    },{
        $returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        name: 'shas'
    },{
        $set:{
            name: 'Vahid'
        },
        $inc:{
            age: 1
        }
    },{
        $returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

    // db.close();

});