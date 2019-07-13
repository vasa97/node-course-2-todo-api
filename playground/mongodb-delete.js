// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongo db server");
    }
    console.log("connected to mongo db server");
    // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Vahid'}).then((result)=>{
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({_id: ObjectID('5d29bdcb21aa3c365c1079ec')}).then((result)=>{
        console.log(result);
    });
    // db.close();

});