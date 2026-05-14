# Quick Start Guide - Profile Page Redesign

## What Changed?

### Before

- Sidebar navigation with multiple tabs
- Split layout (sidebar + content area)
- Tab switching between sections
- Multiple form sections spread across tabs

### After

- Single modern page design
- All content in one clean card
- No sidebar navigation
- Organized sections with clear hierarchy
- Dark mode support
- Better mobile responsiveness

---

## Starting the Application

### Backend

```bash
cd c:\Users\2479470\Downloads\E-LEARNING-PLATFORM\backend
npm install
node server.js
```

Runs on: `http://localhost:5000`

### Frontend

```bash
cd c:\Users\2479470\Downloads\E-LEARNING-PLATFORM\e-app
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

## Testing the New Profile Page

### Step 1: Login

1. Navigate to `http://localhost:5173`
2. Login with your account

### Step 2: Navigate to Profile

1. Click on your profile/account icon (top right)
2. Select "Profile" or navigate to `/profile`

### Step 3: View Your Profile

You should see:

- Your profile picture (with upload overlay on hover)
- Your name and email
- Role badge
- All profile information in one page
- Edit button in top right

### Step 4: Test Edit Mode

1. Click "Edit Profile" button
2. You should see:
   - All form fields become editable
   - Profile picture gets camera overlay
   - Interest input appears
   - Cancel button shows next to Edit

### Step 5: Update Information

1. Change your phone number
2. Select a gender
3. Pick a date of birth
4. Enter an address
5. Add 3-4 interests using the tag system:
   - Type interest name
   - Press Enter or click Add
   - Tags appear below
6. Toggle dark mode on/off
7. Click "Save Changes"

### Step 6: Verify Changes Saved

1. Toast notification should appear
2. Page updates with new data
3. Reload page - changes should persist
4. Click Edit again - old values should load

### Step 7: Test Profile Picture Upload

1. Click "Edit Profile"
2. Click the camera icon on your picture
3. Select an image from your computer
4. Preview should update immediately
5. Click "Save Changes"
6. Reload page - new picture should display

### Step 8: Test Dark Mode

1. Toggle the Dark Mode switch
2. Page should switch to dark theme
3. Reload page - dark mode should persist
4. Toggle back to light mode

---

## Form Fields

| Field         | Type     | Required | Validation                          |
| ------------- | -------- | -------- | ----------------------------------- |
| Full Name     | Text     | Yes      | Non-empty                           |
| Email         | Email    | No       | Read-only                           |
| Phone         | Tel      | No       | International format                |
| Gender        | Select   | No       | Male/Female/Other/Prefer not to say |
| Date of Birth | Date     | No       | Cannot be in future                 |
| Address       | Textarea | No       | Any text                            |
| Interests     | Tags     | No       | Multiple tags, add via Enter        |
| Dark Mode     | Toggle   | No       | Saves to localStorage               |

---

## API Endpoints Used

### GET /api/profile

- Retrieves current user's profile
- Automatically called on page load

### PUT /api/profile

- Updates user profile
- Called when "Save Changes" is clicked
- Validates all data server-side

### POST /api/profile/upload

- Uploads profile image
- Currently called as part of PUT request
- Stores base64 in database

---

## Dark Mode

- **How to Enable**: Toggle switch in "Preferences" section
- **Persistence**: Saved to browser localStorage
- **Colors**:
  - Background: Dark theme
  - Text: Light colors
  - Forms: Dark input fields
  - All buttons styled for dark mode

---

## Mobile Testing

### Tablet View (768px - 899px)

- Sidebar hidden
- Content fills width
- Single column forms
- Buttons stack vertically

### Mobile View (480px - 767px)

- Optimized spacing
- Single column layout
- Buttons full width
- Picture section vertical

### Small Mobile (<480px)

- Minimal padding
- Compact fields
- Easy thumb navigation
- Readable text size

---

## Error Handling

### Validation Errors

- Phone format invalid → "Invalid phone number format"
- Date in future → "Invalid or future date of birth"
- Empty name → "Full name is required"

### Network Errors

- Shows error toast
- Form stays editable
- Can retry save

### Success

- Green success toast appears
- Automatically dismisses in 3 seconds
- Form exits edit mode

---

## Browser DevTools Tips

### Check Network

1. Open DevTools (F12)
2. Go to Network tab
3. Click Save Changes
4. Should see PUT request to `/api/profile`
5. Response should have user data

### Check Console

- No errors should appear
- Minor warnings may be from React dev mode

### Check LocalStorage

1. DevTools → Application → LocalStorage
2. Look for `darkModePreference` key
3. Value should be `true` or `false`

---

## Troubleshooting

### Issue: Page doesn't load

**Solution**:

- Check both backend and frontend are running
- Check browser console for errors
- Ensure you're logged in

### Issue: Changes not saving

**Solution**:

- Check network tab for failed requests
- Verify all fields have valid values
- Check error messages on page

### Issue: Profile picture not uploading

**Solution**:

- Try smaller image file
- Check file format (JPG, PNG recommended)
- Look at browser console for JS errors

### Issue: Dark mode not staying on

**Solution**:

- Check localStorage is enabled
- Check browser isn't in private mode
- Clear cache and reload

### Issue: Form fields won't edit

**Solution**:

- Click "Edit Profile" button first
- Fields should become editable (white background)
- If not, refresh page and try again

---

## Database Check

To verify data is saving correctly:

```javascript
// In MongoDB shell or Compass
db.users.findOne({ email: "your@email.com" })

// You should see:
{
  _id: ObjectId(...),
  name: "Your Name",
  email: "your@email.com",
  profile: {
    phoneNumber: "+1 (555) 123-4567",
    gender: "male",
    dateOfBirth: "1990-01-15",
    address: "123 Main St",
    interests: ["JavaScript", "React"],
    avatar: "data:image/png;base64,..." // base64 image
  },
  darkModePreference: true
}
```

---

## Features Checklist

### Completed Features ✓

- [x] Single-page design
- [x] No sidebar navigation
- [x] Profile picture upload
- [x] Form validation
- [x] Dark mode toggle
- [x] Interest tags
- [x] Responsive design
- [x] Toast notifications
- [x] Loading spinners
- [x] Error handling

### Testing Checklist

- [ ] Load profile page
- [ ] See all existing data filled in
- [ ] Edit each field individually
- [ ] Upload profile picture
- [ ] Add multiple interests
- [ ] Toggle dark mode
- [ ] Save changes
- [ ] Reload page - changes persist
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Dark mode persists on reload

---

## Support

For issues or questions:

1. Check browser console for errors
2. Review Network tab for API issues
3. Check MongoDB for data
4. See PROFILE_REDESIGN_DOCUMENTATION.md for detailed info

---

**Last Updated**: May 12, 2026
**Version**: 1.0
