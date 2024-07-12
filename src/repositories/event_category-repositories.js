import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async qGetCategory(limit,offset){
        const sql = `SELECT * FROM event_categories LIMIT ${limit} OFFSET ${offset}`;
        const response = await this.client.query(sql);
        return response.rows;
    }
    async qGetCbyId(id){
        const sql = `SELECT * FROM event_categories WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response.rows;
    }
    async qCreateCategory(name,display_order){
        const sql = `INSERT INTO event_categories (name,display_order) VALUES ('${name}','${display_order}')`;
        const respuesta = await this.client.query(sql);
        console.log(respuesta)
        return respuesta;
    }async qUpdateCategory(id,name,display_order){
        const sql = `UPDATE event_categories SET id = '${id}', name = '${name}', display_order = '${display_order}' WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response;
    }
    async qDeleteCategory(id){
        const sql = `DELETE FROM event_categories WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response;
    }
}