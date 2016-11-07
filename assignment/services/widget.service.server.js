/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app) {


    var widgets = [
        { _id: "123", widgetType: "HEADER", pid: 321, size: 2, text: "GIZMODO"},
        { _id: "234", widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE", pid: 321, width: "100%",
            url: "http://lorempixel.com/400/300/"},
        { _id: "456", widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADER", pid: 321, size: 4, text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE", pid: 321, width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: "789", widgetType: "HTML", pid: 321, text: "<p>Lorem ipsum</p>"}
    ];



    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads/' });


    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pid/widget", sortWidgets)




    function createWidget(req,res){

        var widget=req.body;
        widget._id = (new Date()).getTime();

        widgets.push(widget);
        res.send(widget);
    }

    function findWidgetsByPageId(req,res){
        var params=req.params;
        pageId=params.pid;
        var result = [];
        for (u in widgets)
        {
            if (widgets[u].pid==pageId)
            {
                result.push(widgets[u]);

            }
        }
        res.send(result);
    }

    function findWidgetById(req,res){
        var params=req.params;
        var id=params.wgid;
        var result = {};
        for (u in widgets)
        {
            if (widgets[u]._id==id)
            {
                result=widgets[u];
                break;
            }
        }
        res.send(result);
    }

    function updateWidget(req,res){
        var widget=req.body;
        var id=widget._id;
        for (var u in widgets)
        {
            if (widgets[u]._id==id){
                widgets[u]=widget;
                break;
            }
        }
        res.send(widget);
    }

    function deleteWidget(req,res){
        var wgid = req.params.wgid;
        widgets = widgets.filter(function(item) {
            return item._id != wgid;
        });
        res.send(wgid);
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

        for(w in widgets){
            if(widgets[w]._id == wgid){
                widgets[w].url = "../uploads/" + filename;
                widgets[w].width = width;
                res.redirect("../../assignment/#" + redirectUrl);
                break;
            }
        }

    }

    function sortWidgets(req,res)
    {
        var pid = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
        var afterStart = getIndex(pid,start);
        var afterEnd = getIndex(pid,end);
        widgets.splice(afterEnd, 0, widgets.splice(afterStart,1)[0]);
        res.send('0');
    }

    function getIndex(pid,i){
        indices = [];
        for(var w in widgets){
            if(widgets[w].pid == pid){
                indices.push(w);
            }
        }
        return indices[i];
    }






};