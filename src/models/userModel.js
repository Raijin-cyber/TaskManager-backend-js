import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    phone: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;