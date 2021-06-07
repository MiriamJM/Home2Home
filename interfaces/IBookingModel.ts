import Mongoose = require("mongoose");

interface IBookingModel extends Mongoose.Document {
    bookingId: string;
    userA: string;
    userB: string;
    propertyA: string;
    propertyB: string;
    tripDates: string;
    dateRequested: string;
    dateConfirmed: string;
}

export {IBookingModel};
