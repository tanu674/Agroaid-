import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane as Plant, CloudRain, MapPin, Lightbulb, Calendar, BarChart2, ArrowRight, AlertCircle, ThermometerSun, Droplets } from 'lucide-react';

import { FarmData, WeatherData, SoilData } from '../types';

// Mock data
const mockFarmData: FarmData = {
  id: '1',
  name: 'Green Valley Farm',
  location: {
    latitude: 37.7749,
    longitude: -122.4194,
    address: 'Central Valley, CA'
  },
  size: 120,
  crops: [
    { cropId: '1', plantedDate: '2023-04-15', area: 40, harvestDate: '2023-07-30' },
    { cropId: '2', plantedDate: '2023-05-01', area: 50, harvestDate: '2023-09-15' },
    { cropId: '3', plantedDate: '2023-03-10', area: 30, harvestDate: '2023-08-05' }
  ],
  soilType: 'Loam'
};

const mockWeatherData: WeatherData = {
  location: 'Central Valley, CA',
  temperature: 28,
  humidity: 65,
  rainfall: 0,
  forecast: [
    { date: 'Mon', temperature: { min: 25, max: 30 }, rainfall: 0, humidity: 60 },
    { date: 'Tue', temperature: { min: 24, max: 29 }, rainfall: 0, humidity: 62 },
    { date: 'Wed', temperature: { min: 23, max: 28 }, rainfall: 5, humidity: 70 },
    { date: 'Thu', temperature: { min: 20, max: 26 }, rainfall: 10, humidity: 75 },
    { date: 'Fri', temperature: { min: 21, max: 27 }, rainfall: 2, humidity: 68 },
  ],
};

const mockSoilData: SoilData = {
  moisture: 35,
  ph: 6.8,
  nitrogen: 45,
  phosphorus: 30,
  potassium: 40,
  organicMatter: 3.5,
};

