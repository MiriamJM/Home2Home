//import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { PropertyModel } from './PropertyModel';
import { UserModel } from './UserModel';
import { BookingModel } from './BookingModel';
import { ReviewModel } from './ReviewModel';
import GooglePassportObj from './GooglePassport';
import * as passport from 'passport';
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
  public googlePassportObj:GooglePassportObj;

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
    this.googlePassportObj = new GooglePassportObj();

  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session({ secret:'25WHY8jYAJ5xicSffPyjgWeQ'}));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }


  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

    private validateAuthAPI(req, res, next):void {
        if (req.isAuthenticated()) return next();
        res.send({});
    }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.expressApp.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
    });

    router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile']}));

    router.get('/auth/google/callback', 
    passport.authenticate('google', 
        {failureRedirect: '/' }
    ), 
    (req, res) => {
        var user = JSON.parse(JSON.stringify(req.user));
        this.Users.registerGoogleCustomer(user.id, user.displayName, res);
    });

   router.get('/api/auth-data', this.validateAuthAPI, (req, res) => {
        var user = JSON.parse(JSON.stringify(req.user));
        return res.send({ userId: user.id });
    });

    router.get('/auth/log-out', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/app/properties/', (req, res) => {
        console.log('Query All properties');
        console.log('userid:' + req.user.id)
        this.Properties.retrieveAllProperties(res);
    });

    router.get('/app/properties/:propertyId', (req, res) => {
        var id = req.params.propertyId;
        console.log('Query single property with id: ' + id);
        this.Properties.retrievePropertyDetails(res, { propertyId: id});
    });

    router.post('/app/properties/', (req, res) => {
       console.log(req.body);
       let jsonObj = req.body;
       jsonObj.propertyId = this.idGenerator;
        this.Properties.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
       this.Users.updateUserProperty(req.params.userId, jsonObj.propertyId);
    });

    router.get('/app/searchForHomes/:location-:guests', (req, res) => {
        var location = req.params.location;
        var checkin = req.params.checkin;
        var checkout = req.params.checkout;
        var guests = req.params.guests;
        this.Properties.searchProperties(res, { 'bedrooms': guests, 'city': location })
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
/*
    router.post('/app/users/:userId', (req, res) => {
       console.log(req.body);
       //var jsonObj = req.body;
       this.Users.updateUserProperty
    });
*/
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

      router.get('/app/reviewsByProperty/:propertyId', (req, res) => {
        var id = req.params.propertyId; 
        console.log('Query reviews by property id: ' + id);
        this.Reviews.retrieveReviewByProperty(res, { propertyId: id });
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
    //this.expressApp.use('/', express.static(__dirname+'/pages'));
    //this.expressApp.use('/', express.static(__dirname + '/angularDist'));
    this.expressApp.use('/', express.static(__dirname + '/angularDist'));
  }

}

export {App};
