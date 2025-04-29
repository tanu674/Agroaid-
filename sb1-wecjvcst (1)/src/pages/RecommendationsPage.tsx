import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, Filter, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Recommendation } from '../types';

// Mock data for recommendations
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Apply fungicide to prevent late blight',
    description: 'Based on current weather conditions and disease outbreaks in your region, we recommend applying a preventative fungicide to your tomato and potato crops.',
    priority: 'high',
    category: 'disease',
    actionItems: [
      'Purchase copper-based fungicide or chlorothalonil',
      'Apply in the morning when dew has dried',
      'Ensure complete coverage of leaves and stems',
      'Reapply after rain or every 7-10 days during high-risk periods'
    ],
    targetDate: '2023-06-25'
  },
  {
    id: '2',
    title: 'Adjust irrigation schedule',
    description: 'Current soil moisture levels are below optimal range for your crops. Increase irrigation frequency to prevent water stress.',
    priority: 'medium',
    category: 'weather',
    actionItems: [
      'Increase irrigation by 20%',
      'Water during early morning to minimize evaporation',
      'Monitor soil moisture levels daily',
      'Consider adding mulch to retain soil moisture'
    ],
    targetDate: '2023-06-20'
  },
  {
    id: '3',
    title: 'Apply nitrogen fertilizer',
    description: 'Soil tests indicate nitrogen deficiency. Apply fertilizer to support healthy crop growth.',
    priority: 'medium',
    category: 'soil',
    actionItems: [
      'Purchase balanced N-P-K fertilizer with higher nitrogen content',
      'Apply at recommended rates based on crop type',
      'Incorporate into soil near plant roots',
      'Water thoroughly after application'
    ],
    targetDate: '2023-06-22'
  },
  {
    id: '4',
    title: 'Prepare for upcoming heat wave',
    description: 'Weather forecast indicates temperatures exceeding 95°F (35°C) next week. Take preventative measures to protect your crops.',
    priority: 'high',
    category: 'weather',
    actionItems: [
      'Set up shade cloth for sensitive crops',
      'Adjust irrigation to water more frequently',
      'Apply mulch to retain soil moisture',
      'Harvest ripe produce before the heat wave arrives'
    ],
    targetDate: '2023-06-18'
  },
  {
    id: '5',
    title: 'Rotate crops for next season',
    description: 'Plan crop rotation to prevent pest and disease buildup in the soil and improve soil health.',
    priority: 'low',
    category: 'general',
    actionItems: [
      'Map current crop locations',
      'Research suitable rotation crops',
      'Create rotation plan for next 3 seasons',
      'Order seeds for next season'
    ]
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  disease: (
    <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  weather: (
    <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 13.5C2 11.0147 4.01472 9 6.5 9C6.93695 9 7.35628 9.06547 7.75 9.18491M7.75 9.18491C8.29157 7.32901 10.0256 6 12 6C14.2091 6 16 7.79086 16 10C16 10.0688 15.9978 10.1372 15.9935 10.2051M7.75 9.18491C7.52422 9.24769 7.30539 9.33025 7.0981 9.43133M15.9935 10.2051C17.7868 10.3372 19.2 11.8471 19.2 13.6667C19.2 15.5866 17.6866 17.1 15.7667 17.1H7.3C4.88614 17.1 2.9 15.1139 2.9 12.7C2.9 10.9097 4.02519 9.36445 5.62344 8.78423M15.9935 10.2051C15.9978 10.1372 16 10.0688 16 10C16 9.29749 15.8198 8.63519 15.5019 8.05651M5.5 13L8 15.5L10.5 13M16 18.5L13.5 16L11 18.5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  soil: (
    <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22C4.34315 22 3 20.6569 3 19C3 17.8394 3.59761 16.8207 4.5 16.2495M6 22H18C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16H10.5M6 22C6 22 4.5 22 3 19.5C1.5 17 3 13.5 3 13.5M10.5 16L14.5 7M10.5 16H4.5M3 13.5C3 13.5 1.5 9 5 7C8.5 5 14.5 7 14.5 7M3 13.5C3 13.5 7.5 12 10.5 13.5M14.5 7C14.5 7 15.5 10.5 14.5 13.5C13.5 16.5 10.5 16 10.5 16" stroke="#6E7A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  general: (
    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#2D7737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
};

const RecommendationsPage = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    searchQuery: ''
  });
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = 'Recommendations - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDelete = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  const handleMarkComplete = (id: string) => {
    // In a real app, this would update the status in the backend
    handleDelete(id);
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (filters.priority !== 'all' && rec.priority !== filters.priority) return false;
    if (filters.category !== 'all' && rec.category !== filters.category) return false;
    if (filters.searchQuery && !rec.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {t('recommendations.title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Personalized recommendations based on your crop types, location, and current conditions to help optimize your farming practices.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-neutral-700 mr-2" />
            <h2 className="text-xl font-semibold">Filter Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="all">All Categories</option>
                <option value="disease">Disease Prevention</option>
                <option value="weather">Weather Response</option>
                <option value="soil">Soil Management</option>
                <option value="general">General Farming</option>
              </select>
            </div>

            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-neutral-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="searchQuery"
                name="searchQuery"
                placeholder="Search recommendations..."
                value={filters.searchQuery}
                onChange={handleFilterChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <div key={rec.id} className="card overflow-hidden transition-all animate-fade-in">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start">
                    {/* Icon */}
                    <div className="mb-4 md:mb-0 md:mr-4">
                      {categoryIcons[rec.category]}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'high' ? 'High Priority' : 
                           rec.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                        </span>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                          {rec.category === 'disease' ? 'Disease Prevention' : 
                           rec.category === 'weather' ? 'Weather Response' : 
                           rec.category === 'soil' ? 'Soil Management' : 'General Farming'}
                        </span>
                        {rec.targetDate && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {rec.targetDate}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                      <p className="text-neutral-600 mb-4">{rec.description}</p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => toggleExpand(rec.id)}
                          className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                          {expandedIds[rec.id] ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              <span>Hide Details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              <span>View Details</span>
                            </>
                          )}
                        </button>
                        <button 
                          onClick={() => handleMarkComplete(rec.id)}
                          className="flex items-center text-success-600 hover:text-success-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>{t('recommendations.markComplete')}</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(rec.id)}
                          className="flex items-center text-neutral-600 hover:text-error-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedIds[rec.id] && (
                  <div className="bg-neutral-50 p-6 border-t border-neutral-200 animate-slide-up">
                    <h4 className="font-medium mb-3">{t('recommendations.actionItems')}</h4>
                    <ul className="space-y-2 mb-4">
                      {rec.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17157 16.8284L12 14M14.8284 11.1716L12 14M12 14L9.17157 11.1716M12 14L14.8284 16.8284M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No recommendations found</h3>
              <p className="text-neutral-500">
                Try adjusting your filters to see more recommendations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;