import {Router} from "express";
import CategoryService from "../servicios/event_category-service.js";

const categoryService = new CategoryService();
const router = Router() 
router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    try{
        const res = await categoryService.getAllCategories(limit,offset);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error: ", error);
        return response.status(400).json("No se pudo mostrar las localidades")
    }
})
router.get("/:id", async (request,response) =>{
    try{
        const res = await categoryService.categoryById(request.params.id);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error:", error);
        return response.status(400).json("No se pudo encontrar la categoria")
    }
})
router.post("/", async (request,response) =>{
    const name = request.body.name;
    const display_order = request.body.display_order;

    try{
        const categoryV = categoryServices.verifyCategory(name, display_order)
        if(categoryV == false400){
            return response.status(400).json("no cumple con los parametros")
        }
            const answer = await categoryService.CreateCategory(name,display_order)
            return response.status(201).json("created");
            return response.json(answer)
    }catch(error){
        console.log("error al crear categoria: ", error);
        return response.status(400).json("error al crear categoria")
    }
})
router.put("/:id", async (request,response) =>{
    const id = request.body.id;
    const name = request.body.name;
    const display_order = request.body.display_order;
    try{
        const categoryV = categoryServices.verifyCategory(name, display_order)
        if(categoryV == false400){
            response.statusCode = 400
            return response.json("no cumple con los parametros")
        }else if(categoryV == false404){
            response.statusCode = 404
            return response.json("Category not found")
        }
            const res = await categoryService.EditCategory(id,name,display_order)
            response.status = 200
            return response.json(res);
    }catch(error){
        return response.status = 400
        return response.json("error al editar categoria")
    }
})
router.delete("/:id", async (request,response) =>{
    try{
        const categoryV = categoryServices.verifyCategory("name", display_order)
        if(categoryV == false404){
            response.statusCode = 404 
            return response.json("category not found")
        }
        const res = categoryService.DeleteCategory(request.params.id);
        return response.status = 201
        return response.json("deleted");
    }catch(error){
        console.log("Hubo un error:", error);
        return response.status(400).json("Cannot Delete Category")
    }
})
export default router;