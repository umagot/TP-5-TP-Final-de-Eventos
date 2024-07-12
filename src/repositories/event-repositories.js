import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
    constructor() {
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }

    async qAllE(pageSize, requestedPage) {
        const validations = [];
        if (pageSize) validations.push(`LIMIT ${pageSize}`);
        if (requestedPage) validations.push(`OFFSET ${requestedPage}`);
        const sql = `
            SELECT 
                e.id, e.name, e.description, e.start_date, e.duration_in_minutes, 
                e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, 
                e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, 
                u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, 
                ec.display_order,
                json_build_object('id', el.id, 'name', el.name, 'full_address', el.full_address,
                'latitude', el.latitude, 'longitude', el.longitude, 'max_capacity', el.max_capacity) AS event_location,
                json_build_object('id', l.id, 'name', l.name, 'latitude', l.latitude, 'longitude', l.longitude) AS location,
                json_build_object('id', p.id, 'name', p.name, 'full_name', p.full_name, 'latitude', p.latitude,
                'longitude', p.longitude, 'display_order', p.display_order) AS province,
                 array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
            FROM 
                events e
            JOIN 
                users u ON e.id_creator_user = u.id
            JOIN 
                event_categories ec ON e.id_event_category = ec.id
            JOIN 
                event_locations el ON e.id_event_location = el.id
            JOIN 
                event_tags et ON e.id = et.id_event
            JOIN 
                tags t ON et.id_tag = t.id
            JOIN 
                locations l ON el.id_location = l.id
            JOIN 
                provinces p ON l.id_province = p.id
            GROUP BY 
                e.id, u.id, ec.id, el.id, l.id, p.id
            ${validations.join(' ')}
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qSearchE(name, category, startDate, tag) {
        const verify = [];
        if (name)verify.push(`e.name = '${name}'`);
        if (category) verify.push(`ec.id = '${category}'`);
        if (startDate) verify.push(`e.start_date = '${startDate}'`);
        if (tag) verify.push(`t.id = '${tag}'`);
        const sql = `
           SELECT 
                e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, 
                e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, 
                e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, 
                ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
                json_build_object('id', el.id, 'name', el.name, 'full_address', el.full_address,
                'latitude', el.latitude, 'longitude', el.longitude, 'max_capacity', el.max_capacity) AS event_location,
                json_build_object('id', l.id, 'name', l.name, 'latitude', l.latitude, 'longitude', l.longitude) AS location,
                json_build_object('id', p.id, 'name', p.name, 'full_name', p.full_name, 'latitude', p.latitude,
                'longitude', p.longitude, 'display_order', p.display_order) AS province,
                array(
                    SELECT json_build_object(
                        'id', tags.id,
                        'name', tags.name
                    )
                    FROM tags
                ) AS tags
            FROM 
                events e
            JOIN 
                users u ON e.id_creator_user = u.id
            JOIN 
                event_categories ec ON e.id_event_category = ec.id
            JOIN 
                event_locations el ON e.id_event_location = el.id
            JOIN 
                event_tags et ON e.id = et.id_event
            JOIN 
                tags t ON et.id_tag = t.id
            JOIN 
                locations l ON el.id_location = l.id
            JOIN 
                provinces p ON l.id_province = p.id
            ${verify.length > 0 ? `WHERE ${verify.join(' AND ')}` : ''}
            GROUP BY  e.id, u.id, ec.id, el.id, l.id, p.id    
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qEventD(id) {
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
        json_build_object(
            'id', el.id,
            'name', el.name,
            'full_address', el.full_address,
            'latitude', el.latitude,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS event_location,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'latitude', l.latitude,
            'longitude', l.longitude
        ) AS location,
        json_build_object(
            'id', p.id,
            'name', p.name,
            'full_name', p.full_name,
            'latitude', p.latitude,
            'longitude', p.longitude,
            'display_order', p.display_order
        ) AS province,
        array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
        FROM events e
        LEFT JOIN users u ON e.id_creator_user = u.id
        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN event_locations el ON e.id_event_location = el.id
        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id
        LEFT JOIN locations l ON el.id_location = l.id
        LEFT JOIN provinces p ON l.id_province = p.id
        WHERE e.id = '${id} 'GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qPeopleEnrolled(id, first_name, last_name, username, attended, rating) {
        console.log(first_name,last_name,username,attended,rating);
        const verify = [];
        if (first_name) verify.push(`u.first_name = '${first_name}'`);
        if (last_name)verify.push(`u.last_name = '${last_name}'`);
        if (username)verify.push(`u.username = '${username}' `);
        if (attended)verify.push(`en.attended = '${attended}'`);
        if (rating)verify.push(`en.rating = '${rating}'`);
        console.log(verify.length)
        const sql = `
            SELECT
                en.id AS enrollment_id,
                en.id_event AS event_id,
                en.id_user AS user_id,
                en.description AS enrollment_description,
                en.registration_date_time AS registration_date,
                en.attended AS attended,
                en.observations AS observations,
                en.rating AS rating,
                u.id AS user_id,
                u.first_name AS first_name,
                u.last_name AS last_name,
                u.username AS username
            FROM
                event_enrollments en
            JOIN
                users u ON en.id_user = u.id
            ${verify.length > 0 ? `WHERE ${verify.join(' AND ')}` : ''}
            `;
           
        const response = await this.client.query(sql);
        return response.rows;
        
    }

    async qCreateE(evento) {
        const sql = `
            INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ('${evento.name}', '${evento.description}', ${evento.id_event_category}, ${evento.id_event_location}, '${evento.start_date}', ${evento.duration_in_minutes}, ${evento.price}, ${evento.enabled_for_enrollment}, ${evento.max_assistance}, ${evento.id_creator_user})
        `;
    
        try {
            const answer = await this.client.query(sql);
            return answer.rows;
        } catch (error) {
            console.error('Error executing qCreateE:', error);
            throw error;
        }
    }
    

    async qUpdateEvent(evento) {
        const sql = `
            UPDATE events 
            SET name = '${evento.name}', description = '${evento.description}', id_event_category = '${evento.id_event_category}', id_event_location = '${evento.id_event_location}', start_date = '${evento.start_date}', duration_in_minutes = '${evento.duration_in_minutes}', price = '${evento.price}', enabled_for_enrollment = '${evento.enabled_for_enrollment}', max_assistance = '${evento.max_assistance}' 
            WHERE id = '${evento.id}' AND id_creator_user = '${evento.id_creator_user}'
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qDeleteEvent(id, id_creator_user) {
        const sql = `
            DELETE FROM event_enrollments WHERE id_event = '${id}'; DELETE FROM events WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
        const answer = await this.client.query(sql);
        return answer.rows;
        
    }

    async qGetMaxCapacity(idEL) {
        const sql = `
            SELECT max_capacity FROM event_locations WHERE id = '${idEL}'`;
        const maxC = await this.client.query(sql);
        return maxC.rows;
    }

    async qGetUserCreator(idEV) {
        const sql = `
            SELECT id_creator_user FROM events WHERE id = '${idEV}'`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qGetEnrolled(id) {
        const sql = `
            SELECT COUNT(*) FROM event_enrollments WHERE id_event = '${id}'
        `;
        const enrollment = await this.client.query(sql);
        return enrollment.rows;
    }

    async qRateEvent(id_event, rating, observations, id_user) {
        const sql = `
            UPDATE event_enrollments SET attended = true, rating = '${rating}', observations = '${observations}', description = '${observations}' WHERE id_event = '${id_event}' AND id_user = '${id_user}'
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qEnrollEvent(id_user, event_id) {
        const registrationDateTime = new Date().toISOString(); 
    
        console.log(id_user, event_id, registrationDateTime);
    
        const sql = `
            INSERT INTO event_enrollments (id_user, id_event, registration_date_time)
            VALUES ('${id_user}', '${event_id}', '${registrationDateTime}')`;
    
        try {
            const answer = await this.client.query(sql);
            return answer.rows;
        } catch (error) {
            console.error('Error executing qEnrollEvent:', error);
            throw error;
        }
    }
    
    async qUnrollEvent(id_user, event_id) {
        const sql = `
            DELETE FROM event_enrollments WHERE id_user = ${id_user} AND id_event = ${event_id}`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async  qVerificateU(id_user) {
        const sql = `SELECT * FROM users WHERE id = ${id_user}`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }
}
