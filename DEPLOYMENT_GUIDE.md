# 🚀 SOBO STUDIO - Deployment Guide

## Overview

Your SOBO STUDIO website is now fully migrated to **Supabase backend** with complete inline editing capabilities. This means you can:

✅ Deploy once to any hosting service  
✅ Edit from **any device/browser**  
✅ All changes persist permanently in the cloud database  
✅ Never need to return to Figma Make again  

---

## ⚡ Quick Start (First Time Setup)

### 1. **Create Your Admin Account**
   - Visit `/admin/signup` on your deployed site
   - Enter your name, email, and password (minimum 6 characters)
   - Click "CREATE ACCOUNT"
   - You'll be automatically logged in

### 2. **Initialize Default Content**
   - After signup, you'll be redirected to the home page
   - Or visit `/admin/dashboard`
   - Click the green "**Initialize Default Content**" button
   - This loads all the default SOBO STUDIO text and images into the database

### 3. **Start Editing**
   - On the home page, you'll see a **floating toolbar** at the top
   - Click the "**EDIT**" button to enable edit mode
   - **Hover over any text or image** and click to edit
   - Changes save automatically to the cloud!

---

## 🎨 How to Edit Your Website

### **Method 1: Inline Visual Editing (Recommended)**

This is the easiest way to edit - directly on your live website:

1. **Log in** at `/admin/login`
2. You'll see a **black toolbar** at the top of the page
3. Click "**EDIT**" button to enable edit mode
4. **Hover** over any text or image - you'll see a yellow highlight
5. **Click** to edit:
   - **Text**: A yellow input field appears → Type → Press Enter to save
   - **Images**: Modal opens → Upload new image or paste URL → Save
6. All changes save **instantly** to the database
7. Click "**PREVIEW**" to see how it looks to visitors

### **Method 2: Admin Dashboard**

For more organized bulk editing:

1. **Log in** at `/admin/login`
2. Visit `/admin/dashboard`
3. Use tabs to edit different sections:
   - **Hero**: Main headline, tagline, images
   - **Services**: All 3 service cards
   - **Work**: All 4 portfolio projects
4. Make changes in the forms
5. Click "**SAVE ALL**" to persist changes

---

## 🌐 Deployment Instructions

### **Option A: Vercel (Recommended)**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "**New Project**"
4. Import your GitHub repository
5. Click "**Deploy**"
6. Your site will be live at `your-project.vercel.app`

**After Deployment:**
- Visit `your-project.vercel.app/admin/signup`
- Create your admin account
- Initialize default content
- Start editing!

### **Option B: Netlify**

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "**Add new site**" → "Import from Git"
4. Connect your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "**Deploy**"

### **Option C: Any Static Host**

1. Run `npm run build` locally
2. Upload the `dist` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes

---

## 📱 Editing From Any Device

Once deployed, you can edit your site from:

- 💻 **Desktop** (Chrome, Firefox, Safari, Edge)
- 📱 **Mobile** (iPhone, Android)
- 🖥️ **Tablet** (iPad, etc.)

**Just visit your site URL and log in!**

---

## 🔐 Security Notes

- Only **logged-in admins** can edit content
- Visitors see the published content (no editing toolbar)
- Your Supabase credentials are secure in environment variables
- Image uploads are stored in Supabase Storage with signed URLs

---

## 🗄️ How Data is Stored

All your content is stored in **Supabase**:

- **Text content**: Stored in KV database (`kv_store_99b74b48` table)
- **Images**: Uploaded to Supabase Storage bucket (`make-99b74b48-images`)
- **Authentication**: Managed by Supabase Auth

This means:
- ✅ Data persists forever
- ✅ Accessible from any device
- ✅ No browser storage limits
- ✅ Automatic backups

---

## 💡 Tips & Tricks

### **Keyboard Shortcuts (Edit Mode)**
- **Enter** - Save text changes
- **Esc** - Cancel editing
- **Ctrl + Enter** - Save multiline text

### **Best Image Practices**
- Recommended size: **1920x1080px or larger**
- Max file size: **5MB**
- Supported formats: JPG, PNG, WebP, GIF
- Use Unsplash or upload your own

### **URL vs Upload**
- **Upload**: Files are stored in Supabase cloud storage (permanent)
- **Paste URL**: Links to external images (e.g., Unsplash)

---

## 🐛 Troubleshooting

### **Can't log in?**
- Make sure you created an account at `/admin/signup`
- Check email/password are correct
- Try clearing browser cache

### **Content not saving?**
- Check you're logged in (toolbar should be visible)
- Look for error messages in browser console (F12)
- Make sure you're in Edit Mode (green dot)

### **Images not loading?**
- Check the image URL is valid
- For uploads, ensure file is under 5MB
- Try using a direct URL instead

### **Edits not persisting?**
- Confirm you see "Updated!" or "Image updated!" toast message
- Refresh the page - changes should still be there
- If not, check network connection

---

## 📞 Need Help?

If you encounter issues:

1. **Check browser console** (F12 → Console tab) for errors
2. **Clear cache** and try again
3. **Try a different browser**
4. Check that all environment variables are set correctly

---

## 🎉 You're All Set!

Your SOBO STUDIO website is now:
- ✅ Deployed to production
- ✅ Editable from anywhere
- ✅ Backed by Supabase database
- ✅ Ready for your clients to see

**No more Figma Make visits needed!** 🚀

Just visit your live site, log in, and edit directly. It's that simple.

---

**Made with ⚡ by SOBO STUDIO**
