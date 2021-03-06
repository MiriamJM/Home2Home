import Mongoose = require("mongoose");

interface IPropertyModel extends Mongoose.Document {
    propertyId: string;
    propertyName: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    sqFeet: number;
    address: string;
    averageRating: number;
    owner: string;
}

export {IPropertyModel};
