import React, { useState } from 'react';
import './Settings.css';
import sandyAvatar from '../photos/sandu.jpg';

interface UserSettings {
  name: string;
  email: string;
  avatar: string;
  notificationEmail: boolean;
  documentUpdates: boolean;
  twoFactorAuth: boolean;
  theme: 'light' | 'dark';
  language: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: sandyAvatar,
    notificationEmail: true,
    documentUpdates: true,
    twoFactorAuth: false,
    theme: 'light',
    language: 'English'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSettingChange('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section profile-section">
          <h2>Profile Settings</h2>
          <div className="avatar-section">
            <div className="avatar-container">
              <img src={settings.avatar} alt={settings.name} className="settings-avatar" />
              <label htmlFor="avatar-upload" className="avatar-upload-label">
                <span className="icon">📷</span>
                Change Photo
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          
          <div className="profile-fields">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="settings-options">
            <div className="setting-option">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive notifications about your account via email</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notificationEmail}
                  onChange={(e) => handleSettingChange('notificationEmail', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-option">
              <div>
                <h3>Document Updates</h3>
                <p>Get notified when documents are modified or signed</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.documentUpdates}
                  onChange={(e) => handleSettingChange('documentUpdates', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Security</h2>
          <div className="settings-options">
            <div className="setting-option">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-options">
            <div className="form-group">
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div className="form-group">
              <label>Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value as 'light' | 'dark')}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 