import axios from "axios";
import { supabase } from "./supabase";

export const peticion = async (startCoords, endCoords, GOOGLE_MAPS_APIKEY, setRouteCoordinates, decodePolyline) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const points = decodePolyline(
            response.data.routes[0].overview_polyline.points
        );
        setRouteCoordinates(points);
    } catch (error) {
        console.error("Error al obtener la ruta:", error);
    }
}

export const fetchParques = async (setParques) => {
    try {
        // 1. Traer los parques con sus barrios
        const { data: parquesData, error: errorParques } = await supabase.from('vista_parques').select('*');
        if (errorParques) throw errorParques;
        //console.log("Parques:", parquesData);
        setParques(parquesData);
    } catch (error) {
        console.error("Error fetching parques:", error);
    }
};
