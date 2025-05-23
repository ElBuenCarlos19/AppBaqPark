import Constants from 'expo-constants';

const PARKS_KEY = Constants.expoConfig?.extra?.PARKS_KEY || process.env.PARKS_KEY;

export const DRAWER_MIN_HEIGHT = 150;
export const DRAWER_MAX_HEIGHT = 650;

export const GOOGLE_MAPS_APIKEY = PARKS_KEY;
