import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
     const { authorization } = req.headers;
     let token;
     if(authorization && authorization.startsWith('Bearer')){
          try {
               token = authorization.split(' ')[1];
               // console.log(token);

               const decoded = jwt.verify(token, process.env.JWT_SECRET);
               // console.log(decoded);

               req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado -web -telefono");

               return next();
          } catch (error) {
               const e = new Error('Token no valido');
               return res.status(403).json({msg: e.message});               
          }
     }

     if(!token){
          const error = new Error('Token no valido');
          res.status(403).json({msg: error.message});
     }

     return next();

};

export default checkAuth;