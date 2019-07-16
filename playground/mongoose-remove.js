const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');


Todo.findByIdAndRemove('5d2d971dfb19715742e90262').then((todo)=>{
    console.log(todo);
});

Todo.findOneAndRemove({_id:"5d2d971dfb19715742e90262"}).then((todo)=>{
    
});