import Mongoose = require("mongoose");
import {DataAccess} from '././DataAccess';
import {IPropertyModel} from './interfaces/IPropertyModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class PropertyModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                propertyId: Number,
                propertyName: String,
                description: String,
                bedrooms: Number,
                bathrooms: Number,
                sqFeet: Number,
                address: String,
                averageRating: Number,
                owner: String,
            }, {collection: 'properties'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IPropertyModel>("Property", this.schema);
    }

    public retrieveAllProperties(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public searchProperties(response:any, filter:Object): any {
        var query = this.model.find(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrievePropertyDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrievePropertyCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerPropertyList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerPropertyList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of properties: ' + innerPropertyList.properties.length);
                    response.json('{count:' + innerPropertyList.properties.length + '}');
                }
            }
        });
    }

    /*public createProperty(name: string, description: string, bedrooms: number,
    bathrooms: number, sqFeet: number, address: string ) {
        let newProperty = {
            propertyName: name,
            description: description,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqFeet: sqFeet,
            address: address,
        }
        this.model.create(property, (err, data) => {
            console.log('api/user-registration: SUCCESS');
            response.redirect('/#/travelerProfile/');
        });
    }*/

}
export {PropertyModel};
