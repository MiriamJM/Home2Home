import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IBookingModel} from '../interfaces/IBookingModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class BookingModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
               userA: number;
               userB: number;
               propertyA: number;
               propertyB: number;
               tripDates: string;
               dateRequested: string;
               dateConfirmed: string;
            }, {collection: 'bookings'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IBookingModel>("Booking", this.schema);
    }

    public retrieveAllBookings(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveBookingDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveBookingCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerBookingList) => {
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
    }

}
export {BookingModel};