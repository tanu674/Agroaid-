export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  images: string[];
  cropTypes: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    rainfall: number;
    humidity: number;
  }[];
}

export interface SoilData {
  moisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  growingSeason: {
    start: string;
    end: string;
  };
  waterRequirements: 'low' | 'medium' | 'high';
  commonDiseases: string[];
  idealConditions: {
    soilPh: {
      min: number;
      max: number;
    };
    temperature: {
      min: number;
      max: number;
    };
  };
}

export interface FarmData {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  size: number;
  crops: {
    cropId: string;
    plantedDate: string;
    harvestDate?: string;
    area: number;
  }[];
  soilType: string;
}

export interface DiseaseOutbreak {
  id: string;
  diseaseId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  severity: number;
  reportedDate: string;
  affectedCrops: string[];
  radius: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'disease' | 'weather' | 'soil' | 'general';
  actionItems: string[];
  targetDate?: string;
}