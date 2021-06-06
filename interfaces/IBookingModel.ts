import Mongoose = require("mongoose");

interface IBookingModel extends Mongoose.Document {
    bookingId: number;
    userA: string;
    userB: string;
    propertyA: number;
    propertyB: number;
    tripDates: string;
    dateRequested: string;
    dateConfirmed: string;
}

export {IBookingModel};
