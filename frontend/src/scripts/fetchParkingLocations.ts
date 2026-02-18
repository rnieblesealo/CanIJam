import axios from "axios";

interface Category {
  name: string;
  uri: string;
  id: string;
  hide_on_map: string | null;
}

interface Location {
  lat: string;
  lng: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  body?: string;
  image?: string;
  url?: string;
  phone?: string;
  id?: string;
  type: string;
}

interface ApiResponse {
  categories: Category[];
  locations: Location[];
}

async function fetchParkingLocations(): Promise<Location[]> {
  const { data } = await axios.get<ApiResponse>(
    "https://www.additionfiarena.com/ajax/map/1/all"
  );

  const parkingCategory = data.categories.find(
    (c) => c.uri === "parking"
  );

  if (!parkingCategory) {
    throw new Error("Parking category not found");
  }

  const parkingId = parkingCategory.id;

  return data.locations.filter((loc) => loc.type === parkingId);
}

fetchParkingLocations()
  .then((spots) => console.log(JSON.stringify(spots, null, 2)))
  .catch((err) => console.error("Error:", err.message));
