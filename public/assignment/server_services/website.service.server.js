
/*var websites = require("./websites.mock.json");*/

module.exports = function(app){

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
        {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
        {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
        {_id: "890", name: "Go", developerId: "123", desc: "Test02"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
        {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
        {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
    ];

    //POST Calls
    app.post('/assignment/api/user/:userId/website',createWebsite);

    //GET Calls
    app.get('/assignment/api/user/:userId/website',findAllWebsitesForUser);
    app.get('/assignment/api/website/:websiteId',findWebsiteById);

    //PUT Calls
    app.put('/assignment/api/website/:websiteId',updateWebsite);

    //DELETE Calls
    app.delete('/assignment/api/website/:websiteId',deleteWebsite);


    /*API calls implementation*/
    function createWebsite(req, res) {
        var uid = req.params.userId;
        var website = req.body;

        var newWebsite = {
            _id: new Date().getTime(),
            name: website.name,
            description: website.description,
            developerId: uid
        };
        websites.push(newWebsite);

        if(newWebsite){
            res.status(200).send(newWebsite);
        } else {
            res.sendStatus(500);
        }
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var results = [];
        for (w in websites) {
            var website = websites[w];
            if (parseInt(website.developerId) === parseInt(uid)) {
                results.push(website);
            }
        }
        res.send(results);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId
        var website = websites.find(function (w) { return w._id==wid });
        if(website) {
            res.send(website);
        }
        else {
            res.status(404).send("not found!");
        }
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.websiteId;
        for (w in websites) {
            if (wid === websites[w]._id) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for (w in websites) {
            if (parseInt(websites[w]._id) === parseInt(wid)) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};