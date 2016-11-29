/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app,model) {


    // var widgets = [
    //     { _id: "123", widgetType: "HEADER", pid: 321, size: 2, text: "GIZMODO"},
    //     { _id: "234", widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
    //     { _id: "345", widgetType: "IMAGE", pid: 321, width: "100%",
    //         url: "http://lorempixel.com/400/300/"},
    //     { _id: "456", widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"},
    //     { _id: "567", widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
    //     { _id: "678", widgetType: "YOUTUBE", pid: 321, width: "100%",
    //         url: "https://youtu.be/AM2Ivdi9c4E" },
    //     { _id: "789", widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"}
    // ];



    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads/' });


    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage),
    app.put("/api/page/:pid/widget", sortWidgets);




    function createWidget(req,res)
    {
        var widget=req.body;
        var pageId=req.params.pid;
        console.log(widget);
        model.widgetModel.createWidget(pageId, widget).then(function(widget){res.json(widget);});
    }

    function findWidgetsByPageId(req,res){
        var pageId=req.params.pid;
        console.log(pageId);
        model.widgetModel.findAllWidgetsForPage(pageId).then(function(PageObj){res.send(PageObj.widgets);});

    }

    function findWidgetById(req,res){
        var widgetId=req.params.wgid;
        model.widgetModel.findWidgetById(widgetId).then(function(widget){res.json(widget);});
    }

    function updateWidget(req,res){
        var widget=req.body;
        var widgetId=widget._id;
        model.widgetModel.updateWidget(widgetId, widget).then(function(widget){res.json(widget);});

    }

    function deleteWidget(req,res){
        var wgid = req.params.wgid;
        model.widgetModel.deleteWidget(wgid).then(function(widget){res.json(widget);});
    }


    function uploadImage(req,res) {

        var wgid          = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var redirectUrl   = req.body.redirectUrl;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model.widgetModel
            .findWidgetById(wgid)
            .then(
                function(widget){
                    widget.url = "../uploads/" + filename;
                    widget.width = width;
                    widget.size = size;
                    model.widgetModel
                        .updateWidget(wgid, widget)
                        .then(
                            function(){
                                res.redirect("../../assignment/#" + redirectUrl);
                            },
                            function(err){
                                console.log(err)
                            }
                        )
                },
                function(err){
                    console.log(err);
                });

    }

    function sortWidgets(req,res){
        var pid = req.params.pid;
        var initial = req.query.intial;
        var final = req.query.final;
        model.pageModel.findPageById(pid)
            .then(
                function(page){
                    page.widgets.splice(final, 0, page.widgets.splice(initial,1)[0]);
                    model.pageModel.updatePage(pid,page)
                        .then(
                            function(page){
                                res.sendStatus(200);
                            },
                            function(error){
                                console.log(error);
                                res.sendStatus(400).send(error);
                            }
                        )
                },
                function(err){
                    console.log(error);
                    res.sendStatus(400).send(error);
                })
    }

    function getIndexOf(pid,i){
        indices = [];
        for(var w in widgets){
            if(widgets[w].pid == pid){
                indices.push(w);
            }
        }
        return indices[i];
    }

};