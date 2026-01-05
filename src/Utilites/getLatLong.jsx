import axios from "axios";

export const getLatLongFromAddress = async (address) => {
  if (!address) return null;

  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "CarRentalApp/1.0"
        }
      }
    );

    if (!res.data.length) return null;

    return {
      Latitude: Number(res.data[0].lat),
      Longitude: Number(res.data[0].lon)
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
