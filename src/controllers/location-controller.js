import {Router, response} from "express";
import LocationService from "../servicios/location-service.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const locationService = new LocationService();
const router = Router() 

router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
   
    try{
        const res = await locationService.getAllLocations(limit,offset);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error: ", error);
        return response.status(400).json("No se pudo mostrar las localidades")
    }
})
router.get("/:id", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    
    try{
        const res = await locationService.locationById(id);
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error:", error);
        return response.status(400).json("No se pudo encontrar la localidad")
    }
})
router.get("/:id/event-locations", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    const id_creator_user  = request.user.id;
    try{
        if(id_creator_user != null){
            const res = await locationService.eventLocations(id,id_creator_user);
            return response.status(201).json(res)
        }
        else{
            console.log("Falta autorizacion");
            return response.status(401).json("Unauthorized")
        }
    }catch(error){
        console.log(error);
        return response.status(404).json("No se encontraron localizaciones")
    }
})
export default router;