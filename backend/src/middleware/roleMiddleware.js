// Task: only allowe allowedRoles to pass through this to -> next()
// returns a middleware function : isAuthorised(givenRole, allowedRoles) which checks the req.user.role is authorised or not?


const authorizeRoles = (...allowedRoles) => {  // the parameters are automically converted to an array
    
    return (req, res, next) =>{

        if(!req.user){
            return res.status(401).json({
                success: false,
                message: "Not Authenticated! Invalid or Expired Token! Please Refresh & Login!"
            });
        }
        
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Forbidden : You are not Authorised to access this resource"
            });      
        }

        next();
    }
}


module.exports = authorizeRoles;