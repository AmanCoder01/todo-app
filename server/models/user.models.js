import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"First Name is required"]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }
    ]
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);