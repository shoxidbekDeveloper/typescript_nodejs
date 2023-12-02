import mongoose, { Document, Types } from "mongoose";

export interface userModelTypes {
    name: String,
    surname: String,
    age: Number,
    password: String,
    username: String,
    avatar: String,
    status: String,
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 20
    },
    surname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
}, { timestamps: true   })


export default mongoose.model<userModelTypes>("User", userSchema)