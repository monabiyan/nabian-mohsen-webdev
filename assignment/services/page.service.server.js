/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app) {

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
    ];



    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);


    function createPage(req,res)
    {
        var page=req.body;
        page._id=(new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    function findPagesByWebsiteId(req,res)
    {
        var params=req.params;
        webId=params.wid;
        var result = [];
        for (u in pages)
        {
            if (pages[u].websiteId==webId)
            {
                result.push(pages[u]);
            }
        }
        res.send(result);
    }

    function findPageById(req,res)
    {
        var params=req.params;
        pageId=params.pid;
        var result = '0';
        for (u in pages)
        {
            if (pages[u]._id==pageId)
            {
                result=pages[u];
                break;
            }
        }
        res.send(result);
    }

    function updatePage(req,res)
    {
        var page=req.body;
        id=page._id;
        for (u in pages)
        {
            if (pages[u]._id==id)
            {
                pages[u]=page;
            }
        }
        res.send(page);
    }

    function deletePage(req,res)
    {
        var id=req.params.pid;
        pages = pages.filter(function(item) {
            return item._id != id;
        });
        res.send("1");
    }

};