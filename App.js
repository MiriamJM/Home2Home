"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var PropertyModel_1 = require("./PropertyModel");
var UserModel_1 = require("./UserModel");
var BookingModel_1 = require("./BookingModel");
var ReviewModel_1 = require("./ReviewModel");
//import {DataAccess} from './DataAccess';
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.Properties = new PropertyModel_1.PropertyModel();
        this.Users = new UserModel_1.UserModel();
        this.Bookings = new BookingModel_1.BookingModel();
        this.Reviews = new ReviewModel_1.ReviewModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        router.get('/app/properties/', function (req, res) {
            console.log('Query All properties');
            _this.Properties.retrieveAllProperties(res);
        });
        router.get('/app/properties/:propertyId', function (req, res) {
            var id = req.params.propertyId;
            console.log('Query single property with id: ' + id);
            _this.Properties.retrievePropertyDetails(res, { propertyId: id });
        });
        router.post('/app/properties/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.propertyId = this.idGenerator;
            _this.Properties.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/searchForHomes/:location-:guests', function (req, res) {
            var location = req.params.location;
            var checkin = req.params.checkin;
            var checkout = req.params.checkout;
            var guests = req.params.guests;
            _this.Properties.searchProperties(res, { 'bedrooms': guests });
        });
        router.get('/app/users/', function (req, res) {
            console.log('Query All users');
            _this.Users.retrieveAllUsers(res);
        });
        router.get('/app/users/:userId', function (req, res) {
            var id = req.params.userId;
            console.log('Query single user with id: ' + id);
            _this.Users.retrieveUserDetails(res, { userId: id });
        });
        router.post('/app/users/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.userId = this.idGenerator;
            _this.Users.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/bookings/', function (req, res) {
            console.log('Query All bookings');
            _this.Bookings.retrieveAllBookings(res);
        });
        router.get('/app/bookings/:bookingId', function (req, res) {
            var id = req.params.bookingId;
            console.log('Query single booking with id: ' + id);
            _this.Bookings.retrieveBookingDetails(res, { bookingId: id });
        });
        router.post('/app/bookings/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.bookingId = this.idGenerator;
            _this.Bookings.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/reviews/', function (req, res) {
            console.log('Query All bookings');
            _this.Reviews.retrieveAllReviews(res);
        });
        router.get('/app/reviews/:reviewId', function (req, res) {
            var id = req.params.reviewId;
            console.log('Query single review with id: ' + id);
            _this.Reviews.retrieveReviewDetails(res, { reviewId: id });
        });
        router.post('/app/reviews/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.reviewId = this.idGenerator;
            _this.Reviews.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/json', express.static(__dirname + '/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
