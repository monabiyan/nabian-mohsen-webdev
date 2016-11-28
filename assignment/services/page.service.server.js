/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app,model) {

    // var pages = [
    //     { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
    //     { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
    //     { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
    // ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req,res)
    {
        var page=req.body;
        var websiteId=req.params.wid;
        model.pageModel.createPage(websiteId, page).then(function(page){res.json(page);});
    }

    function findPagesByWebsiteId(req,res)
    {
        var websiteId=req.params.wid;
        model.pageModel.findAllPagesForWebsite(websiteId).then(function(websiteObj){
            console.log(websiteObj.pages);
            res.send(websiteObj.pages);});
    }

    function findPageById(req,res)
    {
        var pageId=req.params.pid;
        model.pageModel.findPageById(pageId).then(function(page){res.json(page);});
    }

    function updatePage(req,res)
    {
        var page=req.body;
        var pageId=page._id;
        model.pageModel.updatePage(pageId, page).then(function(page){res.json(page);});
    }

    function deletePage(req,res)
    {
        var pageId=req.params.pid;
        model.pageModel.deletePage(pageId).then(function(page){res.json(page);});
    }
};