const cropNames = {
  '1': 'Tomatoes',
  '2': 'Corn',
  '3': 'Wheat'
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentDetections, setRecentDetections] = useState([
    {
      id: '1',
      date: '2023-06-15',
      crop: 'Tomato',
      disease: 'Late Blight',
      status: 'High Risk',
      image: 'https://images.pexels.com/photos/7728088/pexels-photo-7728088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      date: '2023-06-10',
      crop: 'Corn',
      disease: 'None Detected',
      status: 'Healthy',
      image: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]);

  useEffect(() => {
    document.title = 'Dashboard - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setFarmData(mockFarmData);
      setWeatherData(mockWeatherData);
      setSoilData(mockSoilData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading your farm data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-lg text-neutral-600">
            {farmData?.name} • {farmData?.location.address}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Farm Size */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium">Farm Size</h3>
            </div>
            <p className="text-3xl font-bold">{farmData?.size} acres</p>
            <p className="text-sm text-neutral-500 mt-1">
              {farmData?.crops.length} different crops
            </p>
          </div>

          {/* Weather */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                <ThermometerSun className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-lg font-medium">Current Weather</h3>
            </div>
            <p className="text-3xl font-bold">{weatherData?.temperature}°C</p>
            <p className="text-sm text-neutral-500 mt-1">
              {weatherData?.humidity}% humidity • {weatherData?.rainfall}mm rainfall
            </p>
          </div>

          {/* Soil Moisture */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                <Droplets className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-medium">Soil Moisture</h3>
            </div>
            <p className="text-3xl font-bold">{soilData?.moisture}%</p>
            <p className="text-sm text-neutral-500 mt-1">
              pH {soilData?.ph} • Loam soil type
            </p>
          </div>

          {/* Disease Risk */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-error-600" />
              </div>
              <h3 className="text-lg font-medium">Disease Risk</h3>
            </div>
            <p className="text-3xl font-bold text-error-600">High</p>
            <p className="text-sm text-neutral-500 mt-1">
              Late Blight risk in your region
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Disease Detections */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Disease Detections</h2>
                <Link 
                  to="/disease-detection" 
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDetections.map((detection) => (
                  <div key={detection.id} className="border border-neutral-200 rounded-lg overflow-hidden flex">
                    <div className="w-1/3">
                      <img 
                        src={detection.image} 
                        alt={detection.crop} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-neutral-500">{detection.date}</span>
                        <span className={`text-xs rounded-full px-2 py-0.5 ${
                          detection.status === 'High Risk' 
                            ? 'bg-error-100 text-error-700' 
                            : 'bg-success-100 text-success-700'
                        }`}>
                          {detection.status}
                        </span>
                      </div>
                      <h3 className="font-medium mb-1">{detection.crop}</h3>
                      <p className="text-sm text-neutral-700">{detection.disease}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link to="/disease-detection" className="btn-primary">
                  Scan New Image
                </Link>
              </div>
            </div>

            {/* Weather Forecast */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Weather Forecast</h2>
                <Link 
                  to="/weather-data" 
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="flex justify-between items-center">
                {weatherData?.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm font-medium mb-2">{day.date}</span>
                    <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mb-2">
                      {day.rainfall > 0 ? (
                        <CloudRain className="w-5 h-5 text-accent-600" />
                      ) : (
                        <ThermometerSun className="w-5 h-5 text-accent-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{day.temperature.max}°C</span>
                    <span className="text-xs text-neutral-500">{day.temperature.min}°C</span>
                    {day.rainfall > 0 && (
                      <span className="text-xs text-accent-600 mt-1">{day.rainfall}mm</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Crop Calendar */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Crop Calendar</h2>
                <button className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium transition-colors">
                  <span>Manage Crops</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="space-y-4">
                {farmData?.crops.map((crop, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Plant className="w-4 h-4 text-primary-600" />
                        </div>
                        <h3 className="font-medium">{cropNames[crop.cropId as keyof typeof cropNames]}</h3>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-neutral-500 mr-1" />
                        <span className="text-sm text-neutral-500">
                          Planted: {crop.plantedDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="text-sm text-neutral-600 mb-2 sm:mb-0">
                        Area: {crop.area} acres
                      </span>
                      {crop.harvestDate && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-neutral-500 mr-1" />
                          <span className="text-sm text-neutral-500">
                            Expected Harvest: {crop.harvestDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* High Priority Recommendations */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Priority Actions</h2>
                <Link 
                  to="/recommendations" 
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-error-600" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="inline-block px-2 py-0.5 bg-error-100 text-error-700 text-xs font-medium rounded-full mr-2">
                          High Priority
                        </span>
                        <span className="text-sm text-neutral-500">Today</span>
                      </div>
                      <h3 className="font-medium mb-1">Apply fungicide to prevent late blight</h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        Based on current weather conditions and disease outbreaks in your region
                      </p>
                      <Link 
                        to="/recommendations" 
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CloudRain className="w-5 h-5 text-warning-600" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="inline-block px-2 py-0.5 bg-warning-100 text-warning-700 text-xs font-medium rounded-full mr-2">
                          Medium Priority
                        </span>
                        <span className="text-sm text-neutral-500">2 days left</span>
                      </div>
                      <h3 className="font-medium mb-1">Adjust irrigation schedule</h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        Current soil moisture levels are below optimal range for your crops
                      </p>
                      <Link 
                        to="/recommendations" 
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/disease-detection" 
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                    <Plant className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Disease Detection</span>
                </Link>

                <Link 
                  to="/weather-data" 
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-accent-200 hover:bg-accent-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-3">
                    <CloudRain className="w-6 h-6 text-accent-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Weather & Soil</span>
                </Link>

                <Link 
                  to="/outbreak-map" 
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-secondary-200 hover:bg-secondary-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-secondary-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Outbreak Map</span>
                </Link>

                <Link 
                  to="/recommendations" 
                  className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg hover:border-warning-200 hover:bg-warning-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-warning-100 flex items-center justify-center mb-3">
                    <Lightbulb className="w-6 h-6 text-warning-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Recommendations</span>
                </Link>
              </div>
            </div>

            {/* Disease Risk */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Disease Risk</h2>
                <Link 
                  to="/outbreak-map" 
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium transition-colors"
                >
                  <span>View Map</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Late Blight</h3>
                    <span className="inline-block px-2 py-0.5 bg-error-100 text-error-700 text-xs font-medium rounded-full">
                      High Risk
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">
                    Current conditions are favorable for Late Blight development in Tomatoes
                  </p>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-error-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Corn Rust</h3>
                    <span className="inline-block px-2 py-0.5 bg-warning-100 text-warning-700 text-xs font-medium rounded-full">
                      Medium Risk
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">
                    Humidity levels are increasing risk for Corn Rust
                  </p>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-warning-500 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;