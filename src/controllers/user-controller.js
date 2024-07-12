import express from "express";
import UserService from "../servicios/user-service.js";
import generateToken from "../auth/token.js";
import AuthMiddleware from "../auth/authMiddleware.js";
import encriptartoken from "../auth/encriptartoken.js";

const router = express.Router();
const userService = new UserService();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const usuario = await userService.login(username, password);
      console.log(usuario)
      const token = await generateToken(usuario);
      await encriptartoken(token);
      return res.json({
          success: true,
          message: `¡Bienvenido ${usuario.first_name} ${usuario.last_name}!`,
          token
      });
  } catch (error) {
      console.error("Error durante el inicio de sesión:", error);

      return res.status(error.status || 500).json({
          success: false,
          message: error.message,
          token: ""
      });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  try {
      const resultadoRegistro = await userService.register(first_name, last_name, username, password);

      return res.status(201).json({
          resultadoRegistro
      });
  } catch (error) {
      console.error("Error durante el registro de usuario:", error);

      return res.status(error.status || 500).json({
          success: false,
          message: error.message
      });
  }
});

router.get("/", AuthMiddleware, async (req, res) => {
  try {
      const usuario = req.user;

      return res.json(usuario);
  } catch (error) {
      console.error("Error al obtener la información del usuario:", error.message);

      return res.status(error.status || 500).json({
          success: false,
          message: error.message
      });
  }
});

export default router;
