const Jwt = require('jsonwebtoken');
const userModel = require('../Models/User.model');
const  sendResponse  = require('../Utilites/error.utilite');
const bcrypt = require('bcrypt');


const singIn = async (req,res,next) =>{
  const User = req.body;
   try{
       const isUserThere = await userModel.findOne({email:User.email});
       
       if(isUserThere){
            return next(sendResponse(401,'User is already registered'));
       }
      const password = User.password;
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      
      const regUser = new userModel({
            name:User.name,
            email:User.email,
            password:hashPassword,
            role:User.role
      });
    const saved =  await regUser.save();
     return res.status(200).json({
           message:'User saved successfully',
           success:true
     })

   }
   catch(err){
      return next(err);
   }
    
}

const getAllUser = async (req,res,next) =>{
      try{
     const allUser = await userModel.find();
       return res.status(200).json({
        message:'List of all users',
        users:allUser
       })    //just for backend checking i dont prefer it in frontend will delete it later
      }
      catch(err){
        return next(err);
      }
}

const logIn =async (req,res,next)=>{
      
    const user = req.body;  //it just have email and password
    try{

        const email = user?.email;
        const password = user?.password;
        if(!email || !password){
            return next(sendResponse(400,'Please enter the missing details'));
        }
       
       let emailVerification = await userModel.findOne({email});
       if(!(emailVerification)){
        return next(sendResponse(401,'User is not registered'));
       }
       emailVerification = emailVerification.toObject();

       const passwordVerification = await bcrypt.compare(password,emailVerification.password);
        if(!(passwordVerification)){
            return next(sendResponse(401,'Incorrect Password'));
        }
         
    
       const token = Jwt.sign({
            userId:emailVerification._id,
            role:emailVerification.role
        },process.env.JWT_KEY,
        {
            expiresIn:'1d'
        }
    )
    const {password:pass,...safeData} = emailVerification;

    return res.status(200).json({
        message:'User Logged In',
        token:token,
        userData:safeData,
        success:true
    })


    }
    catch(err){
         
        return next(err);

    }

}




module.exports = {
    singIn,
    logIn,
    getAllUser
}