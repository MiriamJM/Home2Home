"use strict";
exports.__esModule = true;
exports.BookingModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("././DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var BookingModel = /** @class */ (function () {
    function BookingModel() {
        this.createSchema();
        this.createModel();
    }
    BookingModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            bookingId: String,
            userA: String,
            userB: String,
            propertyA: String,
            propertyB: String,
            tripDates: String,
            dateRequested: String,
            dateConfirmed: String
        }, { collection: 'bookings' });
    };
    BookingModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Booking", this.schema);
    };
    BookingModel.prototype.retrieveAllBookings = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    BookingModel.prototype.retrieveBookingDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    BookingModel.prototype.retrieveBookingCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerBookingList) {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerBookingList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of bookings: ' + innerBookingList.bookings.length);
                    response.json('{count:' + innerBookingList.bookings.length + '}');
                }
            }
        });
    };
    return BookingModel;
}());
exports.BookingModel = BookingModel;
