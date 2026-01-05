import React, { useState, useEffect } from 'react';
import { assets } from '../../src/assets/assets';
import Card from '../components/card';
import { motion } from 'motion/react';

// --- ICONS & MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaTimes, FaFilter, FaCheck } from 'react-icons/fa';

// --- 1. DEFINE COLORED ICONS (SVG) ---
const createColorIcon = (color) => new L.DivIcon({
  className: 'custom-pin',
  html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 27 15 27s15-18.716 15-27C30 6.716 23.284 0 15 0z" fill="${color}"/>
    <circle cx="15" cy="15" r="6" fill="white"/>
  </svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -45]
});

const greenIcon = createColorIcon('#00C851');  // < 2km
const orangeIcon = createColorIcon('#FFBB33'); // 2km - 5km
const redIcon = createColorIcon('#FF4444');    // > 5km

// Fix default blue icon for User Location
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// --- 2. HELPER: DISTANCE CALCULATION ---
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// --- 3. PROCESS CAR DATA WITH DISTANCE ---
const processCarDataWithDistance = (cars, userLat, userLng) => {
  return cars
    .filter(car => car.location && car.location.Latitude && car.location.Longitude)
    .map(car => {
      const dist = getDistance(
        userLat, 
        userLng, 
        car.location.Latitude, 
        car.location.Longitude
      );
      return {
        id: car._id,
        name: `${car.brand} ${car.model}`,
        lat: car.location.Latitude,
        lon: car.location.Longitude,
        distanceKm: dist,
        carData: car
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
};

// --- 4. MAP MODAL ---
const RentalMapModal = ({ isOpen, onClose, allCars }) => {
  const [userLoc, setUserLoc] = useState(null);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    if (isOpen && allCars.length > 0) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = [pos.coords.latitude, pos.coords.longitude];
          setUserLoc(loc);
          
          // Process cars with distance calculation
          const processedShops = processCarDataWithDistance(allCars, loc[0], loc[1]);
          setShops(processedShops);
        },
        () => {
          // Fallback (Patna, Bihar based on user location)
          const defaultLoc = [25.5941, 85.1376];
          setUserLoc(defaultLoc);
          
          const processedShops = processCarDataWithDistance(allCars, defaultLoc[0], defaultLoc[1]);
          setShops(processedShops);
        }
      );
    }
  }, [isOpen, allCars]);

  const getIcon = (dist) => {
    if (dist < 2) return greenIcon;
    if (dist < 5) return orangeIcon;
    return redIcon;
  };

  if (!isOpen || !userLoc) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaMapMarkerAlt /> Available Cars Nearby
            </h2>
            <p className="text-blue-100 text-sm mt-1">Find the closest rentals to your location</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Legend */}
        <div className="px-6 py-3 bg-gray-50 flex gap-6 text-sm border-b">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#00C851' }}></div>
            <span>&lt; 2km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFBB33' }}></div>
            <span>2-5km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF4444' }}></div>
            <span>&gt; 5km</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            center={userLoc}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User Location */}
            <Marker position={userLoc}>
              <Popup>
                <div className="text-center font-semibold">
                  📍 You are here
                </div>
              </Popup>
            </Marker>

            {/* 5km radius circle */}
            <Circle
              center={userLoc}
              radius={5000}
              pathOptions={{
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.1
              }}
            />

            {/* Car Markers */}
            {shops.map(shop => (
              <Marker
                key={shop.id}
                position={[shop.lat, shop.lon]}
                icon={getIcon(shop.distanceKm)}
              >
                <Popup>
                  <div className="font-semibold text-gray-800">{shop.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    📍 {shop.distanceKm.toFixed(2)} km away
                  </div>
                  {shop.carData && (
                    <div className="text-xs text-gray-500 mt-2">
                      <div>💺 {shop.carData.seating_capacity} seats</div>
                      <div>⛽ {shop.carData.fuel_type}</div>
                      <div>💰 ₹{shop.carData.pricePerDay}/day</div>
                    </div>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

// --- SIDEBAR & MAIN PAGE ---
const FilterSection = ({ title, options, selectedFilters, onFilterChange, filterKey }) => (
  <div className="mb-6">
    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
      <FaFilter className="text-blue-600" size={14} />
      {title}
    </h3>
    <div className="space-y-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 rounded" 
            checked={selectedFilters[filterKey]?.includes(opt) || false}
            onChange={() => onFilterChange(filterKey, opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

function CarList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({
    brand: [],
    fuelType: [],
    transmission: [],
    seating: [],
    priceRange: []
  });

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/admin/all-cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        
        // Check if data is an array, if not, it might be wrapped in an object
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data.allCar && Array.isArray(data.allCar)) {
          setCars(data.allCar);
        } else if (data.cars && Array.isArray(data.cars)) {
          setCars(data.cars);
        } else if (data.data && Array.isArray(data.data)) {
          setCars(data.data);
        } else {
          console.error('Unexpected API response format:', data);
          setCars([]);
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching cars:', err);
        setCars([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => {
      const currentFilters = prev[filterKey] || [];
      const isSelected = currentFilters.includes(value);
      
      return {
        ...prev,
        [filterKey]: isSelected 
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      brand: [],
      fuelType: [],
      transmission: [],
      seating: [],
      priceRange: []
    });
    setSearchTerm("");
  };

  // Apply filters and search
  const filteredCars = cars.filter((car) => {
    // Search filter
    if (searchTerm !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        (car.brand?.toLowerCase().includes(lowerSearch)) ||
        (car.model?.toLowerCase().includes(lowerSearch)) ||
        (car.category?.toLowerCase().includes(lowerSearch));
      
      if (!matchesSearch) return false;
    }

    // Brand filter
    if (filters.brand.length > 0) {
      if (!filters.brand.some(brand => car.brand?.trim().toLowerCase() === brand.toLowerCase())) {
        return false;
      }
    }

    // Fuel Type filter
    if (filters.fuelType.length > 0) {
      if (!filters.fuelType.some(fuel => car.fuel_type?.trim().toLowerCase() === fuel.toLowerCase())) {
        return false;
      }
    }

    // Transmission filter
    if (filters.transmission.length > 0) {
      if (!filters.transmission.some(trans => car.transmission?.trim().toLowerCase() === trans.toLowerCase())) {
        return false;
      }
    }

    // Seating filter
    if (filters.seating.length > 0) {
      const carSeats = car.seating_capacity;
      const matchesSeating = filters.seating.some(seatingOption => {
        if (seatingOption === '4 Seater') return carSeats === 4;
        if (seatingOption === '5 Seater') return carSeats === 5;
        if (seatingOption === '7 Seater') return carSeats === 7;
        if (seatingOption === '8+ Seater') return carSeats >= 8;
        return false;
      });
      if (!matchesSeating) return false;
    }

    // Price Range filter
    if (filters.priceRange.length > 0) {
      const price = car.pricePerDay;
      const matchesPrice = filters.priceRange.some(range => {
        if (range === 'Under ₹1000') return price < 1000;
        if (range === '₹1000-₹2000') return price >= 1000 && price <= 2000;
        if (range === '₹2000-₹5000') return price > 2000 && price <= 5000;
        if (range === 'Above ₹5000') return price > 5000;
        return false;
      });
      if (!matchesPrice) return false;
    }

    return true;
  });

  // Apply sorting
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'priceLowToHigh') {
      return a.pricePerDay - b.pricePerDay;
    } else if (sortBy === 'priceHighToLow') {
      return b.pricePerDay - a.pricePerDay;
    }
    return 0; // recommended (default order)
  });

  return (
    <>
      <RentalMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} allCars={cars} />

      <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-80 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Filters
            </h2>
            {(filters.brand.length > 0 || filters.fuelType.length > 0 || 
              filters.transmission.length > 0 || filters.seating.length > 0 || 
              filters.priceRange.length > 0) && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          <FilterSection
            title="Brand"
            options={['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota']}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            filterKey="brand"
          />

          <FilterSection
            title="Fuel Type"
            options={['Petrol', 'Diesel', 'Electric', 'CNG']}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            filterKey="fuelType"
          />

          <FilterSection
            title="Transmission"
            options={['Manual', 'Automatic']}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            filterKey="transmission"
          />

          <FilterSection
            title="Seating Capacity"
            options={['4 Seater', '5 Seater', '7 Seater', '8+ Seater']}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            filterKey="seating"
          />

          <FilterSection
            title="Price Range"
            options={['Under ₹1000', '₹1000-₹2000', '₹2000-₹5000', 'Above ₹5000']}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            filterKey="priceRange"
          />
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
               Find Your Perfect Drive
            </h1>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by brand, model, or category..."
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                onClick={() => setIsMapOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
              >
                <FaMapMarkerAlt /> Show on Map
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <span className="font-semibold">{sortedCars.length} Cars Available</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSortBy('recommended')}
                  className={`px-4 py-2 rounded transition ${
                    sortBy === 'recommended' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Recommended
                </button>
                <button 
                  onClick={() => setSortBy('priceLowToHigh')}
                  className={`px-4 py-2 rounded transition ${
                    sortBy === 'priceLowToHigh' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Price: Low to High
                </button>
                <button 
                  onClick={() => setSortBy('priceHighToLow')}
                  className={`px-4 py-2 rounded transition ${
                    sortBy === 'priceHighToLow' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Price: High to Low
                </button>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading cars...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-semibold">Error: {error}</p>
              <p className="text-gray-600 mt-2">Please make sure the backend server is running on localhost:5000</p>
            </div>
          )}

          {/* Cars Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {!loading && !error && sortedCars.map((car) => {
              // Create a clean car object without nested objects
              const cleanCarObj = {
                ...car,
                location: car.location?.address || 'Location not available',
                latitude: car.location?.Latitude,
                longitude: car.location?.Longitude
              };
              
              return (
                <Card
                  key={car._id}
                  carObj={cleanCarObj}
                />
              );
            })}
          </motion.div>

          {!loading && !error && sortedCars.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 font-semibold">
                No cars found matching your criteria.
              </p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default CarList;