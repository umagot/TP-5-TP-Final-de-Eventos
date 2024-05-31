//app.use("/api/province",ProvinciasRouter)
import express from "express";
//import ProvinciasRouter from "./src/controllers/province-controller.js"
import cors from "cors";
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const eventRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/event', eventRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



//Router
//provincias-controller.jd
/*import {router} from "expresss"
const router = Router();

router.put('/:id', async (req,res)=> {
let id = req.params.id;
let entidad = req.body;
const registrosAfectados = await svc.update(id, entidad);
return res.status(StatusCodes.OK).json(registrosAfectados);
})

router.get("/llamada", (req, res));

export default ProvinciasRouter;

router.put


//index
*/

