"use strict";
exports.__esModule = true;
exports.PropertyModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("././DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var PropertyModel = /** @class */ (function () {
    function PropertyModel() {
        this.createSchema();
        this.createModel();
    }
    PropertyModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            propertyId: Number,
            propertyName: String,
            description: String,
            bedrooms: Number,
            bathrooms: Number,
            sqFeet: Number,
            address: String,
            averageRating: Number
        }, { collection: 'properties' });
    };
    PropertyModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Property", this.schema);
    };
    PropertyModel.prototype.retrieveAllProperties = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    PropertyModel.prototype.searchProperties = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    PropertyModel.prototype.retrievePropertyDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    PropertyModel.prototype.retrievePropertyCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerPropertyList) {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerPropertyList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of properties: ' + innerPropertyList.properties.length);
                    response.json('{count:' + innerPropertyList.properties.length + '}');
                }
            }
        });
    };
    return PropertyModel;
}());
exports.PropertyModel = PropertyModel;
