//import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import { PropertyModel } from './PropertyModel';
import { UserModel } from './UserModel';
import { BookingModel } from './BookingModel';
import { ReviewModel } from './ReviewModel';
//import {DataAccess} from './DataAccess';
//test
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Properties: PropertyModel;
  public Users: UserModel;
  public Bookings: BookingModel;
  public Reviews: ReviewModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    this.Properties = new PropertyModel();
    this.Users = new UserModel();
    this.Bookings = new BookingModel();
    this.Reviews = new ReviewModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.expressApp.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
    });
    router.get('/app/properties/', (req, res) => {
        console.log('Query All properties');
        this.Properties.retrieveAllProperties(res);
    });

    router.get('/app/properties/:propertyId', (req, res) => {
        var id = req.params.propertyId;
        console.log('Query single property with id: ' + id);
        this.Properties.retrievePropertyDetails(res, { propertyId: id});
    });

    router.post('/app/properties/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.propertyId = this.idGenerator;
        this.Properties.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
    });

    router.get('/app/searchForHomes/:location-:guests', (req, res) => {
        var location = req.params.location;
        var checkin = req.params.checkin;
        var checkout = req.params.checkout;
        var guests = req.params.guests;
        this.Properties.searchProperties(res, { 'bedrooms': guests })
    });

    router.get('/app/users/', (req, res) => {
        console.log('Query All users');
        this.Users.retrieveAllUsers(res);
    });

    router.get('/app/users/:userId', (req, res) => {
        var id = req.params.userId;
        console.log('Query single user with id: ' + id);
        this.Users.retrieveUserDetails(res, { userId: id});
    });

    router.post('/app/users/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.userId = this.idGenerator;
        this.Users.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
    });

    router.get('/app/bookings/', (req, res) => {
        console.log('Query All bookings');
        this.Bookings.retrieveAllBookings(res);
    });

    router.get('/app/bookings/:bookingId', (req, res) => {
        var id = req.params.bookingId;
        console.log('Query single booking with id: ' + id);
        this.Bookings.retrieveBookingDetails(res, { bookingId: id});
    });


    router.post('/app/bookings/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.bookingId = this.idGenerator;
        this.Bookings.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
    });

      router.get('/app/reviews/', (req, res) => {
          console.log('Query All bookings');
          this.Reviews.retrieveAllReviews(res);
      });

      router.get('/app/reviews/:reviewId', (req, res) => {
          var id = req.params.reviewId;
          console.log('Query single review with id: ' + id);
          this.Reviews.retrieveReviewDetails(res, { reviewId: id });
      });

      router.post('/app/reviews/', (req, res) => {
          console.log(req.body);
          var jsonObj = req.body;
          //jsonObj.reviewId = this.idGenerator;
          this.Reviews.model.create([jsonObj], (err) => {
              if (err) {
                  console.log('object creation failed');
              }
          });
          res.send(this.idGenerator.toString());
          this.idGenerator++;
      });

    this.expressApp.use('/', router);
    this.expressApp.use('/json', express.static(__dirname+'/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    this.expressApp.use('/', express.static(__dirname+'/dist'));


  }

}

export {App};
