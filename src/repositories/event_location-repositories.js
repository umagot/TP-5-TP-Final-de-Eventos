import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
    constructor() {
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }

    async qAllEL(limit,offset) {
        const sql = `SELECT * FROM event_locations limit '${limit}' offset '${offset}'`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qSerchById(id) {
        const sql = `SELECT * FROM event_locations WHERE id_location = ${id}' limit '${limit}' offset '${offset}' `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qCreteEL(eventLocation) {
        const sql = `
            INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) 
            VALUES (${eventLocation.id_location}, ${eventLocation.name}, ${eventLocation.full_address}, ${eventLocation.max_capacity}, ${eventLocation.latitude}, ${eventLocation.longitude}, ${eventLocation.id_creator_user})
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qUpdateEL(eventLocation) {
        const sql = `
            UPDATE event_locations 
            SET id_location = '${eventLocation.id_location}', name = '${eventLocation.name}', full_address = '${eventLocation.full_address}', max_capacity = '${eventLocation.max_capacity}', latitude = '${eventLocation.latitude}', longitude = '${eventLocation.longitude}' 
            WHERE id = ${eventLocation.id} AND id_creator_user = ${eventLocation.id_creator_user}`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qDeleteEL(id) {
        const sql = `DELETE FROM event_locations WHERE id = '${id}'`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }
}

