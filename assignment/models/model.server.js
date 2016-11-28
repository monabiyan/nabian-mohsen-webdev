/**
 * Created by mohsennabian on 11/22/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel=require("./page/page.model.server.js")();
    var widgetModel=require("./widget/widget.model.server.js")();

    // var user={
    //     username:'alice',
    //     password:'alice'
    // };
    // userModel.createUser(user);

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};
