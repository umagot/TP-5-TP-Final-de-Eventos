import provincias from "../entities/province.js";
import ValidacionesHelper from "../helpers/validaciones-helper.js";

class ProvinceService {

    getAllAsync = () => {
        //creamos array vacio
        // recibimos datos de llamada
        // poblamos el array 
    }
    getAllProvinces() {
        return provincias;
    }

    getProvinceById(id) {
        return provincias.find(provincia => provincia.id === parseInt(id));
    }

    addProvince(newProvince) {
        // Validar nueva provincia
        const validationError = this.validateProvince(newProvince);
        if (validationError) {
            return { success: false, error: validationError };
        }
        // Generar ID para la nueva provincia
        const id = provincias.length + 1;
        newProvince.id = id;
        // Agregar nueva provincia a la lista
        provincias.push(newProvince);
        return { success: true, province: newProvince };
    }

    updateProvince(updatedProvince) {
        // Validar provincia existente
        const existingProvince = this.getProvinceById(updatedProvince.id);
        if (!existingProvince) {
            return { success: false, error: "No existe una provincia con ese ID." };
        }
        // Validar datos actualizados
        const validationError = this.validateProvince(updatedProvince);
        if (validationError) {

