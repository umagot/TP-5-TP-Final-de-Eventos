import BD from "../repositories/user-repositories.js";

const bd = new BD();

export default class UserService {
  async login(username, password) {
    try {
        const usuario = await bd.qSearchU(username,password);

        if (!usuario) {
            console.log("Usuario no encontrado")
        }

        if (password !== usuario.password) {
            console.log("Contraseña incorrecta")
        }
        return usuario;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw new Error('Error interno del servidor');
    }
}

async register(firstName, lastName, username, password) {
    try {
        if (firstName.length < 3 || lastName.length < 3) {
            throw new Error('Los campos first_name o last_name deben tener al menos tres caracteres.');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            throw new Error('El email es inváido.');
        }

        if (password.length < 3) {
            throw new Error('El campo password debe tener al menos tres caracteres.');
        }
        const userId = await bd.qRegisterU(firstName, lastName, username, password);
        const userRegistered = await bd.qGetUsers(username);
        return { success: true, message: 'Usuario creado con éxito.:', username};
    } catch (error) {
        console.error('Error durante el registro de usuario:', error);
        throw new Error('Error interno del servidor');
    }
}

}

