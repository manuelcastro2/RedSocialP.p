import { Router } from "express";
import { InfoController } from "../controllers/infoController.js";

export const createInfoRouter=()=>{
    const infoRouter=Router()

    const infoController= new InfoController()

    infoRouter.get('/:userId', infoController.getByUser)
    infoRouter.post('/',infoController.addInfo)
    infoRouter.patch('/',infoController.update)

    return infoRouter
}
