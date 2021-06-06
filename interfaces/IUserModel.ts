import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
  userId: string,
  fName: string,
  lName: string,
  password: string,
  email: string,
  phoneNumber: string,
  locationPreferences: [string],
  datePreferences: [Date],
  properties: number,
  bookings: number
}

export {IUserModel};
