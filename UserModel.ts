import Mongoose = require("mongoose");
import {DataAccess} from '././DataAccess';
import {IUserModel} from './interfaces/IUserModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userId: String,
                fName: String,
                lName: String,
                password: String,
                email: String,
                phoneNumber: String,
                locationPreferences: [String],
                datePreferences: [Date],
                properties: String,
                bookings: Number,
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    public retrieveAllUsers(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveUserCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerUserList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerUserList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of users: ' + innerUserList.users.length);
                    response.json('{count:' + innerUserList.users.length + '}');
                }
            }
        });
    }

    public updateUserProperty(response:any, filter:Object, update:Object) {
        var query = this.model.findOneAndUpdate(filter, update);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public registerGoogleCustomer(userid: String, displayName: String,  response: any): any{
        console.log('userid:', userid);
        this.model.findOne({userId: userid }).exec((err, data) => {
            if (data) {
            	console.log(`api/user-registration: FAIL - ID already exists`);
            	response.redirect('/#/travelerProfile/');
            	//return true;
            } else {
                var user = {
                    userId: userid,
                    fName: displayName,
                }
                this.model.create(user, (err, data) => {
                    console.log('api/user-registration: SUCCESS');
                    //response.redirect('/#/addTravelerProperty/');
                    response.redirect('/#/travelerProfile/');
                });
                //return false;
            }
        })
    }

}
export {UserModel};
