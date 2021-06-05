import Mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

class DataAccess {

    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    static DB_CONNECTION_STRING: string = 'mongodb+srv://H2HAdmin:Home2Home@cluster0.scqxl.mongodb.net/propertySample';
    static uri: string  = DataAccess.DB_CONNECTION_STRING;

    constructor() {
        DataAccess.connect();
    }

    static connect():  Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });

        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};