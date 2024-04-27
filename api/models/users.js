import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required: true
    },
    username:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current time when a document is created
    }
});   

userSchema.pre('save', async function(next){
    const user = this;

    // Has the password only if it has been modified (or new record)
    if (!user.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch(err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);

export default User
