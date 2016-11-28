/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app,model) {

    // var users = [
    //
    // {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    // {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    // {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    // {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    //
    // ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);



function findUser(req,res){
    var params = req.params;
    var query = req.query;
    if(query.password && query.username) {
        findUserByCredentials(req, res);
    } else if(query.username) {
        findUserByUsername(req, res);
    }
}


function findUserByUsername(req,res)
{
    var username = req.query.username;
    model
        .userModel
        .findUserByUsername(username)
        .then(
            function(user){
                if(user){
                    res.json(user);
                }
                else {
                    res.send('0');
                }
            }
        );


}

function findUserByCredentials(req,res)
{
    var username = req.query.username;
    var password = req.query.password;
    model
        .userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}



function findUserById(req,res)
{
    var userId = req.params.uid;
    model
        .userModel
        .findUserById(userId)
        .then(
            function (user) {
                if(user) {
                    res.send(user);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        )
}



function createUser(req,res){
    var user = req.body;
    console.log(user);
    // user._id = (new Date()).getTime();
    // users.push(user);


    model
        .userModel
        .createUser(user)
        .then(
            function(newUser) {
                res.send(newUser);
            },

            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}

function updateUser(req,res){
    var user = req.body;
    var uid = req.params.uid;
    console.log(uid);

    model
        .userModel
        .updateUser(uid, user)
        .then(
            function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}

function deleteUser(req,res)
{
    var uid=req.params.uid;
    model.userModel.removeUser(uid).then(function(user){res.send(user);});
}

};