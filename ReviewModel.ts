import Mongoose = require("mongoose");
import {DataAccess} from '././DataAccess';
import {IReviewModel} from './interfaces/IReviewModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ReviewModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                reviewId: Number,
                reviewerId: Number,
                propertyId: Number,
                comment: String,
                rating: Number
            }, {collection: 'reviews'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IReviewModel>("Review", this.schema);
    }

    public retrieveAllReviews(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveReviewDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveReviewByProperty(response:any, filter:Object): any  {
        var query = this.model.find(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveReviewCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerReviewList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerReviewList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of reviews: ' + innerReviewList.reviews.length);
                    response.json('{count:' + innerReviewList.reviews.length + '}');
                }
            }
        });
    }

}
export {ReviewModel};
