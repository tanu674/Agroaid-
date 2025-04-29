import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Plane as Plant, CloudRain, Map, Lightbulb, User, Settings, LogOut } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user is on a protected route
    const protectedRoutes = ['/dashboard', '/disease-detection', '/weather-data', '/outbreak-map', '/recommendations', '/profile', '/settings'];
    if (protectedRoutes.includes(location.pathname)) {
      setIsLoggedIn(true);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: t('navigation.diseaseDetection'), path: '/disease-detection', icon: <Plant className="w-5 h-5" /> },
    { name: t('navigation.weatherData'), path: '/weather-data', icon: <CloudRain className="w-5 h-5" /> },
    { name: t('navigation.outbreakMap'), path: '/outbreak-map', icon: <Map className="w-5 h-5" /> },
    { name: t('navigation.recommendations'), path: '/recommendations', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || mobileMenuOpen || location.pathname !== '/' 
      ? 'bg-white shadow-md py-2' 
      : 'bg-transparent py-4'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center z-50" onClick={closeMobileMenu}>
          <Logo />
          <span className={`text-xl font-display font-bold ml-2 ${
            isScrolled || mobileMenuOpen || location.pathname !== '/' ? 'text-primary-700' : 'text-white'
          }`}>
            AgroAid
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-primary-100 text-primary-700'
                    : isScrolled || location.pathname !== '/'
                      ? 'text-neutral-700 hover:bg-neutral-100'
                      : 'text-white hover:bg-white/20'
                }`}
              >
                {t('navigation.dashboard')}
              </Link>
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : isScrolled || location.pathname !== '/'
                        ? 'text-neutral-700 hover:bg-neutral-100'
                        : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative group">
                <button 
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isScrolled || location.pathname !== '/'
                      ? 'text-neutral-700 hover:bg-neutral-100'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <User className="w-5 h-5 mr-1" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transform scale-0 group-hover:scale-100 transition-transform origin-top-right duration-150 ease-in-out">
                  <Link to="/profile" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                    {t('navigation.profile')}
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                    {t('navigation.settings')}
                  </Link>
                  <div className="border-t border-neutral-200">
                    <button className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                      {t('navigation.logout')}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isScrolled || location.pathname !== '/'
                    ? 'text-primary-600 hover:bg-primary-50'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {t('navigation.login')}
              </Link>
              <Link 
                to="/register" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isScrolled || location.pathname !== '/'
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-white/90'
                }`}
              >
                {t('navigation.register')}
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className={`md:hidden z-50 p-2 rounded-lg ${
            mobileMenuOpen 
              ? 'text-primary-700' 
              : isScrolled || location.pathname !== '/'
                ? 'text-neutral-700'
                : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="pt-20 px-6 pb-8 h-full overflow-y-auto">
            {isLoggedIn ? (
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/dashboard" 
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    location.pathname === '/dashboard' ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5 mr-3" />
                  {t('navigation.dashboard')}
                </Link>
                
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      location.pathname === item.path ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}

                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 rounded-lg text-neutral-700"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-5 h-5 mr-3" />
                    {t('navigation.profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 rounded-lg text-neutral-700"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    {t('navigation.settings')}
                  </Link>
                  <button className="flex items-center w-full px-4 py-3 rounded-lg text-neutral-700">
                    <LogOut className="w-5 h-5 mr-3" />
                    {t('navigation.logout')}
                  </button>
                </div>
              </nav>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="px-4 py-3 rounded-lg text-center text-primary-600 border border-primary-600"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-3 rounded-lg text-center bg-primary-600 text-white"
                  onClick={closeMobileMenu}
                >
                  {t('navigation.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;