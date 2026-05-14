# Code Reference Guide - Profile Redesign

Quick reference for key code implementations.

## Backend - User Model Update

```javascript
// backend/models/User.js
profile: {
  avatar: String,
  bio: String,
  phoneNumber: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  preferredLanguage: { type: String, default: 'English' },
  interests: [String],  // Changed from String to Array
  darkMode: { type: Boolean, default: false },
  fontSize: { type: String, default: '16' },
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  appNotifications: { type: Boolean, default: true }
},
darkModePreference: { type: Boolean, default: false }  // NEW
```

## Backend - Profile Controller Key Functions

```javascript
// backend/controllers/profileController.js

// Get user profile
exports.getProfile = async (req, res) => {
  const user = await findUserById(req.user.id);
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;
  delete sanitizedUser.otp;
  res.json(sanitizedUser);
};

// Update profile with validation
exports.updateProfile = async (req, res) => {
  const { name, profile, darkModePreference } = req.body;
  const user = await findUserById(req.user.id);

  // Validate phone
  if (profile.phoneNumber) {
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(profile.phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone format" });
    }
  }

  // Validate DOB
  if (profile.dateOfBirth) {
    const dob = new Date(profile.dateOfBirth);
    if (isNaN(dob.getTime()) || dob > new Date()) {
      return res.status(400).json({ message: "Invalid or future DOB" });
    }
  }

  user.profile = { ...user.profile, ...profile };
  user.darkModePreference = darkModePreference;
  await saveUser(user);

  res.json({ message: "Profile updated successfully", user });
};
```

## Backend - Routes Setup

```javascript
// backend/routes/profile.js
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.post("/upload", auth, uploadProfileImage);
```

## Frontend - Profile Component Structure

```jsx
// e-app/src/pages/Profile.jsx

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    interests: [],
    profilePicturePreview: "/default-profile.png",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!profileData.fullName.trim()) {
      newErrors.fullName = "Full name required";
    }
    if (
      profileData.phoneNumber &&
      !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(
        profileData.phoneNumber,
      )
    ) {
      newErrors.phoneNumber = "Invalid phone format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile
  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const updatePayload = {
        name: profileData.fullName,
        profile: {
          phoneNumber: profileData.phoneNumber,
          gender: profileData.gender,
          dateOfBirth: profileData.dateOfBirth,
          address: profileData.address,
          interests: profileData.interests,
          avatar: profileData.profilePicturePreview,
        },
        darkModePreference: darkMode,
      };

      await updateUserProfile(updatePayload);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkModePreference", darkMode);
  }, [darkMode]);

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your profile information</p>
        </div>
        <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Card */}
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture-section">
          <div className="picture-container">
            <img src={profileData.profilePicturePreview} alt="Profile" />
            {isEditing && (
              <label className="upload-overlay">
                <i className="bi bi-camera-fill"></i>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Form Sections */}
        <div className="form-section">
          {/* Basic Info */}
          <div className="form-group-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={
                    errors.fullName ? "form-input input-error" : "form-input"
                  }
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>
              {/* More fields... */}
            </div>
          </div>

          {/* Interests */}
          <div className="form-group-section">
            <h3 className="section-title">Interests & Skills</h3>
            {isEditing && (
              <div className="interest-input-group">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyPress={handleInterestKeyPress}
                  placeholder="Add interest and press Enter"
                />
                <button onClick={addInterest} className="btn-add-interest">
                  Add
                </button>
              </div>
            )}
            <div className="interests-container">
              {profileData.interests.map((interest) => (
                <div key={interest} className="interest-tag">
                  <span>{interest}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="btn-remove-interest"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div className="form-group-section">
            <h3 className="section-title">Preferences</h3>
            <div className="toggle-option">
              <label>Dark Mode</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="action-buttons">
            <button onClick={handleSaveProfile} className="btn-primary">
              Save Changes
            </button>
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Frontend - CSS Variables & Dark Mode

```css
/* e-app/src/styles/Profile.css */

:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --light-bg: #f8f9fa;
  --border-color: #e9ecef;
  --text-dark: #333333;
  --text-light: #666666;
  --white: #ffffff;
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:root.dark-mode {
  --text-dark: #f0f0f0;
  --text-light: #d0d0d0;
  --light-bg: #1e1e1e;
  --white: #2a2a2a;
  --border-color: #404040;
}

.profile-container {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  padding: 40px 20px;
}

