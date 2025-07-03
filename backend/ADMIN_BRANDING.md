# Al Shabaab Fabrics Admin Branding Customization

This document explains how the Al Shabaab Fabrics admin dashboard has been customized to match your brand identity.

## What's Been Customized

### 1. Login Page Branding
- **Welcome Message**: Changed from "Welcome to Medusa" to "Welcome to Al Shabaab Fabrics"
- **Page Title**: Updated to "Al Shabaab Fabrics Admin"
- **General References**: All "Medusa" references replaced with "Al Shabaab Fabrics"

### 2. Admin Dashboard Branding
- **Page Titles**: Updated throughout the dashboard
- **Navigation**: Branded with your company name
- **General UI**: Al Shabaab Fabrics branding applied consistently

## How It Works

### Script-Based Customization
The branding is applied using a post-installation script (`patch-admin.js`) that:

1. **Searches** for Medusa dashboard files in `node_modules/@medusajs/dashboard/dist/`
2. **Replaces** all instances of "Medusa" with "Al Shabaab Fabrics"
3. **Updates** welcome messages, page titles, and branding references
4. **Clears** cache to ensure changes are visible

### Automatic Application
The script runs automatically after `npm install` thanks to the `postinstall` script in `package.json`.

## Files Modified

### `patch-admin.js`
- Main customization script
- Handles all branding replacements
- Clears cache for immediate effect

### `package.json`
- Added `postinstall` script to run branding automatically

## Usage

### Initial Setup
1. Run `npm install` in the backend directory
2. The branding script will run automatically
3. Start your Medusa server: `npm run dev`
4. Visit `http://localhost:9000/app/login` to see the branded login page

### Re-applying Branding
If you need to reapply the branding (e.g., after updating Medusa):

```bash
node patch-admin.js
```

### Restarting the Server
After running the branding script, restart your Medusa server:

```bash
npm run dev
```

## Color Scheme
The branding uses Al Shabaab Fabrics' signature colors:
- **Primary**: Emerald (#10B981)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Gradient from emerald to teal

## What You'll See

### Before
- "Welcome to Medusa" on login page
- "Medusa Admin" in page titles
- Generic Medusa branding throughout

### After
- "Welcome to Al Shabaab Fabrics" on login page
- "Al Shabaab Fabrics Admin" in page titles
- Your company branding throughout the dashboard

## Troubleshooting

### Changes Not Visible
1. Make sure you've restarted the Medusa server
2. Clear your browser cache
3. Check that the script ran successfully: `node patch-admin.js`

### After Medusa Updates
If you update Medusa and the branding disappears:
1. Run `npm install` (should automatically re-apply branding)
2. Or manually run: `node patch-admin.js`

### Cache Issues
If changes aren't showing:
1. The script automatically clears Vite cache
2. Restart the server completely
3. Clear browser cache

## Future Enhancements

### Additional Customizations
You can extend the branding script to:
- Add custom CSS styles
- Include your company logo
- Customize color themes
- Add custom footer text

### Advanced Customization
For more advanced customization, consider:
- Creating custom admin widgets
- Adding custom pages
- Implementing custom UI components

## Support

For any issues with the admin branding:
1. Check the console output when running the script
2. Ensure all files are in the correct locations
3. Verify the Medusa dashboard is properly installed

---

**Note**: This branding customization is compatible with Medusa 2.0 and will automatically reapply when dependencies are installed or updated. 