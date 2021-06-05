"use strict";
exports.__esModule = true;
exports.ReviewModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("././DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ReviewModel = /** @class */ (function () {
    function ReviewModel() {
        this.createSchema();
        this.createModel();
    }
    ReviewModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            reviewId: Number,
            reviewerId: Number,
            propertyId: Number,
            comment: String,
            rating: Number
        }, { collection: 'reviews' });
    };
    ReviewModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Review", this.schema);
    };
    ReviewModel.prototype.retrieveAllReviews = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReviewModel.prototype.retrieveReviewDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReviewModel.prototype.retrieveReviewByProperty = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReviewModel.prototype.retrieveReviewCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerReviewList) {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerReviewList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of reviews: ' + innerReviewList.reviews.length);
                    response.json('{count:' + innerReviewList.reviews.length + '}');
                }
            }
        });
    };
    return ReviewModel;
}());
exports.ReviewModel = ReviewModel;
