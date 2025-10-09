import { Service } from "../models/service-models.js";


const services= async(request, response)=>{
    try {
        const res = await Service.find();
           if(!res){
            return response.status(404).json({
                message : "Data Not Found"
            })
           }

          response.status(200).json({
              message: "Data get SuccessFully from services", 
              res,
          })

    } catch (error) {
        console.log(`service page controller ${error}`);
        
    }

}


const addServices=async(request, response)=>{
try {
    const data= request.body;

    const saved= Array.isArray(data)
    ? await Service.insertMany(data)
    : await Service.create(data);

     response.status(201).json({
      message: "Service(s) added successfully",
      saved,
    });
} catch (error) {
      console.log(`add service controller error: ${error}`);
    response.status(500).json({ message: "Error adding services", error });
}
}

export { services, addServices}


