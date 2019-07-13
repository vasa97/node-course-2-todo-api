// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to mongo db server");
    }
    console.log("connected to mongo db server");

    /* db.collection('Todos').insertOne({
         text: 'Something to do',
         Completed: false,
     },(err,result)=>{
         if(err){
             return console.log("Unable to insert todo", err);
         }
         console.log(JSON.stringify(result.ops,undefined,2));
     });*/

    //  db.collection('Users').insertOne({
    //      name: 'Vahid',
    //      age: 21,
    //      location: 'Mashhad'
    //  },(err,result)=>{
    //      if(err){
    //          return console.log('Unable to insert user');
    //      }
    //      console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));

    //  });

    db.close();

});