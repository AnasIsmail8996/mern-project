import { Contact } from "../models/contact-models.js"


const contactForm=async (req , res)=>{

    try {
        const response =  req.body;
        await Contact.create( response);

        return res.status(200).json({message : "message Send SuccessFully"})
    } catch (error) {
          return res.status(200).json({message : "message not Sended yet "})
        console.log(error.message);
        
    }
}

export { contactForm }