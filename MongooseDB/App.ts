//import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import {ListModel} from './model/ListModel';
import {TaskModel} from './model/TaskModel';
import { PropertyModel } from './model/PropertyModel';
//import {DataAccess} from './DataAccess';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Lists:ListModel;
  public Tasks: TaskModel;
  public Properties: PropertyModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 102;
    this.Lists = new ListModel();
    this.Tasks = new TaskModel();
    this.Properties = new PropertyModel();
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
    //router.get('/app/list/:listId/count', (req, res) => {
    //    var id = req.params.listId;
    //    console.log('Query single list with id: ' + id);
    //    this.Tasks.retrieveTasksCount(res, {listId: id});
    //});

    //router.post('/app/list/', (req, res) => {
    //    console.log(req.body);
    //    var jsonObj = req.body;
    //    //jsonObj.listId = this.idGenerator;
    //    this.Lists.model.create([jsonObj], (err) => {
    //        if (err) {
    //            console.log('object creation failed');
    //        }
    //    });
    //    res.send(this.idGenerator.toString());
    //    this.idGenerator++;
    //});

    //router.get('/app/list/:listId', (req, res) => {
    //    var id = req.params.listId;
    //    console.log('Query single list with id: ' + id);
    //    this.Tasks.retrieveTasksDetails(res, {listId: id});
    //});

    //router.get('/app/list/', (req, res) => {
    //    console.log('Query All list');
    //    this.Lists.retrieveAllLists(res);
    //});

    router.get('/app/properties/', (req, res) => {
        console.log('Query All properties');
        this.Properties.retrieveAllProperties(res);
    });

    router.get('/app/properties/:propertyId', (req, res) => {
        var id = req.params.propertyId;
        console.log('Query single list with id: ' + id);
        this.Properties.retrievePropertyDetails(res, { propertyId: id});
    });

    router.post('/app/properties/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.listId = this.idGenerator;
        this.Properties.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
    });

    router.get('/app/users/', (req, res) => {
        console.log('Query All users');
        this.Users.retrieveAllUsers(res);
    });

    router.get('/app/users/:userId', (req, res) => {
        var id = req.params.userId;
        console.log('Query single list with id: ' + id);
        this.Users.retrieveUserDetails(res, { userId: id});
    });

    router.post('/app/users/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.listId = this.idGenerator;
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
        console.log('Query single list with id: ' + id);
        this.Bookings.retrieveBookingDetails(res, { bookingId: id});
    });

    router.post('/app/bookings/', (req, res) => {
       console.log(req.body);
       var jsonObj = req.body;
       //jsonObj.listId = this.idGenerator;
        this.Bookings.model.create([jsonObj], (err) => {
           if (err) {
               console.log('object creation failed');
           }
       });
       res.send(this.idGenerator.toString());
       this.idGenerator++;
    });

    //router.get('/app/listcount', (req, res) => {
    //  console.log('Query the number of list elements in db');
    //  this.Lists.retrieveListCount(res);
    //});

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};