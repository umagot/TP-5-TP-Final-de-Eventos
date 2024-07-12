import {Router} from "express";
import ProvinceService from "../servicios/province-service.js";
const router = Router();
const provService = new ProvinceService()

router.get("/", async (request, response) => {
    try {
      const allProvinces = await provService.getProvince();
      return response.json(allProvinces);
    }catch (error) {
      console.error("Error al buscar provincia", error);
      return response.status(404).json("Error al buscar provincia");
    }
      
});
router.get("/:id", async (request,response) =>{
  const id = request.params.id;
  try{
    const provId = await provService.getProvinceById(id);
    console.log(provId);
    return response.json(provId);
  }catch(error){
    console.error("Error al buscar la provincia", error);
    return response.status(404).json("No se encontro la provincia");
  }
});
router.get("/:id/locations", async (request,response) =>{
  const id = request.params.id;
 
  try{
    const loc = await provService.getLocationsByProvinceId(id);
    return response.json(loc);
  }catch(error){
    console.error("error al buscar localidades:", error)
    return response.status(404).json("No se encontraron localidades");
  }
});

router.post("/", async (request, response) => {
  const name = request.body.name;
  const full_name = request.body.full_name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const display_order = request.body.display_order;
  try {
    const errorMsg = await provService.checkParameters(name,latitude,longitude);
      if (errorMsg) {
          return response.status(400).json({ message: errorMsg });
      }
    await provService.CreateProvince(name,full_name,latitude,longitude,display_order);
    return response.status(201).json("Provincia creada");
  } catch (error) {
    console.log("error al crear provincia",error);
    return response.status(400).json("error al crear provincia");
  }
});
router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const full_name = request.body.full_name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const display_order = request.body.display_order;
  try {
    provService.EditProvince(id,name,full_name,latitude,longitude,display_order);
    return response.json("Provincia editada");
  } catch(error) {
    console.log("error al editar provincia",error);
    return response.json("error al editar provincia");
  }
});
router.delete("/:id", async (request, response) => {
  const id = request.params.id
  try {
    provService.DeleteProvince(id);
    return response.json("deleted");
  } catch(error) {
    console.log("Error al borrar provincia", error);
    return response.json("Error al borrar provincia");
  }
});

export default router;
