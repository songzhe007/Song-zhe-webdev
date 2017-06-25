module.exports = function(app){

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var widgets = [
        {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO-heading"},
        {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum-heading"},
        {_id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
        {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum-html</p>"},
        {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum-heading"},
        {_id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://www.youtube.com/embed/ECBFjbNHlOI"},
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum-html</p>"}
    ];

    //POST Calls
    // app.post ("/api/upload", upload.single('file'), uploadImage);
    //
    app.post('/assignment/api/page/:pageId/widget',createWidget);

    //GET Calls
    app.get('/assignment/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/assignment/api/widget/:widgetId',findWidgetById);

    //PUT Calls
    app.put('/assignment/api/widget/:widgetId',updateWidget);

    //DELETE Calls
    // app.delete('/assignment/api/widget/:widgetId',deleteWidget);



    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var file = req.file;

        var uploadDetails = {
            originalname : file.originalname,
            filename : file.filename,
            fullpath : file.path,
            destination : file.destination,
            size : file.size,
            mimetype : file.mimetype
        };

        res.send(uploadDetails);
    }

    function createWidget(req, res) {
        var pid = req.params.pageId;
        var widget = req.body;

        var newWidget = {
            _id: new Date().getTime(),
            widgetType: widget.name,
            pageId: pid,
            size: widget.size,
            name: widget.name,
            text: widget.text
        };
        widgets.push(newWidget);

        if(newWidget){
            res.status(200).send(newWidget);
        } else {
            res.sendStatus(500);
        }
    }
    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var results = [];
        for (wi in widgets) {
            var widget = widgets[wi];
            if (parseInt(widget.pageId) === parseInt(pid)) {
                results.push(widget);
            }
        }
        res.send(results);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.widgetId
        var widget = widgets.find(function (wi) { return wi._id==wgid });
        if(widget) {
            res.send(widget);
        }
        else {
            res.status(404).send("not found!");
        }
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.widgetId;
        for(wi in widgets) {
            if(wgid === widgets[wi]._id) {
                widgets[wi] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};