import {Router} from "express";
import EventService from "../servicios/event-service.js";
import AuthMiddleware from "../auth/authMiddleware.js";

const eventService = new EventService();
const router = Router() 

router.get("/",  async (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  const name = request.query.name;
  const category = request.query.category;
  const startDate = request.query.startDate;
  const tag = request.query.tag;
  const url = request.originalUrl;
      try {
          const getAllEvent = await eventService.getAllEvent(limit, offset, url);
          if(name != null || category != null || startDate != null || tag != null){
            try {
                const searchEvents = await eventService.searchEvents(name, category, startDate, tag);
                return response.json(searchEvents);           
                }
            catch(error){
                console.log(error)
                return response.json(error)
            }

          }
          return response.json(getAllEvent);
      }catch(error){
          console.log("Error ej2 controller", error);
          return response.json("Error ej2 controller");
      }
    
  
})

router.get("/:id", async (request, response) => {
  const paramsId = request.params.id;
  try {
    const event = await eventService.eventDetail(paramsId);
    return response.json(event);
  } catch (error) {
    console.log("Error en el controlador de eventos:", error);
    return response.status(500).json({ error: "Error en el servidor" });
  }
});


router.get("/:id/enrollment", async(request, respose) => {
  const first_name = request.query.first_name
  const last_name = request.query.last_name
  const username = request.query.username
  const attended = request.query.attended
  const rating = request.query.rating
  if(first_name != null || last_name != null || username != null || attended != attended || attended != null || rating != null){
      try{
          
        const user = await eventService.peopleList(request.params.id, first_name, last_name, username, attended, rating)

          if(user){
              return respose.json(user)
          } else{
              console.log("Error ejercicio 5 ")
              return respose.json(" user not found")
          }
      }catch(error){
        console.error("error", error);
        console.reponse.status(404).json("not found")
      }
  }else{
    console.response.status(400).json( "los parametros son todos nulos");
  }
})

router.post("/", AuthMiddleware, async (request, response) => {
  const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance } = request.body;
  const id_creator_user = request.user.id;

  const evento = { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user };
  try {
      const errorMsg = await eventService.checkParameters(evento);
      if (errorMsg) {
          return response.status(400).json({ message: errorMsg });
      }

      const created = await eventService.createEvent(evento);
      
      if (created) {
          return response.status(201).json(`Evento creado: ${created}`);
      } else {
          return response.status(500).json({ message: "Error en la creación del evento" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Faltan parámetros para la creación del evento" });
  }
});

router.put("/", AuthMiddleware, async (request, response) => {
  const {id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance } = request.body;
  const id_creator_user = request.user.id;
  
  const evento = { id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user };

  try {
      const errorMsg = await eventService.checkParameters(evento);
      if (errorMsg) {
          return response.status(400).json({ message: errorMsg });
      }
      console.log(id)
      const oldEvent = await eventService.eventDetail(id)
      await eventService.editEvent(evento);
      const updated = await eventService.eventDetail(id)
      console.log("Evento viejo: ",oldEvent);
      console.log("Evento nuevo: ", updated)
      if (updated) {
          return response.status(200).json({oldEvent, updated});
      } else {
          return response.status(404).json({ message: "Evento no encontrado o no pertenece al usuario autenticado" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error al actualizar el evento" });
  }
});

router.delete("/:id", AuthMiddleware, async (request, response) => {
  const id = request.params.id;
  const id_creator_user = request.user.id;

  try {
      const enrolledCount = await eventService.checkEnrolled(id);
      if (enrolledCount > 0) {
          return response.status(400).json({ message: "No se puede borrar, existen inscriptos" });
      }

      const deleted = await eventService.deleteEvent(id, id_creator_user);
      if (deleted) {
          return response.status(200).json({ message: "Evento eliminado correctamente" });
      } else {
          return response.status(404).json({ message: "Evento no encontrado o no pertenece al usuario autenticado" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error al eliminar el evento" });
  }
});

router.post("/:id/enrollment", AuthMiddleware, async (request, response) => {
  const id_user = request.user.id;
  const event_id = request.params.id;

  try {
      const enrolled = await eventService.enrollEvent(id_user, event_id);
      if (enrolled) {
          return response.status(201).json({ message: "Inscrito al evento efectivamente" });
      } else {
          return response.status(400).json({ message: "Error a la hora de registrarse" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error a la hora de registrarse" });
  }
});

router.delete("/:id/enrollment", AuthMiddleware, async (request, response) => {
  const id_user = request.user.id;
  const event_id = request.params.id;

  try {
      const unrolled = await eventService.unrollEvent(id_user, event_id);
      if (unrolled) {
          return response.status(200).json({ message: "Usuario del evento eliminado correctamente" });
      } else {
          return response.status(400).json({ message: "Error al eliminar el usuario del evento" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error al eliminar el usuario del evento" });
  }
});

router.patch("/:id/enrollment/:rating", AuthMiddleware, async (request, response) => {
  const id_evento = request.params.id;
  const rating = request.params.rating;
  const observations = request.body.observations;
  const id_user = request.user.id;

  try {
      const validationResult = await eventService.verifyEnroll(id_evento, rating, id_user);
      if (validationResult !== true) {
          return response.status(400).json({ message: validationResult });
      }

      const rated = await eventService.rateEvent(id_evento, rating, observations, id_user);
      if (rated) {
          return response.status(200).json({ message: "Evento calificado correctamente" });
      } else {
          return response.status(400).json({ message: "Error al calificar el evento" });
      }
  } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error al calificar el evento" });
  }
});



export default router;