import mongoose from "mongoose";

mongoose.connect("mongodb+srv://manu27:Manuel27_27@cluster0.9ii8xdm.mongodb.net/ProyectoPersonal")
.then(()=>console.log('connection in mongo'))
.catch(e=>console.log(`error -> ${e}`))

export default mongoose

