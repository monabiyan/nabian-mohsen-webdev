/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app) {


    var websites = [

        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }

    ];



    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);




    function createWebsite(req,res)
    {
        var website=req.body;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.send(website);
    }


    function findWebsitesByUser(req,res)
    {
        var params=req.params;
        var userId=params.uid;
        var result = [];
        for (u in websites)
        {
            if (websites[u].developerId==userId)
            {
                result.push(websites[u]);

            }
        }
        res.send(result);

    }
    function findWebsiteById(req,res)
    {

        var params=req.params;
        var webId=params.wid;
        var result = {};
        for (var u in websites)
        {
            if (websites[u]._id==webId)
            {
                result=websites[u];
                break;
            }
        }
        res.send(result);
    }
    function updateWebsite(req,res){
        var website=req.body;
        var id=website._id;
        for (u in websites){
            if (websites[u]._id==id)
            {
                websites[u] =website;
            }
        }
        res.send(website);
    }

    function deleteWebsite(req,res){
        var wid = req.params.wid;
        websites = websites.filter(function(item) {
            return item._id != wid;
        });
        res.send("0");
    }


};
