/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 15,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    email: {
        type: String,
        required: true,
        maxlength: 60,
        lowercase: true,
        unique:true
    },
  password: {
    type: String,
    select: false,
  },
  phoneNumber: {
    type: Number,
    requierd:true
  },
  address: [{
    addr1: String,
    neighborhood: String,
    city: String,
    description:String,
    country: String
  }],
  createDate: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.gg = function () {
    return true;
}

// genrate token
// UserSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id,type:this.type,mobileRegToken:this.mobileRegToken}, keys.jwtKey);

//     return token;
// }

// create index
UserSchema.index({  email:1 });