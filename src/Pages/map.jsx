import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- 1. Fix Leaflet Icons ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 2. Image Logic: Brand Logos & Fallbacks ---
const BRAND_LOGOS = {
  hertz: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Hertz_logo.svg/2560px-Hertz_logo.svg.png",
  avis: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Avis_logo_red.svg/1200px-Avis_logo_red.svg.png",
  enterprise: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Enterprise_Rent-A-Car_logo.svg/1200px-Enterprise_Rent-A-Car_logo.svg.png",
  sixt: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sixt_logo.svg/1200px-Sixt_logo.svg.png",
  europcar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Europcar_logo.svg/1200px-Europcar_logo.svg.png",
  budget: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Budget_Rent_a_Car_logo.svg/1200px-Budget_Rent_a_Car_logo.svg.png",
  alamo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Alamo_Rent_A_Car_logo.svg/1280px-Alamo_Rent_A_Car_logo.svg.png",
  zoomcar: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zoomcar_Logo.jpg",
  ola: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ola_Cabs_logo.svg/1200px-Ola_Cabs_logo.svg.png",
  uber: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png"
};

const GENERIC_IMAGE = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"; // A generic car steering wheel image

const getShopImage = (name) => {
  if (!name) return GENERIC_IMAGE;
  const lowerName = name.toLowerCase();

  // Check if the shop name contains any of our known brands
  const foundBrand = Object.keys(BRAND_LOGOS).find(brand => lowerName.includes(brand));
  
  return foundBrand ? BRAND_LOGOS[foundBrand] : GENERIC_IMAGE;
};

const SEARCH_RADIUS = 5000;

const Map = () => {
  const [mapCenter, setMapCenter] = useState([51.5074, -0.1278]); // Default London
  const [searchTerm, setSearchTerm] = useState("London, UK");
  const [rentalShops, setRentalShops] = useState([]);
  const [status, setStatus] = useState("Enter a location to see images.");

  const geocodeAddress = async (address) => {
    setStatus("Translating address...");
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapCenter([lat, lon]);
        setStatus(`Found ${data[0].display_name}. Fetching rentals...`);
        fetchCarRentals(lat, lon);
      } else {
        setStatus("Location not found.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCarRentals = async (lat, lng) => {
    const query = `
      [out:json];
      (
        node["amenity"="car_rental"](around:${SEARCH_RADIUS}, ${lat}, ${lng});
        way["amenity"="car_rental"](around:${SEARCH_RADIUS}, ${lat}, ${lng});
      );
      out center;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRentalShops(data.elements);
      setStatus(`Found ${data.elements.length} rental agencies.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) geocodeAddress(searchTerm);
  };

  useEffect(() => {
    geocodeAddress(searchTerm);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Car Rental Map with Images</h3>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '15px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city..."
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: 'white', border: 'none' }}>
          Search
        </button>
      </form>
      
      <p>Status: {status}</p>

      <div style={{ height: "500px", width: "100%", border: "2px solid #333" }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} key={mapCenter.toString()}>
          <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Circle center={mapCenter} radius={SEARCH_RADIUS} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.05 }} />

          {rentalShops.map((shop) => {
              const lat = shop.lat || (shop.center && shop.center.lat);
              const lon = shop.lon || (shop.center && shop.center.lon);
              const name = shop.tags.name || "Car Rental";
              
              // 3. GET THE IMAGE BASED ON THE NAME
              const shopImage = getShopImage(name);

              if (!lat || !lon) return null;

              return (
                <Marker key={shop.id} position={[lat, lon]}>
                  <Popup>
                    {/* IMAGE DISPLAY */}
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={shopImage} 
                            alt={name} 
                            style={{ width: '100%', height: '100px', objectFit: 'contain', marginBottom: '5px' }} 
                        />
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</div>
                        {shop.tags.phone && <div style={{ fontSize: '12px' }}>📞 {shop.tags.phone}</div>}
                        <br/>
                        <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ color: 'blue', textDecoration: 'underline' }}
                        >
                          Navigate Here
                        </a>
                    </div>
                  </Popup>
                </Marker>
              );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;