import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo variant="light" />
              <span className="text-xl font-display font-semibold ml-2">AgroAid</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Smart farming solutions for crop disease detection and management. 
              Our AI-powered platform helps farmers protect their crops and improve yields.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  {t('navigation.diseaseDetection')}
                </Link>
              </li>
              <li>
                <Link to="/weather-data" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  {t('navigation.weatherData')}
                </Link>
              </li>
              <li>
                <Link to="/outbreak-map" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  {t('navigation.outbreakMap')}
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  {t('navigation.recommendations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Crop Disease Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Farming Best Practices
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Weather Forecasting
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Soil Health Management
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">
                  123 Farming Road<br />
                  Agriculture Valley, AG 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">support@agroaid.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} AgroAid. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-neutral-400">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;