import { Router } from "express";
import { UploadFilesController} from "../controllers/uploadFileController.js";

export const createUploadRouter=()=>{
    const uploadRouter=Router()

    const uploadController= new UploadFilesController()

    uploadRouter.get('/:userId', uploadController.addPhotoUser)
    uploadRouter.post('/',uploadController.addPostAndPhoto)

    return uploadRouter
}
