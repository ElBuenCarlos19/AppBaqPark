import axios from "axios";

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