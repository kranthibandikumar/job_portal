
const roleMiddleware =(allowedRoles) => (req,res,next) => {

    if(!req.user || !req.user.role){
        return res.status(401).json({message:"Unauthorised. User role missing"})
    }

    if(!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({message: "Access denied"})
    }
    
    next()
}

module.exports = roleMiddleware;