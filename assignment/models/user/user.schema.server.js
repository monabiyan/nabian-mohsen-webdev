/**
 * Created by mohsennabian on 11/22/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    // var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        phone:String,
        dateCreated : {type:Date,ref:Date.now()},
        // role: {type: String, enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}]
        // websites: [WebsiteSchema],
    }, {collection: "user"});
    return UserSchema;
};