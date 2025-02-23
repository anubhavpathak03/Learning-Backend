import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrpyt from "bcrypt"

// remember direct encryption is not possible that why we use mongoose hooks  

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // helps to searching in DB
            // helps to enabled search in field
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //we use cloudinary url 
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjecId,
                ref: "Video",
            }
        ],
        refreshToken: {
            type: String,
        }
    }, {timeStamps: true}
);


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrpyt.hash(this.password, 10);
    next();
})      

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrpyt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
      {
        _id: this.id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
      {
        _id: this.id,
      },
      process.env.REFERESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFERESH_TOKEN_EXPIRY,
      }
    );
}

userSchema.methods.generateRefreshToken = function() {}


export const User = mongoose.model("User", userSchema);


/**
 * 
 * jwt ek bearer token matlab jo usko bear karega usko data dedengye
 * just like Key 
 */