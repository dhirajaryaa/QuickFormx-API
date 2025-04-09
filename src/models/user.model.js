import mongoose, { Schema } from "mongoose";
import crypto from 'crypto';

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: [4, "Name must be at least 6 characters long"],
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    apiKey: {
        type: String,
        unique: true,
        trim: true
    },
    refreshToken: {
        type: String,
        default: ""
    }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);