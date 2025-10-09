import {User} from "../models/user-models.js"
import { Contact } from "../models/contact-models.js"


const getAllUsers=async(req , res)=>{

    try {

        const users= await User.find({}, {password: 0});

        if(!users || users.length === 0){
           return  res.status(404).json({
            message: "no User Found!"
           })
        }
   

        return res.status(200).json(users)
        
    } catch (error) {
        next(error)
    }
}


// getAllContacts

const getAllContacts=async(req , res)=>{
 try {
    const contacts= await Contact.find();

    if(!contacts || contacts.length === 0){
           return  res.status(404).json({
            message: "no Contacts  Found!"
           })
        }
     return res.status(200).json(contacts)

 } catch (error) {
    next(error)
 }
}


// updateUserByID


const updateUserByID = async(req , res)=>{
  try {
    const userID= req.params.id;
    const UpdatedUSerData= req.body;

    const updateUser= await User.updateOne({_id: userID}, { 
        $set: UpdatedUSerData,
    })

    return res.status(200).json(updateUser)
  } catch (error) {
    next(error)
  }
}




// deleteUserByID

const deleteUserByID = async(req , res)=>{
try {
    const userID= req.params.id;
    await User.deleteOne({_id : userID});
    return res.status(200).json({
        message: "User Deleted SuccessFully"
    })
} catch (error) {
    next(error)
}
}
// single data get by yser edit and updates

const getUserByID = async(req , res)=>{
try {
    const userID= req.params.id;
     const editData  =await User.findOne({_id : userID}, {password : 0});
    return res.status(200).json({
        message: editData,
    })
} catch (error) {
    next(error)
}
}



const deleteUserFromContactsByID =async(req ,res)=>{
    try {
         
        const userID= req.params.id;
        await Contact.deleteOne({ _id : userID});
          return res.status(200).json({
        message: "Contact Deleted SuccessFully"
    })

    } catch (error) {
        next(error)
    }
}

export { getAllUsers, getAllContacts , 
    deleteUserByID , getUserByID ,
     updateUserByID, deleteUserFromContactsByID
    }