/**
 * Created by mohsennabian on 11/22/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    // var WebsiteSchema = require("../website/website.schema.server")();
    var PageSchema = mongoose.Schema({
        _website:{type: mongoose.Schema.Types.ObjectId, ref : "WebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets : [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}]
        // role: {type: String, enum: ['ADMIN', 'STUDENT', 'FACULTY']},
        // websites: [WebsiteSchema],
    }, {collection: "page"});
    return PageSchema;
};


