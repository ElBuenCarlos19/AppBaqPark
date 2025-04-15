import { PanResponder } from "react-native";
import { Animated } from "react-native";
import { DRAWER_MAX_HEIGHT, DRAWER_MIN_HEIGHT, GOOGLE_MAPS_APIKEY } from "./constants";
import * as Location from "expo-location";
import { fetchParques, peticion } from "../util/fetchs.js";


export const operationPoints = (t) => {
    let points = [];
    let index = 0,
        len = t.length;
    let lat = 0,
        lng = 0;

    while (index < len) {
        let b,
            shift = 0,
            result = 0;
        do {
            b = t.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = t.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({
            latitude: lat / 1e5,
            longitude: lng / 1e5,
        });
    }

    return points;
};

export const operationPanResponder = (animation) => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
        const newHeight = DRAWER_MIN_HEIGHT - gestureState.dy;
        if (
            newHeight >= DRAWER_MIN_HEIGHT &&
            newHeight <= DRAWER_MAX_HEIGHT
        ) {
            animation.setValue(newHeight);
        }
    },
    onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < 0) {
            Animated.spring(animation, {
                toValue: DRAWER_MAX_HEIGHT,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.spring(animation, {
                toValue: DRAWER_MIN_HEIGHT,
                useNativeDriver: false,
            }).start();
        }
    },
});

export const operationToggleDrawer = (animation) => {
    Animated.spring(animation, {
        toValue:
            (animation as any)._value === DRAWER_MAX_HEIGHT
                ? DRAWER_MIN_HEIGHT
                : DRAWER_MAX_HEIGHT,
        useNativeDriver: false,
    }).start();
}

export const operationRequestLocation = async (setErrorMsg, setLocation, setIsLoading) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
    }
    let locationWatcher = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000,
            distanceInterval: 10,
        },
        async (newLocation) => {
            setLocation(newLocation);
        }
    );

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    return () => {
        locationWatcher.remove();
    };
};

export const operationHaverSineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km

    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export const operationFindNearestPark = (userCoords, parks, haversineDistance) => {
    {
        let minDistance = Infinity;
        let closestPark = null;

        parks.forEach((park) => {
            if (park.latitude !== "notfound" && park.longitude !== "notfound") {
                const parkCoords = {
                    latitude: parseFloat(park.latitude),
                    longitude: parseFloat(park.longitude),
                };

                const distance = haversineDistance(userCoords, parkCoords);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPark = park;
                }
            }
        });

        return closestPark;
    }
}
export const operationFetchRouter = (startCoords, park, setRouteCoordinates, decodePolyline) => {
    const endCoords = {
        latitude: parseFloat(park.latitude),
        longitude: parseFloat(park.longitude),
    };
    peticion(
        startCoords,
        endCoords,
        GOOGLE_MAPS_APIKEY,
        setRouteCoordinates,
        decodePolyline
    )
}

export const operationHandleNearestParkPress = (selectedButton, setSelectedButton, setNearestPark, setRouteCoordinates, findNearestPark, location, memorizedParques, fetchRoute) => {
    if (location) {
        if (selectedButton === "cercano") {
            setSelectedButton(null);
            setNearestPark(null);
            setRouteCoordinates([]);
        } else {
            const closest = findNearestPark(location.coords, memorizedParques);
            setNearestPark(closest);
            setSelectedButton("cercano");
            if (closest) {
                fetchRoute(location.coords, closest);
            }
        }
    }
}

export const operationGetParques = async (setParques) => {
    await fetchParques(setParques);
}

