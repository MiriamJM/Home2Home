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
                userId: Number,
                fName: String,
                lName: String,
                password: String,
                email: String,
                phoneNumber: String,
                locationPreferences: [String],
                datePreferences: [Date],
                properties: Number,
                bookings: Number,
            }, {collection: 'users'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    public retrieveAllUsers(response: any): any {
        var query = this.model.find({});
        query.exec((err: any, itemArray: any) => {
            response.json(itemArray);
        });
    }

    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err: any, itemArray: any) => {
            response.json(itemArray);
        });
    }

    public retrieveUserCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err: any, innerUserList: { users: { length: string; }; } | null) => {
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

    public registerGoogleCustomer(userid: String, displayName: String,  response: any): any{
        console.log('userid:', userid);
        this.model.findOne({ "id": userid }).exec((err: any, data: any) => {
            if (data) {
            	console.log(`api/user-registration: FAIL - ID already exists`);
            	response.redirect('/');
            }else{
                var user = {
                    id: userid,
                    name: displayName,
                }
                this.model.create(user, (err: any, data: any) => {
                    console.log('api/user-registration: SUCCESS');
                    response.redirect('/');
                });
            }
        })
    }

}
export {UserModel};
