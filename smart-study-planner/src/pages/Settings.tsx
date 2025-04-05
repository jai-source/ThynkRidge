import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailReminders: true,
    studyReminders: true,
    darkMode: false,
    studyDuration: 45, // minutes
    breakDuration: 15, // minutes
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDurationChange = (setting: 'studyDuration' | 'breakDuration', value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSettings(prev => ({
        ...prev,
        [setting]: numValue
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Enable Notifications</span>
              <button
                onClick={() => handleToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Reminders</span>
              <button
                onClick={() => handleToggle('emailReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.emailReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.emailReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Study Session Reminders</span>
              <button
                onClick={() => handleToggle('studyReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.studyReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.studyReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Study Duration (minutes)</span>
              <input
                type="number"
                value={settings.studyDuration}
                onChange={(e) => handleDurationChange('studyDuration', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                min="1"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Break Duration (minutes)</span>
              <input
                type="number"
                value={settings.breakDuration}
                onChange={(e) => handleDurationChange('breakDuration', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                min="1"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 