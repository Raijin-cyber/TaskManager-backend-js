// moongoose is js library which is used for two purposes
// 1. To connect with the Database
// 2. To create Schemas of the entities

import mongoose from "mongoose";

const connectdb = async() => {
    try {
        mongoose.connection.on("connecting", () => console.log("Server is starting... \nTrying to connect to the database..."));
        mongoose.connection.on("reconnected", () => console.log("Database reconnected with the server successfully."));
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error("Database failed to connect: ",error);
        console.log("*** Server is shutting down ***");
        process.exit(0); // terminate the server
    }
}

export default connectdb;