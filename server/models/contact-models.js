import { Schema, model} from  "mongoose"


const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  doctor: { type: String, required: true }, 
  appointmentDate: { type: Date, required: true } 
});


const Contact = new model("Contact", contactSchema)
export { Contact}