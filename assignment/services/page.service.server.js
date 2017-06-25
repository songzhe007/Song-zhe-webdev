module.exports = function(app){

    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
        {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
        {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"},
    ];

    //POST Calls
    app.post('/assignment/api/website/:websiteId/page',createPage);

    //GET Calls
    app.get('/assignment/api/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/assignment/api/page/:pageId',findPageById);

    //PUT Calls
    app.put('/assignment/api/page/:pageId',updatePage);

    //DELETE Calls
    app.delete('/assignment/api/page/:pageId',deletePage);

    /*API calls implementation*/
    function createPage(req, res) {
        var wid = req.params.websiteId;
        var page = req.body;

        var newPage = {
            _id: new Date().getTime(),
            name: page.name,
            description: page.description,
            websiteId: wid
        };
        pages.push(newPage);

        // res.sendStatus(200);

        if(newPage){
            res.status(200).send(newPage);
        } else {
            res.sendStatus(500);
        }
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var results = [];
        for (p in pages) {
            var page = pages[p];
            if (parseInt(page.websiteId) === parseInt(wid)) {
                results.push(page);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId
        var page = pages.find(function (p) { return p._id==pid });
        if(page) {
            res.send(page);
        }
        else {
            res.status(404).send("not found!");
        }
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pageId;
        for(p in pages) {
            if(pid === pages[p]._id) {
                pages[p] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        for (p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pid)) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};