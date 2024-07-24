import { Router } from "express";
import { UserController } from "../controllers/usersController.js";
import { upload } from "../models/userModel.js";

export const createUserRouter=()=>{
    const userRouter=Router()

    const userController= new UserController()

    userRouter.get('/:id', userController.getProfile)
    userRouter.post('/',userController.create)
    userRouter.patch('/:id',userController.update)
    userRouter.delete('/:id',userController.delete)
    userRouter.post('/:id/photo',upload.single('photo'),userController.updatePhoto)

    return userRouter
}
