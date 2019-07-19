const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todo)=>{
                    expect(todo.length).toBe(1);
                    expect(todo[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not create todo with unvalid data',(done)=>{
        
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            })
    });
});

describe('GET /todos',()=>{

    it('should get all todos',(done)=>{

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});


describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id',()=>{
    it('should remove a todo',(done)=>{
        var id = todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(id);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.findById(id).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=>done(e));
            })
    });
    
    it('should return a 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);    
    });

    it('should return 404 if object id is invalid',(done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id',()=>{

    it('should update the todo',(done)=>{
        var id = todos[0]._id.toHexString();
        var text =  "updated first test todo";
        var completed = true;

        request(app)
            .patch(`/todos/${id}`)
            .send({text,completed})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toNotBe(todos[0].text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done)
    });
    it('should clear completedAt when todo is not completed',(done)=>{
        var id = todos[1]._id.toHexString();
        var body = {
            text: "updated second test todo",
            completed:false
        };
        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toNotBe(todos[1].text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});



describe('GET /users/me',()=>{
    it('should return user if authenticated',(done)=>{
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated',(done)=>{
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res)=>{
                expect(res.body).toEqual({});
            })
            .end(done)
    });
});

describe('POST /users',()=>{
    it('should create a user',(done)=>{
        var email = 'example@gmail.com';
        var password = '3254347';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err)=>{
                if(err){
                    return done(err);
                }
                User.findOne({email}).then((user)=>{
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            })
    });

    it('should return validation errors if request is invalid',(done)=>{
        var email = 'ar';
        var password = '12';
        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);
    });
    it('should not create a user if email is in use',(done)=>{
        var email = users[0].email;
        var password = users[0].password;
        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done);
    });
});