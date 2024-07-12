import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
  constructor() {
    this.client = new pg.Client(Bd_config);
    this.client.connect();
  }

 async qSearchU(username, password) {
    const sql = `
        SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    try {
        const respuesta = await this.client.query(sql);
        return respuesta.rows[0];
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        throw new Error("Error al autenticar usuario");
    }
}

async qRegisterU(first_name, last_name, username, password) {
    const num = await this.qGetUserCount()
    let id = parseInt(num[0].count)
    const sql = `INSERT INTO users (id, first_name, last_name, username, password)
        VALUES ('${id+1}', '${first_name}', '${last_name}', '${username}', '${password}')
        RETURNING id`;
    try {
        const answer = await this.client.query(sql);
        return answer.rows[0].id;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("Error al registrar usuario");
    }
}

async qGetUsers(username) {
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    const answer = await this.client.query(sql);
    return answer.rows
    
}
async qGetUserCount(){
    const sql = `SELECT COUNT(*) FROM users`;
    const answer = await this.client.query(sql);
    return answer.rows
}
}