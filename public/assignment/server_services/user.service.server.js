/*var users = require("./users.mock.json");*/

module.exports = function(app){

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:""},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:''},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia",email:""},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi",email:""}
    ];

    // GET Calls.
    app.get('/assignment/api/user?username=username', findUserByUsername);
    app.get('/assignment/api/user', findUserByCredentials);
    app.get('/assignment/api/user/:uid', findUserById);

    // POST Calls.
    app.post('/assignment/api/user', createUsers);

    // PUT Calls.
    app.put('/assignment/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/assignment/api/user/:uid', deleteUser);

    /*API implementation*/
    function createUsers(req, res) {
        var user = req.body;

        var newUser = {
            _id: new Date().getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email

        };
        users.push(newUser);

        if(newUser){
            res.status(200).send(newUser);
        } else {
            res.sendStatus(500);
        }
    }

    function findUserByUsername (req, res) {
        var username = req.query.username;

        for (u in users){
            var user = users[u];
            if(user.username === username){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var pswd = req.query.password;

        var user = users.find(function (u) { return u.username==username && u.password==pswd  });
        res.send(user);
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        var user = users.find(function (u) { return u._id==uid });
        if(user) {
            res.send(user);
        }
        else {
            res.status(404).send("not found!");
        }
    }

    function updateUser(req,res) {
        var user = req.body;
        var uid = req.params.uid;
        for (u in users) {
            if (uid === users[u]._id) {
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].email= user.email;

                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404).send("not found!");
    }

    function deleteUser(req,res) {
        var uid = req.params.uid;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }
};