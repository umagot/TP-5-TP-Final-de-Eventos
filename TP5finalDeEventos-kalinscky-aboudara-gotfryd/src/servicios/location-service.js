import BD from "../repositories/location-repositories.js";
const bd = new BD();

export default class LocationService{
    async getAllLocations(limit, offset) {
        limit = 15
        offset = 0
        const location = await bd.qAllL(limit,offset)
        const dateBd = location.map(row =>{ 
            const locO = new Object();
            locO.id = row.id,
            locO.name = row.name,
            locO.full_name = row.full_name,
            locO.latitude = row.latitude,
            locO.longitude = row.longitude,
            locO.display_order = row.display_order;
            return{
            location: locO,
        
        }  
        
    })
    return dateBd;
    }
    async locationById(id){
        const location = await bd.qLocationById(id);
        return location.map((row) => {
            return {
                id: row.id,
                name: row.name,
                id_province: row.id_province,
                latitude: row.latitude,
                longitude: row.longitude
            };
        });
    }
    async eventLocationsUserVerify(id,userId){
        const location = await bd.qLocationByIdAndUser(id,userId);
        return location.map((row)=>{
            return {
                id:row.id,
                id_location:row.id_location,
                name:row.name,
                full_address:row.full_address,
                max_capacity:row.max_capacity,
                latitude:row.latitude,
                longitude:row.longitude,
                id_creator_user:row.id_creator_user
            }
        })
    }
}