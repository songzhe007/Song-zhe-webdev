module.exports = function(app){

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../uploads' });

    var widgets = [
        {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO-heading"},
        {_id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum-heading"},
        {_id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
        {_id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum-html</p>"},
        {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum-heading"},
        {_id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://www.youtube.com/embed/ECBFjbNHlOI"},
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum-html</p>"},
        {_id: "110", widgetType: "TEXT", pageId: "321", text: "<p>text</p>"}
    ];

    //POST Calls
    app.post ("/assignment/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/assignment/page/:pageId/widget/order', reOrderWidget);
    app.post('/api/assignment/page/:pageId/widget/order', sortWidget);
    //
    app.post('/assignment/api/page/:pageId/widget',createWidget);

    //GET Calls
    app.get('/assignment/api/page/:pageId/widget',findAllWidgetsForPage);
    app.get('/assignment/api/widget/:widgetId',findWidgetById);

    //PUT Calls
    app.put('/assignment/api/widget/:widgetId',updateWidget);

    //DELETE Calls
    app.delete('/assignment/api/widget/:widgetId',deleteWidget);

    function reOrderWidget(req, res){
        const pageId = req.params['pageId'];
        const newOrder = req.body.elems;
        for(var i in newOrder){
            for(var j in widgets){
                if(widgets[j]._id == newOrder[i]){
                    widgets[j].index = i;
                }
            }
        }

        res.sendStatus(200);
    }

    function sortWidget(req, res) {
        var pageId = req.param.pid;
        var pageWidgets = [];
        for(w in widgets) {
            var widget = widgets[w];
            if(parseInt(widget.pageId) === parseInt(pageId)) {
                pageWidgets.push(widget);
            }
        }

        var index1 = req.query.start;
        var index2 = req.query.end;

        var start = widgets.indexOf(pageWidgets[index1]);
        var end = widgets.indexOf(pageWidgets[index2]);

        if(index1 && index2) {
            widgets.slice(end, 0, widgets.slice(start, 1)[0]);
            res.sendStatus(200);
            return;
        }
        res.status(404).send("Cannot reorder widgets");
    }



    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.widgetId;
        for(wi in widgets) {
            if(wgid === widgets[wi]._id) {
                widgets[wi].size = widget.size;
                widgets[wi].text = widget.text;
                widgets[wi].width = widget.width;
                widgets[wi].url = widget.url;

                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function uploadImage(req, res) {
        var userId      = req.body.userId;
        var websiteId   = req.body.websiteId;
        var pageId       = req.body.pageId;

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log(myFile);

        var widget = widgets.find(function (wi) { return wi._id==widgetId });
                if(!widget) {
                        widget = {
                                _id: new Date().getTime(),
                                widgetType: 'IMAGE',
                                pageId: pageId,
                                size: size,
                                name: '',
                                text: '',
                                width: width,
                            };
                        widgets.push(widget);
                    }
                widget.url = '/uploads/'+filename;

                var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);
    }

    function createWidget(req, res) {
        var pid = req.params.pageId;
        var widget = req.body;

        var newWidget = {
            _id: new Date().getTime(),
            widgetType: widget.widgetType,
            pageId: pid,
            size: widget.size,
            name: widget.name,
            text: widget.text,
            size: widget.size,
            width: widget.width,
            url: widget.url
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
        var wgid = req.params.widgetId;
        var widget = widgets.find(function (wi) { return wi._id==wgid });
        if(widget) {
            res.send(widget);
        }
        else {
            res.status(404).send("not found!");
        }
    }


    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        for (wi in widgets) {
            if (parseInt(widgets[wi]._id) === parseInt(wgid)) {
                widgets.splice(wi, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};