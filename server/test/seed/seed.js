const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: userOneId,
    text: "first test todo"
}, {
    _id: new ObjectID(),
    text: "second test todo",
    completed:true,
    completedAt:122314213
}];

const users = [{
    _id: userOneId,
    email: 'vahid@gmail.com',
    password: 'password1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId,access: 'auth'},'pokerface123').toString()
    }]
},{
    _id:userTwoId,
    email: 'safari@gmail.com',
    password: 'password2'
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
};

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1,user2]);
    }).then(()=>{done()});
};

module.exports = {todos,populateTodos,users,populateUsers};