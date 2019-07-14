const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');
// var id = "57d2b3dafa3a6bd4c243caea3";

// if(!ObjectID.isValid(id))
//     console.log('ID not valid!');
// Todo.find({
//     _id: id 
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id 
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('ID not found!');
//     }
//     console.log('Todo by id',todo);
// }).catch((e)=> console.log(e));

User.findById("5d2b4796fb19715742e7896b").then((user)=>{
    if(!user){
        return console.log('User not found!');
    }
    console.log('founded user: ',user);
}).catch((e)=> console.log(e));