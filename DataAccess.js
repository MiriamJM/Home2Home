"use strict";
exports.__esModule = true;
exports.DataAccess = void 0;
var Mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    DataAccess.DB_CONNECTION_STRING = 'mongodb+srv://H2HAdmin:Home2Home@cluster0.scqxl.mongodb.net/propertySample';
    DataAccess.uri = DataAccess.DB_CONNECTION_STRING;
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
