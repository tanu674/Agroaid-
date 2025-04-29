import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    language: 'en',
    notifications: {
      enable: true,
      email: true,
      push: false
    },
    theme: 'light',
    dataPrivacy: {
      shareData: true,
      anonymousAnalytics: true
    }
  });

  useEffect(() => {
    document.title = 'Settings - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSettings(prev => ({
      ...prev,
      language: newLanguage
    }));
    i18n.changeLanguage(newLanguage);
  };

  const handleToggleChange = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  const handleThemeChange = (theme: string) => {
    setSettings(prev => ({
      ...prev,
      theme
    }));
    // In a real app, this would apply the theme to the application
  };

  const saveSettings = () => {
    // In a real app, this would save the settings to the backend
    // For now, just show a success message
    alert('Settings saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {t('settings.title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Customize your AgroAid experience and manage your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <a 
                      href="#language" 
                      className="block px-4 py-2 rounded-lg bg-primary-50 text-primary-700 font-medium"
                    >
                      {t('settings.language')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#notifications" 
                      className="block px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      {t('settings.notifications')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#theme" 
                      className="block px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      {t('settings.theme')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#data-privacy" 
                      className="block px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      Data Privacy
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#account" 
                      className="block px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      Account
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2">
            <div className="card p-6 space-y-8">
              {/* Language Settings */}
              <section id="language" className="pb-8 border-b border-neutral-200">
                <h2 className="text-xl font-semibold mb-6">{t('settings.language')}</h2>
                <div className="max-w-md">
                  <label htmlFor="language-select" className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Language
                  </label>
                  <select
                    id="language-select"
                    value={settings.language}
                    onChange={handleLanguageChange}
                    className="input"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="pt">Português</option>
                  </select>
                  <p className="text-sm text-neutral-500 mt-2">
                    This will change the language for all text in the application.
                  </p>
                </div>
              </section>

              {/* Notification Settings */}
              <section id="notifications" className="py-8 border-b border-neutral-200">
                <h2 className="text-xl font-semibold mb-6">{t('settings.notifications')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{t('settings.enableNotifications')}</h3>
                      <p className="text-sm text-neutral-500">
                        Receive alerts for disease outbreaks, weather changes, and recommendations
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="enable-notifications"
                        className="sr-only"
                        checked={settings.notifications.enable}
                        onChange={() => handleToggleChange('notifications', 'enable')}
                      />
                      <label 
                        htmlFor="enable-notifications"
                        className={`block w-14 h-8 rounded-full transition-colors ${
                          settings.notifications.enable ? 'bg-primary-500' : 'bg-neutral-300'
                        }`}
                      >
                        <span 
                          className={`block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow-md transform transition-transform ${
                            settings.notifications.enable ? 'translate-x-6' : ''
                          }`} 
                        />
                      </label>
                    </div>
                  </div>

                  <div className="ml-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('settings.emailNotifications')}</h3>
                        <p className="text-sm text-neutral-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="sr-only"
                          checked={settings.notifications.email}
                          onChange={() => handleToggleChange('notifications', 'email')}
                          disabled={!settings.notifications.enable}
                        />
                        <label 
                          htmlFor="email-notifications"
                          className={`block w-14 h-8 rounded-full transition-colors ${
                            settings.notifications.enable 
                              ? settings.notifications.email ? 'bg-primary-500' : 'bg-neutral-300'
                              : 'bg-neutral-200 cursor-not-allowed'
                          }`}
                        >
                          <span 
                            className={`block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow-md transform transition-transform ${
                              settings.notifications.email ? 'translate-x-6' : ''
                            }`} 
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('settings.pushNotifications')}</h3>
                        <p className="text-sm text-neutral-500">
                          Receive push notifications on your device
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="push-notifications"
                          className="sr-only"
                          checked={settings.notifications.push}
                          onChange={() => handleToggleChange('notifications', 'push')}
                          disabled={!settings.notifications.enable}
                        />
                        <label 
                          htmlFor="push-notifications"
                          className={`block w-14 h-8 rounded-full transition-colors ${
                            settings.notifications.enable 
                              ? settings.notifications.push ? 'bg-primary-500' : 'bg-neutral-300'
                              : 'bg-neutral-200 cursor-not-allowed'
                          }`}
                        >
                          <span 
                            className={`block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow-md transform transition-transform ${
                              settings.notifications.push ? 'translate-x-6' : ''
                            }`} 
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Theme Settings */}
              <section id="theme" className="py-8 border-b border-neutral-200">
                <h2 className="text-xl font-semibold mb-6">{t('settings.theme')}</h2>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.theme === 'light'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="aspect-video bg-white border border-neutral-200 rounded mb-2"></div>
                    <p className="font-medium">{t('settings.light')}</p>
                  </button>

                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.theme === 'dark'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="aspect-video bg-neutral-800 border border-neutral-700 rounded mb-2"></div>
                    <p className="font-medium">{t('settings.dark')}</p>
                  </button>

                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      settings.theme === 'system'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="aspect-video bg-gradient-to-r from-white to-neutral-800 border border-neutral-200 rounded mb-2"></div>
                    <p className="font-medium">{t('settings.system')}</p>
                  </button>
                </div>
              </section>

              {/* Data Privacy Settings */}
              <section id="data-privacy" className="py-8 border-b border-neutral-200">
                <h2 className="text-xl font-semibold mb-6">Data Privacy</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Share Disease Data</h3>
                      <p className="text-sm text-neutral-500">
                        Contribute to regional disease tracking by sharing anonymized disease detection data
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="share-data"
                        className="sr-only"
                        checked={settings.dataPrivacy.shareData}
                        onChange={() => handleToggleChange('dataPrivacy', 'shareData')}
                      />
                      <label 
                        htmlFor="share-data"
                        className={`block w-14 h-8 rounded-full transition-colors ${
                          settings.dataPrivacy.shareData ? 'bg-primary-500' : 'bg-neutral-300'
                        }`}
                      >
                        <span 
                          className={`block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow-md transform transition-transform ${
                            settings.dataPrivacy.shareData ? 'translate-x-6' : ''
                          }`} 
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Anonymous Analytics</h3>
                      <p className="text-sm text-neutral-500">
                        Help improve AgroAid by allowing anonymous usage data collection
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="anonymous-analytics"
                        className="sr-only"
                        checked={settings.dataPrivacy.anonymousAnalytics}
                        onChange={() => handleToggleChange('dataPrivacy', 'anonymousAnalytics')}
                      />
                      <label 
                        htmlFor="anonymous-analytics"
                        className={`block w-14 h-8 rounded-full transition-colors ${
                          settings.dataPrivacy.anonymousAnalytics ? 'bg-primary-500' : 'bg-neutral-300'
                        }`}
                      >
                        <span 
                          className={`block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow-md transform transition-transform ${
                            settings.dataPrivacy.anonymousAnalytics ? 'translate-x-6' : ''
                          }`} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Settings */}
              <section id="account" className="pt-8">
                <h2 className="text-xl font-semibold mb-6">Account</h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Update your password to keep your account secure.
                    </p>
                    <button className="btn-primary py-1 px-3 text-sm">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-2">Delete Account</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="bg-error-600 text-white hover:bg-error-700 py-1 px-3 rounded text-sm font-medium transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </section>

              {/* Save Button */}
              <div className="pt-6 flex justify-end">
                <button 
                  onClick={saveSettings}
                  className="btn-primary"
                >
                  {t('settings.saveSettings')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;