.profile-container.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.form-input {
  padding: 12px 14px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-dark);
  background: var(--white);
  transition: var(--transition);
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.dark-mode .form-input {
  background: #1a1a1a;
  color: var(--text-dark);
}

/* Toggle Switch */
.toggle-switch input:checked + .slider {
  background-color: var(--success-color);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 20px 10px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
```

## Frontend - AuthContext Fix

```javascript
// e-app/src/context/AuthContext.jsx

const updateUserProfile = async (profileData) => {
  dispatch({ type: "SET_LOADING", payload: true });
  try {
    const response = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(profileData),
    });
    const result = await response.json();
    if (response.ok) {
      // FIX: Changed from 'result' to 'result.user'
      dispatch({ type: "LOGIN", payload: { user: result.user } });
      return result.user;
    }
    return null;
  } catch (error) {
    return null;
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};
```

## Interest Tag System

```javascript
// Adding interest
const addInterest = () => {
  if (
    interestInput.trim() &&
    !profileData.interests.includes(interestInput.trim())
  ) {
    setProfileData((prev) => ({
      ...prev,
      interests: [...prev.interests, interestInput.trim()],
    }));
    setInterestInput("");
  }
};

// Removing interest
const removeInterest = (interest) => {
  setProfileData((prev) => ({
    ...prev,
    interests: prev.interests.filter((i) => i !== interest),
  }));
};

// Handle Enter key
const handleInterestKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addInterest();
  }
};
```

## Profile Picture Upload & Preview

```javascript
// Handle file upload
const handleProfilePictureChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: reader.result, // Base64
      }));
    };
    reader.readAsDataURL(file);
  }
};
```

## Validation Examples

```javascript
// Phone validation (frontend)
if (
  profileData.phoneNumber &&
  !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(
    profileData.phoneNumber,
  )
) {
  setErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone format" }));
}

// Date validation (frontend)
if (profileData.dateOfBirth) {
  const dob = new Date(profileData.dateOfBirth);
  if (isNaN(dob.getTime()) || dob > new Date()) {
    setErrors((prev) => ({
      ...prev,
      dateOfBirth: "Invalid or future date",
    }));
  }
}

// Backend validation (Express)
if (profile.phoneNumber) {
  const phoneRegex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(profile.phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }
}
```

## Toast Notifications

```javascript
// Using Toast context
const toast = useToast();

// Success
toast.success("Profile updated successfully!");

// Error
toast.error("Failed to save profile. Please try again.");

// Warning
toast.warning("This action cannot be undone");

// Info
toast.info("Your profile has been updated");
```

## Responsive Grid

```css
/* Mobile first */
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .form-row {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

/* Alternative specific layout */
@media (min-width: 900px) {
  .form-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Dark Mode Toggle HTML

```html
<!-- HTML Structure -->
<label class="toggle-switch">
  <input
    type="checkbox"
    id="darkMode"
    checked="{darkMode}"
    onChange="{(e)"
    =""
  />
  setDarkMode(e.target.checked)} />
  <span class="slider"></span>
</label>

<!-- CSS Styling -->
.toggle-switch { position: relative; display: inline-block; width: 50px; height:
28px; } .toggle-switch input { opacity: 0; width: 0; height: 0; } .slider {
position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color:
var(--border-color); cursor: pointer; border-radius: 14px; transition:
var(--transition); } .slider:before { position: absolute; content: ""; height:
22px; width: 22px; left: 3px; bottom: 3px; background-color: var(--white);
transition: var(--transition); border-radius: 50%; } input:checked + .slider {
background-color: var(--success-color); } input:checked + .slider:before {
transform: translateX(22px); }
```

## LocalStorage for Dark Mode

```javascript
// Save dark mode preference
useEffect(() => {
  localStorage.setItem("darkModePreference", darkMode);
}, [darkMode]);

// Load dark mode preference on mount
useEffect(() => {
  const savedDarkMode = localStorage.getItem("darkModePreference") === "true";
  setDarkMode(savedDarkMode);
}, []);

// Apply to document
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }
}, [darkMode]);
```

## Loading Spinner

```jsx
<button onClick={handleSaveProfile} disabled={loading} className="btn-primary">
  {loading ? (
    <>
      <span className="spinner"></span> Saving...
    </>
  ) : (
    <>
      <i className="bi bi-check-lg"></i> Save Changes
    </>
  )}
</button>

/* CSS */
.spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

This code reference provides the essential implementations for the Profile Redesign.
For complete files, see the actual source files in the project.

**Last Updated**: May 12, 2026
