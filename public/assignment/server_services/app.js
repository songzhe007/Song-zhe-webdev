
module.exports = function(app){


    /*  app.get('/api/user/:uid', function (req, res) {
     var uid = req.params.uid;
     console.log("get uri");
     res.sendStatus(200);
     });
     */
    require("./user.service.server.js")(app);
    require("./website.service.server.js")(app);
    require("./page.service.server.js")(app);
    require("./widget.service.server.js")(app);
};
