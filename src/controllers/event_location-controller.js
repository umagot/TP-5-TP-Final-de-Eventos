import { Router } from "express";
import AuthMiddleware from "../auth/authMiddleware.js";
import EventLocationService from "../servicios/event_location-service.js";

const eventLocationService = new EventLocationService();
const router = Router();


router.get("/", AuthMiddleware, async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try {
        const respuesta = await eventLocationService.getEventLocations(limit,offset,path);
        return response.status = 200
        return response.json(respuesta);
    } catch (error) {
        response.status = 401
        return response.json(error);
    }
});


router.get("/:id", AuthMiddleware, async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const url = request.originalUrl;
    try {
        const respuesta = await eventLocationService.getEventLocationById(request.id,limit,offset,url);
        if (respuesta.length) {
            response.status = 200
            return response.json(respuesta);
        } else {
            return response.status(404).json("No se encontró la localidad");
        }
    } catch (error) {
        console.log("Error al conseguir la localidad buscada:", error);
        return response.json("No se encontró la localidad");
    }
});


router.post("/", AuthMiddleware, async (request, response) => {
    const { id_location, name, full_address, max_capacity, latitude, longitude } = request.body;
    const id_creator_user = request.user.id;

    const eventLocation = { id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user };

    try {
        const locationV = await eventLocationService.verifyLocation(eventLocation.id);
        if (locationV == 400) {
            response.status = 400
            return response.json("no cumple los requisitos");
        }else if(locationV == 404){
            response.statusCode = 404
            return response.json("the location event not found")
        }
        const created = await eventLocationService.createEventLocation(eventLocation);
        response.statusCode = 200
        return response.json(created)
    } catch (error) {
        console.log(error);
        return response.json("failed 13 post");
    }
});


router.put("/:id", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    const { id_location, name, full_address, max_capacity, latitude, longitude } = request.body;
    const id_creator_user = request.user.id;

    const eventLocation = { id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user };
    try {
        const locationV = await eventLocationService.verifyLocation(eventLocation.id);
        if (locationV == 400) {
            return response.status(400).json(locationV);
        }else if(locationV == 404){
            return response.status(404).json("Event location not found or not authorized" );
        }
        const updated = await eventLocationService.updateEventLocation(eventLocation);
        return response.statusCode(200).json(updated)
    } catch (error) {
        console.log(error);
        return response.status(400).json("error 13 put");
    }
});


router.delete("/:id", AuthMiddleware, async (request, response) => {
    try {
        const deleted = await eventLocationService.deleteEventLocation(request.params.id);
        if (deleted == 404) {
            return response.status(404).json("location not found");
        }
        return response.json(deleted)
    } catch (error) {
        console.log(error);
        return response.json("error al borrar una location");
    }
});

export default router;
