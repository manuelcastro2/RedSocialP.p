import { Router } from "express";
import { PostsController } from "../controllers/postsController.js";

export const createPostRouter = ()=>{
    const postsRouter= Router()
    
    const postsController= new PostsController()

    postsRouter.get('/',postsController.getAll)
    postsRouter.get('/:id',postsController.getById)
    postsRouter.delete('/:id',postsController.RemovePost)


    return postsRouter
}