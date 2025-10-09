

const adminMiddleware=async(req , res, next)=>{

    try {
        const adminRole= req.user.isAdmin;
          if(!adminRole){
            return res.status(403).json({
                message:"Access denied . User is not Admin"
            })
          }
        // console.log(req.user);
        // res.status(200).json({message : req.user})
        next()
        
    } catch (error) {
        next(error)
    }

}

export { adminMiddleware}