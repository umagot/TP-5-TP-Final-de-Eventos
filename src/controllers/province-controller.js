import { Router } from "express";
import provincias from "../entities/province.js"

const router = new Router();


//Consina:
//GET "/api/province"
//Retorna status 200 (OK) y el array de provincias.


router.get("/", async (req, res) => { 
    const provinces = await ProvinceService.getAllProvinces();
    res.status(200).send(provinces);
});
/*
Consina:
GET "/api/province/{id}"
Retorna status 200 (OK) en caso de que lo haya encontrado y el objeto provincia.
Retorna status 404 (Not Found) en caso de que no exista una provincia con ese id.
*/

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const province = await ProvinceService.getProvinceById(id);
    if (province) {
        res.status(200).send(province);
    } else {
        res.status(404).send("Provincia no encontrada");
    }
});

/*
Consina:
POST "/api/province"
Body:
{
"name" : "Chaco Provincia",
"full_name" : "Provincia de Chaco",
"latitude" : -24.895086288452148,
"longitude" : -59.93218994140625,
"display_order" : 100
}
Inserta una provincia.
Retorna status 201 (Created).
Retorna un status code 400 (bad request) y el texto del error, en caso de existir algún error en
las reglas de negocio (por ejemplo un nombre vacío, o menor a 3 letras).
*/

router.post("/", async (req, res) => {
    const newProvince = req.body;
    const result = await ProvinceService.addProvince(newProvince);
    if (result.success) {
        res.status(201).send(result.province);
    } else {
        res.status(400).send(result.error);
    }
});


/*
Consina:
PUT "/api/province"
Body:
{
"id" : 34,
"name" : "Provincia Modificada",
"full_name" : "Provincia Modificada",
"latitude" : -24.895086288452148,
"longitude" : -59.93218994140625,
"display_order" : 100
}
Inserta una provincia.
Retorna status 201 (Created).
Retorna status 404 (Not Found) en caso de que no exista una provincia con ese id.
Retorna un status code 400 (bad request) y el texto del error, en caso de existir algún error en
las reglas de negocio (por ejemplo un nombre vacío, o menor a 3 letras).
*/




router.put("/", async (req, res) => {
    const updatedProvince = req.body;
    const result = await ProvinceService.updateProvince(updatedProvince);
    if (result.success) {
        res.status(200).send(result.province);
    } else {
        res.status(404).send(result.error);
    }
});


/*
Consina:
DELETE "/api/province/{id}"
Retorna status 200 (OK) en caso de que lo haya encontrado y eliminado.
Retorna status 404 (Not Found) en caso de que no exista una provincia con ese id.
*/

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await ProvinceService.deleteProvince(id);
    if (result.success) {
        res.status(200).send("Provincia eliminada correctamente.");
    } else {
        res.status(404).send(result.error);
    }
});

export default router;