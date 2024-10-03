export const locationPermission = async (
  Location,
  setLocation,
  setErrorMsg
) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  setLocation(location);
};
