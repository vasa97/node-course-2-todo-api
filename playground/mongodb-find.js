// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongo db server");
    }
    console.log("connected to mongo db server");

    // db.collection('Todos').find({
    //     _id: ObjectID('5d29bb5cb5452427ac6f629a')
    // }).toArray().then((docs)=>{
    //     console.log('todos:');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Users').find({name:'Vahid'}).toArray().then((docs)=>{
        console.log('todos:');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });

    // db.close();

});