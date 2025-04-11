import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
    formId: {
        type: Schema.Types.ObjectId,
        ref: "Form",
        required: [true, "Form ID is required"]
    },
    data: {
        type: Schema.Types.Mixed,
        required: [true, "Submission data is required"]
    },
    submitAt: {
        type: Date,
        default: Date.now
    },
    clientIp: {
        type: String,
    }
});

export const Submission = mongoose.model("Submission", submissionSchema);