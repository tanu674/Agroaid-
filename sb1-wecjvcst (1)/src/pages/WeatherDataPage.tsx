import { useState, useEffect } from 'react';
import { MapPin, Droplets, Thermometer, Wind, Sunrise, Cloud } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { WeatherData, SoilData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const mockWeatherData: WeatherData = {
  location: 'Chennai',
  temperature: 34,
  humidity: 65,
  rainfall: 0,
  forecast: [
    { date: 'Mon', temperature: { min: 25, max: 30 }, rainfall: 0, humidity: 60 },
    { date: 'Tue', temperature: { min: 24, max: 29 }, rainfall: 0, humidity: 62 },
    { date: 'Wed', temperature: { min: 23, max: 28 }, rainfall: 5, humidity: 70 },
    { date: 'Thu', temperature: { min: 20, max: 26 }, rainfall: 10, humidity: 75 },
    { date: 'Fri', temperature: { min: 21, max: 27 }, rainfall: 2, humidity: 68 },
    { date: 'Sat', temperature: { min: 23, max: 28 }, rainfall: 0, humidity: 65 },
    { date: 'Sun', temperature: { min: 24, max: 30 }, rainfall: 0, humidity: 60 },
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

const WeatherDataPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Central Valley, CA');

  useEffect(() => {
    document.title = 'Weather & Soil Data - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setWeatherData(mockWeatherData);
      setSoilData(mockSoilData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
    // In a real app, we would fetch new data here
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Temperature chart data
  const temperatureChartData = {
    labels: weatherData?.forecast.map(day => day.date) || [],
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: weatherData?.forecast.map(day => day.temperature.max) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Min Temperature (°C)',
        data: weatherData?.forecast.map(day => day.temperature.min) || [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Rainfall chart data
  const rainfallChartData = {
    labels: weatherData?.forecast.map(day => day.date) || [],
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: weatherData?.forecast.map(day => day.rainfall) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Soil data chart
  const soilChartData = {
    labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter'],
    datasets: [
      {
        label: 'Soil Composition (%)',
        data: soilData ? [soilData.nitrogen, soilData.phosphorus, soilData.potassium, soilData.organicMatter * 10] : [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Weather & Soil Data
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Access real-time weather information and soil data to optimize your farming decisions and protect your crops.
          </p>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <div className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center text-neutral-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Location:</span>
              </div>
              <select 
                value={selectedLocation} 
                onChange={handleLocationChange}
                className="input max-w-xs"
              >
                <option value="Central Valley, CA">Central Valley, CA</option>
                <option value="Sacramento, CA">Sacramento, CA</option>
                <option value="Fresno, CA">Fresno, CA</option>
                <option value="Bakersfield, CA">Bakersfield, CA</option>
              </select>
              <button className="btn-primary max-w-xs">Update Location</button>
            </div>
          </div>
        </div>

        {/* Current Weather */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Conditions</h2>
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Temperature */}
              <div className="bg-gradient-to-br from-orange-100 to-amber-50 rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mr-4">
                  <Thermometer className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Temperature</p>
                  <p className="text-3xl font-bold text-neutral-800">{weatherData?.temperature}°C</p>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-gradient-to-br from-blue-100 to-sky-50 rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mr-4">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Humidity</p>
                  <p className="text-3xl font-bold text-neutral-800">{weatherData?.humidity}%</p>
                </div>
              </div>

              {/* Rainfall */}
              <div className="bg-gradient-to-br from-teal-100 to-emerald-50 rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mr-4">
                  <Cloud className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Rainfall</p>
                  <p className="text-3xl font-bold text-neutral-800">{weatherData?.rainfall} mm</p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="bg-gradient-to-br from-violet-100 to-purple-50 rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mr-4">
                  <Sunrise className="w-8 h-8 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Last Updated</p>
                  <p className="text-xl font-bold text-neutral-800">Today, 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Temperature Forecast */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Temperature Forecast (7 Days)</h3>
            <Line data={temperatureChartData} options={chartOptions} />
          </div>

          {/* Rainfall Forecast */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Rainfall Forecast (7 Days)</h3>
            <Line data={rainfallChartData} options={chartOptions} />
          </div>
        </div>

        {/* Soil Data */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Soil Data</h2>
          <div className="card p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Line data={soilChartData} options={chartOptions} height={100} />
              </div>
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium mb-4">Soil Properties</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Moisture:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${soilData?.moisture}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.moisture}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">pH Level:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(soilData?.ph || 0) / 14 * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.ph}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Nitrogen:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${soilData?.nitrogen}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.nitrogen}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Phosphorus:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${soilData?.phosphorus}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.phosphorus}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Potassium:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${soilData?.potassium}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.potassium}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Organic Matter:</span>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(soilData?.organicMatter || 0) * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{soilData?.organicMatter}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations based on data */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
          <div className="card p-6">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                <Lightbulb className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Weather Insights</h3>
                <p className="text-neutral-600">
                  Temperatures are expected to remain high over the next week with a chance of rain on Wednesday.
                  Consider adjusting your irrigation schedule to account for both the heat and upcoming rainfall.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <Droplets className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Soil Recommendations</h3>
                <p className="text-neutral-600">
                  Your soil's phosphorus levels are slightly low. Consider applying a phosphorus-rich fertilizer
                  to support root development and flowering in your crops.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center mr-4">
                <AlertCircle className="w-5 h-5 text-error-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Disease Risk Alert</h3>
                <p className="text-neutral-600">
                  The combination of high humidity and warm temperatures increases the risk of fungal diseases.
                  Monitor your crops closely and consider preventative fungicide application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataPage;