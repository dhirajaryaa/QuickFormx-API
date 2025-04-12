import mongoose, { Schema } from "mongoose";

const fieldSchema = new Schema({
    label: String,
    name: String,
    required: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["text", "textarea", "email", "number", "radio", "checkbox", "select", "date", "file"],
        required: true
    },
    placeholder: { type: String },
    options: [String],  // for select , checkbox , radio button
}, { _id: false });

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fields: [fieldSchema],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Form = mongoose.model("Form",formSchema);