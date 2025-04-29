import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane as Plant, CloudRain, MapPin, Lightbulb, Upload, BarChart, AlertCircle, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Update document title
    document.title = 'AgroAid - Smart Farming Solutions';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Farmer in field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/60"></div>
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary text-lg px-6 py-3">
                {t('home.hero.cta')}
              </Link>
              <Link to="/disease-detection" className="btn bg-white text-primary-700 hover:bg-white/90 focus:ring-white text-lg px-6 py-3">
                Try Disease Detection
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <a 
            href="#features" 
            className="text-white flex flex-col items-center animate-pulse-slow transition-opacity hover:opacity-80"
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium mb-2">Learn More</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">{t('home.features.title')}</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform provides cutting-edge tools to help farmers detect diseases early, monitor conditions, and take preventive actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-lg p-6 group">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Plant className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.diseaseDetection.title')}</h3>
              <p className="text-neutral-600">
                {t('home.features.diseaseDetection.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-lg p-6 group">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-6 group-hover:bg-accent-200 transition-colors">
                <CloudRain className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.weatherData.title')}</h3>
              <p className="text-neutral-600">
                {t('home.features.weatherData.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-lg p-6 group">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-6 group-hover:bg-secondary-200 transition-colors">
                <MapPin className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.outbreakMap.title')}</h3>
              <p className="text-neutral-600">
                {t('home.features.outbreakMap.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-lg p-6 group">
              <div className="w-16 h-16 rounded-full bg-warning-100 flex items-center justify-center mb-6 group-hover:bg-warning-200 transition-colors">
                <Lightbulb className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.recommendations.title')}</h3>
              <p className="text-neutral-600">
                {t('home.features.recommendations.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">{t('home.howItWorks.title')}</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              AgroAid simplifies the process of managing and protecting your crops
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform -translate-x-1/2 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 md:flex items-center mb-16">
              <div className="flex flex-col md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <h3 className="text-2xl font-semibold mb-3">Upload Images</h3>
                <p className="text-neutral-600">
                  Take photos of your crop and upload them to our platform for instant analysis
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto md:mx-0 mb-8 md:mb-0">
                <Upload className="w-6 h-6" />
              </div>
              <div className="md:w-1/2 md:pl-12 md:invisible">
                <div className="card p-6 animate-fade-in">
                  <img 
                    src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Farmer taking photo of crop" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 md:flex items-center mb-16">
              <div className="md:w-1/2 md:pr-12 md:invisible">
                <div className="card p-6 animate-fade-in">
                  <img 
                    src="https://images.pexels.com/photos/5905/dna-gene-research-science.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="AI analysis visualization" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto md:mx-0 mb-8 md:mb-0">
                <BarChart className="w-6 h-6" />
              </div>
              <div className="flex flex-col md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-semibold mb-3">Get AI Analysis</h3>
                <p className="text-neutral-600">
                  Our advanced AI algorithms analyze your images to detect diseases with high accuracy
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 md:flex items-center mb-16">
              <div className="flex flex-col md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <h3 className="text-2xl font-semibold mb-3">View Results</h3>
                <p className="text-neutral-600">
                  Receive detailed information about detected diseases and recommended treatments
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto md:mx-0 mb-8 md:mb-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="md:w-1/2 md:pl-12 md:invisible">
                <div className="card p-6 animate-fade-in">
                  <img 
                    src="https://images.pexels.com/photos/5926396/pexels-photo-5926396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Disease detection results" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 md:flex items-center">
              <div className="md:w-1/2 md:pr-12 md:invisible">
                <div className="card p-6 animate-fade-in">
                  <img 
                    src="https://images.pexels.com/photos/4498124/pexels-photo-4498124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Implementing treatment" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto md:mx-0 mb-8 md:mb-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex flex-col md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-semibold mb-3">Implement Solutions</h3>
                <p className="text-neutral-600">
                  Apply targeted treatments based on our recommendations to protect your crops
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to protect your crops?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgroAid to detect diseases early and maximize their yields.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-white/90 focus:ring-white text-lg px-6 py-3">
              Get Started Now
            </Link>
            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 focus:ring-white text-lg px-6 py-3">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;