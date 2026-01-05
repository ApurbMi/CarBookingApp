const sendResponse = (errCode,message)=>{
         
    const err = new Error(message);
    err.statusCode = errCode;
    
     return err;   
    


}

module.exports = sendResponse;