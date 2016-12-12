/**
 * Created by mohsennabian on 11/22/16.
 */
module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        removeUser: removeUser,
        findUserByFacebookId: findUserByFacebookId,  ///for facebook login
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }


    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();
    }


    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }


    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }


    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }


    function updateUser(userId, user) {
        console.log('hiiii');
        return UserModel
            .update(
                {
                    _id: userId
                },
                {

                    firstName: user.firstName,
                    lastName: user.lastName,
                    username:user.username
                }
            );
    }


    function findUserById(userId) {
        // UserModel.find({_id: userId}) --> returns an array
        return UserModel.findById(userId);
    }


    function createUser(user) {

        return UserModel.create(user);
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }


};