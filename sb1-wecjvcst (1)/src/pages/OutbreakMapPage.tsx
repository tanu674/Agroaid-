import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Filter, AlertCircle, Info } from 'lucide-react';
import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DiseaseOutbreak } from '../types';

// Mock data for disease outbreaks in India
const mockOutbreaks: DiseaseOutbreak[] = [
  {
    id: '1',
    diseaseId: '1',
    location: {
      latitude: 13.0827,
      longitude: 80.2707
    },
    severity: 0.8,
    reportedDate: '2023-06-15',
    affectedCrops: ['Rice', 'Sugarcane'],
    radius: 25000
  },
  {
    id: '2',
    diseaseId: '2',
    location: {
      latitude: 28.7041,
      longitude: 77.1025
    },
    severity: 0.5,
    reportedDate: '2023-06-10',
    affectedCrops: ['Wheat', 'Mustard'],
    radius: 15000
  },
  {
    id: '3',
    diseaseId: '3',
    location: {
      latitude: 22.5726,
      longitude: 88.3639
    },
    severity: 0.3,
    reportedDate: '2023-06-05',
    affectedCrops: ['Jute', 'Rice'],
    radius: 10000
  }
];

const MapCenterSetter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 5); // Adjusted zoom level for India
  }, [center, map]);
  return null;
};

const OutbreakMapPage = () => {
  const { t } = useTranslation();
  const [outbreaks, setOutbreaks] = useState<DiseaseOutbreak[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOutbreak, setSelectedOutbreak] = useState<DiseaseOutbreak | null>(null);
  const [filters, setFilters] = useState({
    disease: 'all',
    crop: 'all',
    severity: 'all',
    timeRange: '30'
  });
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India

  useEffect(() => {
    document.title = 'Disease Outbreak Map - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setOutbreaks(mockOutbreaks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 0.7) return '#ef4444'; // High severity - red
    if (severity >= 0.4) return '#f59e0b'; // Medium severity - amber
    return '#22c55e'; // Low severity - green
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading outbreak data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {t('outbreakMap.title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Monitor disease outbreaks in your region to stay informed and take preventive measures to protect your crops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-neutral-700 mr-2" />
                <h2 className="text-xl font-semibold">{t('outbreakMap.filters.title')}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="disease" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('outbreakMap.filters.disease')}
                  </label>
                  <select
                    id="disease"
                    name="disease"
                    value={filters.disease}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="all">All Diseases</option>
                    <option value="blast">Rice Blast</option>
                    <option value="blight">Wheat Blight</option>
                    <option value="rust">Stem Rust</option>
                    <option value="spot">Leaf Spot</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="crop" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('outbreakMap.filters.crop')}
                  </label>
                  <select
                    id="crop"
                    name="crop"
                    value={filters.crop}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="all">All Crops</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="cotton">Cotton</option>
                    <option value="jute">Jute</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('outbreakMap.filters.severity')}
                  </label>
                  <select
                    id="severity"
                    name="severity"
                    value={filters.severity}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="all">All Severity Levels</option>
                    <option value="high">High Severity</option>
                    <option value="medium">Medium Severity</option>
                    <option value="low">Low Severity</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeRange" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('outbreakMap.filters.timeRange')}
                  </label>
                  <select
                    id="timeRange"
                    name="timeRange"
                    value={filters.timeRange}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 3 Months</option>
                    <option value="365">Last Year</option>
                  </select>
                </div>

                <button className="btn-primary w-full mt-4">
                  Apply Filters
                </button>
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-medium mb-3">{t('outbreakMap.legend.title')}</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-error-500 mr-2"></span>
                    <span className="text-sm">{t('outbreakMap.legend.highRisk')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-warning-500 mr-2"></span>
                    <span className="text-sm">{t('outbreakMap.legend.mediumRisk')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full bg-success-500 mr-2"></span>
                    <span className="text-sm">{t('outbreakMap.legend.lowRisk')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-3">
            {/* Map */}
            <div className="card p-4 mb-8">
              <div className="bg-primary-50 p-4 rounded-lg mb-4 flex items-start">
                <Info className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-primary-700">
                  This map shows reported disease outbreaks in your region. Click on a hotspot for more details.
                  The color indicates severity, and the size shows the affected area.
                </p>
              </div>

              <div className="h-[500px] rounded-lg overflow-hidden border border-neutral-200">
                <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapCenterSetter center={mapCenter} />
                  
                  {outbreaks.map((outbreak) => (
                    <Circle
                      key={outbreak.id}
                      center={[outbreak.location.latitude, outbreak.location.longitude]}
                      radius={outbreak.radius}
                      pathOptions={{
                        color: getSeverityColor(outbreak.severity),
                        fillColor: getSeverityColor(outbreak.severity),
                        fillOpacity: 0.3,
                      }}
                      eventHandlers={{
                        click: () => {
                          setSelectedOutbreak(outbreak);
                          setMapCenter([outbreak.location.latitude, outbreak.location.longitude]);
                        },
                      }}
                    >
                      <Tooltip>
                        <div>
                          <strong>Severity: {outbreak.severity >= 0.7 ? 'High' : outbreak.severity >= 0.4 ? 'Medium' : 'Low'}</strong>
                          <br />
                          Reported: {outbreak.reportedDate}
                          <br />
                          Affected crops: {outbreak.affectedCrops.join(', ')}
                        </div>
                      </Tooltip>
                    </Circle>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Outbreak Details */}
            {selectedOutbreak ? (
              <div className="card p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <AlertCircle className={`w-6 h-6 mr-3 ${
                    selectedOutbreak.severity >= 0.7 ? 'text-error-500' : 
                    selectedOutbreak.severity >= 0.4 ? 'text-warning-500' : 'text-success-500'
                  }`} />
                  <h2 className="text-xl font-semibold">{t('outbreakMap.details.title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-neutral-500">{t('outbreakMap.details.location')}</dt>
                        <dd className="font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-neutral-400" />
                          {selectedOutbreak.location.latitude.toFixed(4)}, {selectedOutbreak.location.longitude.toFixed(4)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-neutral-500">{t('outbreakMap.details.reported')}</dt>
                        <dd className="font-medium">{selectedOutbreak.reportedDate}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-neutral-500">{t('outbreakMap.details.severity')}</dt>
                        <dd>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            selectedOutbreak.severity >= 0.7 ? 'bg-error-100 text-error-700' : 
                            selectedOutbreak.severity >= 0.4 ? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                          }`}>
                            {selectedOutbreak.severity >= 0.7 ? 'High' : selectedOutbreak.severity >= 0.4 ? 'Medium' : 'Low'} Severity
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-neutral-500">{t('outbreakMap.details.affectedCrops')}</dt>
                        <dd className="font-medium">{selectedOutbreak.affectedCrops.join(', ')}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">{t('outbreakMap.details.recommendations')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">1</span>
                        Monitor your crops regularly for early signs of disease
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">2</span>
                        Apply preventative fungicides if growing affected crops
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">3</span>
                        Improve air circulation among plants to reduce humidity
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">4</span>
                        Consider resistant varieties for future plantings
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center">
                <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Select an outbreak</h3>
                <p className="text-neutral-500">
                  Click on any hotspot on the map to view detailed information about the disease outbreak.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutbreakMapPage;