import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: 'Tanishka',
    lastName: 'V',
    email: 'john.farmer@example.com',
    phone: '+1 (555) 123-4567',
    farmName: 'Green Valley Farm',
    location: 'India',
    size: 120,
    crops: ['Tomatoes', 'Corn', 'Wheat'],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });

  useEffect(() => {
    document.title = 'Profile - AgroAid';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the data in the backend
    setProfileData(formData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-primary-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {t('profile.title')}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Manage your personal information and farm details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-1">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-neutral-600 mb-4">{profileData.farmName}</p>
              
              <div className="flex flex-col space-y-2 items-center justify-center">
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="btn-primary w-full"
                >
                  Edit Profile
                </button>
                <button className="btn-outline w-full">
                  Change Password
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-left">
                <h3 className="font-medium mb-3">Account Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Member Since</p>
                    <p className="font-medium">June 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile / View Profile */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.firstName')}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.lastName')}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-4 mt-8">{t('profile.farmInfo')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="farmName" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.farmName')}
                      </label>
                      <input
                        type="text"
                        id="farmName"
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.location')}
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('profile.size')} (acres)
                      </label>
                      <input
                        type="number"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 space-x-4">
                    <button 
                      type="button" 
                      onClick={() => {
                        setFormData({ ...profileData });
                        setIsEditing(false);
                      }}
                      className="btn border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn-outline py-1 px-3"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.firstName')}</h3>
                    <p className="font-medium">{profileData.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.lastName')}</h3>
                    <p className="font-medium">{profileData.lastName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.email')}</h3>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.phone')}</h3>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h2 className="text-xl font-semibold mb-6">{t('profile.farmInfo')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 mb-8">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.farmName')}</h3>
                      <p className="font-medium">{profileData.farmName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.location')}</h3>
                      <p className="font-medium">{profileData.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.size')}</h3>
                      <p className="font-medium">{profileData.size} acres</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">{t('profile.crops')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.crops.map((crop, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="font-medium mb-2">Manage Crops</h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      You can add, remove, or update the crops you are growing on your farm.
                    </p>
                    <button className="btn-primary py-1 px-3 text-sm">
                      Manage Crops
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;