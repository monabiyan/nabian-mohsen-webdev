/**
 * Created by mohsennabian on 11/22/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref : "UserModel"},
        name: String,
        description:String,
        pages : [{type: mongoose.Schema.Types.ObjectId, ref : "PageModel"}],
        dateCreated : {type:Date,ref:Date.now()}
    }, {collection: "website"});
    return WebsiteSchema;
};

