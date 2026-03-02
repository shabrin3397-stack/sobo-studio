# SOBO STUDIO - Admin CMS Guide

## 🎯 What You've Got

A complete WordPress-style admin panel for your SOBO STUDIO website where you can:
- ✅ Change all text content (headlines, descriptions, etc.)
- ✅ Upload and manage images
- ✅ Update services and work projects
- ✅ Make changes instantly without touching code
- ✅ Secure authentication with login/password

---

## 🚀 Getting Started

### Step 1: Create Your Admin Account

1. Visit: `/admin/signup`
2. Enter your name, email, and password (minimum 6 characters)
3. Click "CREATE ACCOUNT"
4. You'll be redirected to the login page

### Step 2: Login to Admin Panel

1. Visit: `/admin/login` (or click "Admin" in the navbar)
2. Enter your credentials
3. You're in! 🎉

---

## 📝 Using the Admin Dashboard

### Dashboard Overview

The admin dashboard is organized into **3 main tabs**:

1. **Hero** - Homepage hero section content
2. **Services** - Your 3 service offerings (Identity, Signal, Blueprint)
3. **Work** - Your 4 featured projects

### Editing Content

#### Text Fields
- Click any text field to edit
- Changes are saved in memory as you type
- Click **"SAVE ALL"** button (top right) to persist changes

#### Image Fields
You have **2 ways to update images**:

**Option 1: Upload New Image**
1. Click the "UPLOAD" button
2. Select an image from your computer
3. Wait for upload to complete
4. Image appears automatically

**Option 2: Paste Image URL**
1. Copy an image URL from anywhere on the web
2. Paste it into the text field
3. Image updates immediately

**To Remove an Image:**
- Hover over the image preview
- Click the X button that appears

### Saving Changes

⚠️ **IMPORTANT**: Changes are NOT saved automatically!

1. Make all your edits
2. Click **"SAVE ALL"** button in the top right
3. Wait for "Content saved successfully!" message
4. Your changes are now live!

### Preview Your Site

- Click **"PREVIEW SITE"** button to open your live site in a new tab
- Check how your changes look
- Go back to admin to make more edits if needed

---

## 📋 Content Structure

### Hero Section
- **Main Headline (Line 1)**: First line of homepage title
- **Main Headline (Line 2)**: Second line (the impactful part)
- **Services Text**: Your service categories
- **Tagline**: Supporting text below services
- **Hero Image**: Large image on the right

### Services (3 services)
Each service has:
- **Title**: Main service name (e.g., "Identity")
- **Subtitle**: Formerly text (e.g., "FORMERLY BRANDING")
- **Description**: Full description paragraph
- **Image**: Service hover image

### Work (4 projects)
Each project has:
- **Client Name**: Project/client title (e.g., "VELVET SPACE")
- **Category**: Service type (e.g., "Identity + Strategy")
- **Description**: One-line project description
- **Image**: Project showcase image

---

## 🔒 Security Notes

- Only logged-in admins can make changes
- All image uploads are stored securely in Supabase Storage
- Your password is encrypted
- Sessions expire when you logout

### Logging Out
Click the logout icon (arrow) in the top right corner

---

## 💡 Tips & Best Practices

### Images
- Use high-quality images (1080px width minimum)
- Keep aspect ratios consistent within each section
- Black & white or high-contrast images work best with your design
- File size: Keep under 2MB for fast loading

### Text
- Keep headlines short and punchy (matches your brand)
- Use ALL CAPS for emphasis (your style!)
- Maintain the bold, confident tone
- Avoid generic corporate language

### Content Updates
- Make changes in batches
- Preview before saving
- Keep backup of important text in a separate doc
- Update content regularly to keep site fresh

---

## 🆘 Troubleshooting

### "Failed to load content"
- Check your internet connection
- Try refreshing the page
- Make sure you're logged in

### "Upload failed"
- Check file size (max 5MB recommended)
- Ensure it's an image file (jpg, png, webp)
- Try a different image

### "Unauthorized" error
- Your session expired
- Go back to `/admin/login`
- Login again

### Changes not appearing
- Did you click "SAVE ALL"?
- Try refreshing the preview page
- Clear browser cache if needed

---

## 📱 Access URLs

- **Homepage**: `/`
- **Admin Login**: `/admin/login`
- **Admin Signup**: `/admin/signup`
- **Admin Dashboard**: `/admin/dashboard`

---

## 🎨 Your Design System

Your admin panel follows the same brutal, minimalist aesthetic as your main site:
- Black & white color scheme
- Bold typography
- High contrast
- Clean, functional interface
- No BS, just tools that work

---

## 📊 What's Next?

Want to add more features? You could extend the CMS to include:
- About page content
- Philosophy section text
- Contact information
- Team members
- Testimonials
- Blog posts

The system is built to scale with your needs!

---

**Need help?** The admin panel is intuitive and follows WordPress-style patterns you might already know. Just explore and experiment - you can't break anything! 🚀
