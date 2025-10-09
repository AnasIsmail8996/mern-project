import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
   type:Boolean,
   default:false
  },

});


userSchema.pre("save", async function(next){
const user = this;
if(!user.isModified("password")){
next()
}

try {
   const hashPassword= await bcrypt.hash(user.password, 10) ;
   user.password =hashPassword;
} catch (error) {
  console.log(error.message);
  next(error)
}})


// comparePassword(password)

userSchema.methods.comparePassword= async function(password){
return  bcrypt.compare( password, this.password) 

}


// token

userSchema.methods.generateToken = async function (){

  try {
    return jwt.sign({
      userID : this._id.toString(),
      email : this.email,
      isAdmin: this.isAdmin,

    },
  process.env.SECRET_KEY,
  {
    expiresIn :"30d"
  }
  )
  } catch (error) {
    console.error(error.message)
  }

}


const User = new mongoose.model("User", userSchema);
export { User}
