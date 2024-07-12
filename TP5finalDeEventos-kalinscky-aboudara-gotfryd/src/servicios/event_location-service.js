import BD from "../repositories/event_location-repositories.js";

const bd = new BD();

export default class EventLocationService {
    async verifyLocation(eventLocation) {
        if (!eventLocation.name || eventLocation.name.length < 3) {
            return 400
        }
        if (eventLocation.full_address == null || eventLocation.full_address.length < 3) {
            return 400
        }
        if (eventLocation.id_location == null) {
            const eventId = await bd.qSerchById(eventLocation.id)
            if(!eventId){
            return 404
            } 
        }
        if (eventLocation.max_capacity <= 0) {
            return 400;
        }
        return "";
    }

    async createEventLocation(eventLocation) {
        return bd.qCreteEL(eventLocation);
    }

    async updateEventLocation(eventLocation) {
        const existingLocation = await bd.qUpdateEL(eventLocation.id_creator_user, eventLocation.id);
        if (!existingLocation.length) {
            return false;
        }
        return bd.qUpdateEL(eventLocation);
    }

    async deleteEventLocation(id) {
        const existingLocation = await bd.qAllEL(id,0,0);
        if (!existingLocation.length) {
            return 404
        }
        return bd.qDeleteEL(id);
    }

    async getEventLocations(limit,offset,path) {
        const evLocation = await bd.qAllEL(limit,offset);
        const parse = evLocation.map(row => ({
            id: row.id,
            id_location: row.id_location,
            name: row.name,
            full_address: row.full_address,
            max_capacity: row.max_capacity,
            latitude: row.latitude,
            longitude: row.longitude,
            id_creator_user: row.id_creator_user
        }));
        return({
            collection:parse,
            pagination: {
                limit: limited,
                offset: offseted,
                nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                total: totalCount
            },
        })
    }

    async getEventLocationById(id, limit, offset,path) {
        const evLocation = await bd.qSerchById(id,limit,offset);
        const totalCount = evLocation.length;
        const parse = evLocation.map(row => ({
            id: row.id,
            id_location: row.id_location,
            name: row.name,
            full_address: row.full_address,
            max_capacity: row.max_capacity,
            latitude: row.latitude,
            longitude: row.longitude,
            id_creator_user: row.id_creator_user
        }));
        return({
            collection:parse,
            pagination: {
                limit: limited,
                offset: offseted,
                nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                total: totalCount
            },
        })
    }
}
