/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app) {

    var users = [

    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }

    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);



function findUser(req,res){

    var params=req.params;
    var query=req.query;
    if (query.password && query.username)
    {
        findUserByCredentials(req,res);
    }
    else if(query.username)
    {
        findUserByUsername(req,res);
    }
}


function findUserByUsername(req,res)
{
    var result='0';
    var username =req.query.username;
    for (var u in users)
    {
        if (users[u].username==username)
        {
            result=users[u];
            break;

        }

    }
    res.send(result);
}

function findUserByCredentials(req,res)
{
    var username =req.query.username;
    var password=req.query.password;
    var result='0';
    for (var u in users)
    {
        if (users[u].username==username && users[u].password==password)
        {
            result=(users[u]);
            break;
        }
    }
    res.send(result);
}



function findUserById(req,res)
{
    var params=req.params;
    userId=params.uid;
    result='0';
    for (var u in users)
    {
        if (users[u]._id==userId)
        {
            result=users[u];
            break;
        }
    }
    res.send(result);
}



function createUser(req,res){
    var user=req.body;
    user._id = (new Date()).getTime();
    users.push(user);
    res.send(user);
}

function updateUser(req,res){
    var user=req.body;
    uid=user._id;
    var result='0';
    for(var u in users)
    {
        if(users[u]._id == uid)
        {
            users[u] = user;
            result=user;
            break;
        }

    }
    res.send(result);
}

function deleteUser(req,res){
    var uid=req.params.uid;
    users = users.filter(function(item) {
        return item._id !== uid;
    });
    res.send('deleted')
}

};