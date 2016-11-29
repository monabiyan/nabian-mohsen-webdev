/**
 * Created by mohsennabian on 11/23/16.
 */


module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget: reorderWidget,
        setModel:setModel
    };

    return api;


    function setModel(_model) {
        model = _model;
    }


    function createWidget(pageId, widget){
        console.log(pageId);
        console.log('DDDOOOOONE');
        console.log(widget);
        return (WidgetModel.create(widget).then(function(widgetObj){

            console.log(widgetObj);
            return model.pageModel.findPageById(pageId).then(function(pageObj){
                console.log('gggggggg');
                console.log(pageObj);
                widgetObj._page=pageObj._id;
                widgetObj.save();
                pageObj.widgets.push(widgetObj);
                pageObj.save();
                return(widgetObj);



            })
        }));
    }

    function findAllWidgetsForPage(pageId){
        console.log(pageId);
        return model.pageModel.findPageById(pageId).populate("widgets").exec();


    }


    function findWidgetById(widgetId){
        return (WidgetModel.findOne({_id:widgetId}));
    }

    function updateWidget(widgetId, widget){
        console.log(widgetId);
        return (WidgetModel.update(
            {_id:widgetId},
            {
                name: widget.name,
                text: widget.text,
                placeholder: widget.placeholder,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                deletetable:widget.deletetable,
                formatted:widget.formatted
            }
        ));
    }

    function deleteWidget(widgetId){
       return WidgetModel.remove({_id:widgetId})
    }


    function reorderWidget(pageId, start, end){     //TODO

    }

};
