import { Router } from "express";
import { PostsController } from "../controllers/postsController.js";

export const createInfoRouter = ()=>{
    const postsRouter= Router()
    
    const postsController= new PostsController()

    postsRouter.get('/:userId',postsController.getAll)
    postsRouter.get('/:id',postsController.getById)
    postsRouter.post('/',postsController.addPost)
    postsRouter.delete('/:id',postsController.RemovePost)


    return postsRouter
}