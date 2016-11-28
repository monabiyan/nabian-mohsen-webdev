/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app,model) {


    // var websites = [
    //
    //     { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
    //     { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
    //     { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
    //     { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    //     { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    //     { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
    //
    // ];



    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);




    function createWebsite(req,res)
    {
        var website=req.body;
        var userId=req.params.uid;
        model.websiteModel.createWebsiteForUser(userId, website).then(function(website){res.json(website)});
    }

    function findWebsitesByUser(req,res)
    {
        var userId=req.params.uid;
        model.websiteModel.findAllWebsitesForUser(userId).then(function(websites){
            console.log('hh');
            console.log(websites);
            console.log('gg');
            res.send(websites);});

    }

    function findWebsiteById(req,res)
    {
        var wid = req.params.wid;

        model.websiteModel.findWebsiteById(wid)
            .then(function(websites){
                    res.send(websites);
                },
                function(){
                    res.sendStatus(400).send(error);
                });

    }

    function updateWebsite(req,res)
    {
        var website=req.body;
        var websiteId=website._id;
        model.websiteModel.updateWebsite(websiteId, website).then(function(website){res.json(website);});
    }

    function deleteWebsite(req,res)
    {
        var wid = req.params.wid;
        model.websiteModel.deleteWebsite(wid).then(function(website){res.json(website);});
    }

};
