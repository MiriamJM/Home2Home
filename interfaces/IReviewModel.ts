import Mongoose = require("mongoose");

interface IReviewModel extends Mongoose.Document {
    reviewId: number;
    reviewerId: number;
    propertyId: number;
    comment: string;
    rating: number;
}

export {IReviewModel};
