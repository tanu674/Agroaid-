import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ChevronDown, ChevronUp, Camera, Image, Info } from 'lucide-react';
import { Disease } from '../types';

// Mock data for disease detection results
const mockDiseaseResults: Disease[] = [
  {
    id: '1',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'Late blight is a potentially devastating disease of potato and tomato, infecting leaves, stems, and fruits.',
    symptoms: [
      'Dark, water-soaked spots on leaves',
      'White, fuzzy growth on leaf undersides',
      'Rapidly spreading brown lesions',
      'Dry, brown tissue on fruits'
    ],
    treatments: [
      'Apply fungicides preventatively',
      'Improve air circulation around plants',
      'Remove and destroy infected plants',
      'Use resistant varieties when possible'
    ],
    images: [
      'https://images.pexels.com/photos/7728088/pexels-photo-7728088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    cropTypes: ['Tomato', 'Potato'],
    severity: 'high'
  }
];

const DiseaseDetectionPage = () => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedDisease, setDetectedDisease] = useState<Disease | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('symptoms');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Disease Detection - AgroAid';
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Simulate analysis
      setIsAnalyzing(true);
      setDetectedDisease(null);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setDetectedDisease(mockDiseaseResults[0]);
      }, 2500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const resetDetection = () => {
    setUploadedImage(null);
    setDetectedDisease(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {t('diseaseDetection.title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Upload an image of your crop to identify diseases and get treatment recommendations. 
            Our AI model will analyze the image and provide results within seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card p-6">
            {!uploadedImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center h-64 transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload 
                  className={`w-12 h-12 mb-4 ${
                    isDragActive ? 'text-primary-500' : 'text-neutral-400'
                  }`}
                />
                <p className="text-lg font-medium mb-2">
                  {isDragActive 
                    ? 'Drop the image here...' 
                    : t('diseaseDetection.dragAndDrop')
                  }
                </p>
                <p className="text-sm text-neutral-500">
                  Supported formats: JPG, PNG (max 10MB)
                </p>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded crop" 
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button 
                  onClick={resetDetection}
                  className="absolute top-2 right-2 bg-neutral-800/70 text-white p-1 rounded-full hover:bg-neutral-900/70 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              <button 
                className="btn-primary flex items-center"
                onClick={() => document.getElementById('upload-input')?.click()}
                disabled={isAnalyzing}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </button>
              <button 
                className="btn-outline flex items-center"
                onClick={() => document.getElementById('upload-input')?.click()}
                disabled={isAnalyzing}
              >
                <Image className="w-4 h-4 mr-2" />
                Browse Gallery
              </button>
            </div>

            {/* Alternative upload methods */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Tips for best results:</h3>
              <ul className="text-neutral-600 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-1 mr-2">
                    <span className="flex items-center justify-center text-xs font-bold">1</span>
                  </span>
                  Take clear, well-lit photos of the affected area
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-1 mr-2">
                    <span className="flex items-center justify-center text-xs font-bold">2</span>
                  </span>
                  Include both healthy and diseased parts for comparison
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-1 mr-2">
                    <span className="flex items-center justify-center text-xs font-bold">3</span>
                  </span>
                  Capture multiple angles of the affected plant
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-1 mr-2">
                    <span className="flex items-center justify-center text-xs font-bold">4</span>
                  </span>
                  Avoid shadows or glare in your photos
                </li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {isAnalyzing ? (
              <div className="card p-8 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-semibold mb-2">{t('diseaseDetection.analyzing')}</h2>
                <p className="text-neutral-500 text-center">
                  Our AI is examining your image for signs of disease. This will only take a moment...
                </p>
              </div>
            ) : detectedDisease ? (
              <div className="card p-6 animate-fade-in">
                <div className="bg-primary-50 p-4 rounded-lg mb-6 flex items-start">
                  <Info className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-primary-700">
                    The following results are based on the uploaded image. For the most accurate diagnosis, 
                    consider consulting with a local agricultural expert.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold mb-2">{t('diseaseDetection.results.title')}</h2>
                
                <div className="flex items-center mb-6">
                  <div className="bg-error-100 text-error-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {detectedDisease.severity === 'high' ? 'High Severity' : 
                     detectedDisease.severity === 'medium' ? 'Medium Severity' : 'Low Severity'}
                  </div>
                  <div className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-medium">
                    {detectedDisease.cropTypes.join(', ')}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">{detectedDisease.name}</h3>
                  <p className="text-neutral-500 italic mb-3">{detectedDisease.scientificName}</p>
                  <p className="text-neutral-700">{detectedDisease.description}</p>
                </div>

                {/* Accordion sections */}
                <div className="space-y-3">
                  {/* Symptoms */}
                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    <button 
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-neutral-50 transition-colors"
                      onClick={() => toggleSection('symptoms')}
                    >
                      <span className="font-medium">Symptoms</span>
                      {expandedSection === 'symptoms' ? (
                        <ChevronUp className="w-5 h-5 text-neutral-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-500" />
                      )}
                    </button>
                    {expandedSection === 'symptoms' && (
                      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
                        <ul className="space-y-2">
                          {detectedDisease.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-error-500 mt-2 mr-2"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Treatments */}
                  <div className="border border-neutral-200 rounded-lg overflow-hidden">
                    <button 
                      className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-neutral-50 transition-colors"
                      onClick={() => toggleSection('treatments')}
                    >
                      <span className="font-medium">Treatments</span>
                      {expandedSection === 'treatments' ? (
                        <ChevronUp className="w-5 h-5 text-neutral-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-500" />
                      )}
                    </button>
                    {expandedSection === 'treatments' && (
                      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
                        <ul className="space-y-2">
                          {detectedDisease.treatments.map((treatment, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-5 h-5 rounded-full bg-success-100 text-success-600 flex-shrink-0 mr-2 flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </span>
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button 
                    onClick={resetDetection}
                    className="btn-outline"
                  >
                    Scan New Image
                  </button>
                  <button className="btn-primary">
                    Save to History
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Image Uploaded</h2>
                <p className="text-neutral-500 mb-6">
                  Upload an image of your crop to get started with disease detection
                </p>
                <button 
                  className="btn-primary"
                  onClick={() => document.getElementById('upload-input')?.click()}
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;