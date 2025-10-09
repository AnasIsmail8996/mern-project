import bcrypt from "bcryptjs";
import {User} from "../models/user-models.js"


const home = async(req , res)=>{

    try {
        await res.status(200).send(" this new server is running on port");
    } catch (error) {
        console.log(error.message);
        
    }
}



// registration

const register = async (req , res)=>{
try {
    const { username, email, phone, password}=req.body;
    const userExits= await User.findOne({ email});
    if(userExits){
    return res.status(400).json({ message :"email already Exits"})
    }

   


  const userCreated = await User.create({
    username, 
    email,
     phone,
      password,
  })

   await res.status(201).json({
     message : "User Registration SuccessFully",
      userCreated,
    token: await userCreated.generateToken(),
     userID: userCreated._id.toString() 
    });
    
} catch (error) {
    // res.status(400).send({ message:" this new server is running on register"});
    // console.log(error.message);
    next(error)
    
}
} 

// login function starting from here




const  login = async (req , res)=>{
 try {
    const {email, password}= req.body;

    const userExits = await User.findOne({ email});

    if(!userExits){
    return  res.status(400).send({ message:"Invalid Email or Password"});
    }


    // const  user = await bcrypt.compare( password, userExits.password) 

    const user= await  userExits.comparePassword(password);
   
    if(user){
 res.status(200).json({
     message : "User Login SuccessFully",
      userExits,
    token: await userExits.generateToken(),
     userID: userExits._id.toString() 
    });
    }else{
        res.status(401).json({message : "Invalid Email or Password"});
    }
    
} catch (error) {
     next(error)
     res.status(400).send({ message:" this new server is running on login"});
 }

}



// user form data

const user=async(req, res)=>{
try {
    const userData= req.user;
    return res.status(200).json({userData})
} catch (error) {
    console.log(error.message);
    
}
}


export  { home, register, login, user };
