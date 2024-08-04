import { Response, Request } from "express";
import { validatePartialUser } from "../../schemas/userSchema.js";
import { AuthService } from "../service/authService.js";

export class AuthController {
    private authService= new AuthService();

  login = async (req:Request,res:Response) => {
    const validate= validatePartialUser(req.body)
    const auth= this.authService.login(validate.data.email,validate.data.password)
    await auth.then((data)=>res.status(200).json({auth:data})).catch((err)=>res.status(400).json({error:err}))
  };
}
