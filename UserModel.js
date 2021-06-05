"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("././DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: Number,
            fName: String,
            lName: String,
            password: String,
            email: String,
            phoneNumber: String,
            locationPreferences: [String],
            datePreferences: [Date],
            properties: Number,
            bookings: Number
        }, { collection: 'users' });
    };
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    UserModel.prototype.retrieveAllUsers = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    UserModel.prototype.retrieveUserDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    UserModel.prototype.retrieveUserCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerUserList) {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerUserList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of users: ' + innerUserList.users.length);
                    response.json('{count:' + innerUserList.users.length + '}');
                }
            }
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
