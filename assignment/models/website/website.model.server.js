/**
 * Created by mohsennabian on 11/22/16.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        setModel: setModel
    };

    return api;




    function setModel(_model) {
        model = _model;
    }



    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                return model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        userObj.websites.push(websiteObj);
                        return userObj.save();

                    }, function(error){
                        console.log(error);
                    });
            });
    }


    function findAllWebsitesForUser(userId)
    {
        return model.userModel
            .findUserById(userId)
            .populate("websites")
            .exec()
            .then(function(userObj){
                    console.log(userObj.websites);
                    return userObj.websites;
                },
                function(error){
                    console.log(error);
                    res.sendStatus(400).send(error);
                })

    }


    function findWebsiteById(websiteId){

        return(WebsiteModel.findOne({_id: websiteId}));

    }


    function updateWebsite(websiteId, website){
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {

                    name: website.description,
                    description: website.description

                }
            );
    }

    function deleteWebsite(websiteId){

        return WebsiteModel
            .remove({_id: websiteId});

    }



};