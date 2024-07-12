import BD from "../repositories/provinces-repositories.js";
const bd = new BD();

export default class ProvinceService {
    async getProvince() {
        const province = await bd.qGetProvince();
        const provArray = province.map((row) => {
            var provObj = new Object()
            provObj.id = row.id;
            provObj.name = row.name;
            provObj.full_name = row.full_name;
            provObj.latitude = row.latitude;
            provObj.longitude = row.longitude;
            provObj.display_order = row.display_order;
        return{
            provinces: provObj
        }
    })
    return provArray
    }

    async getProvinceById(id){
        const province = await bd.qGetPbyId(id)
       
        return  province.map((row) =>{
            return {
                id: row.id,
                name: row.name,
                full_name: row.full_name,
                latitude: row.latitude,
                longitude: row.longitude,
                display_order: row.display_order
            }
           });
    
        
    }

    async getLocationsByProvinceId(id){
        const limit = 15;
        const offset = 0;
        const loc = await bd.qGetLocations(id,limit,offset)
        const dateBd = loc.map((row) =>{
        var locObj = new Object();
        locObj.id = row.id;
        locObj.name = row.name;
        locObj.id_province = row.id_province;
        locObj.latitude = row.latitude;
        locObj.longitude = row.longitude;
        return{
            locations: locObj
        }
       })
       console.log(dateBd);
       return dateBd;
    }
    CreateProvince(name, full_name, latitude, longitude, display_order){
        try{
            return bd.qCreateProvince(name, full_name, latitude, longitude, display_order)
        }catch(error){
            console.log("Error al crear la provincia: ", error)
            throw error;
        }
        
    }
    EditProvince(id, name, full_name, latitude, longitude, display_order){
        return bd.qUpdateProvince(id, name, full_name, latitude, longitude, display_order)
    }
    DeleteProvince(id){
        return bd.qDeleteProvince(id);
    } 

    async checkParameters(name,latitude,longitude){
        if(name.length < 3){
            return "Nombre invalido";
        } 
        if(isNaN(latitude)){
            return "Ingreso invalido en latitud, proba usando valores numericos";
        }
        if(isNaN(longitude)){
            return "Ingreso incorrecto en longitud, proba usando valores numericos"
        }


    }
   
}