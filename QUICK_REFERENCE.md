# 🚀 SOBO STUDIO - Quick Reference Card

## 📍 Important URLs

After deployment, bookmark these:

- **🏠 Home**: `https://your-site.com/`
- **🔑 Login**: `https://your-site.com/admin/login`
- **✨ Signup**: `https://your-site.com/admin/signup`
- **⚙️ Dashboard**: `https://your-site.com/admin/dashboard`

---

## ⚡ First Time Setup (3 Steps)

```
1. Visit /admin/signup → Create account
2. Visit /admin/dashboard → Click "Initialize Default Content"  
3. Visit / (home) → Click "EDIT" → Start editing!
```

---

## ✏️ How to Edit Content

### **Method 1: Inline Editing (Easiest)**
```
1. Login → Home page
2. Click "EDIT" in toolbar
3. Hover over text/image → Click
4. Edit → Press Enter (text) or Save (images)
5. Done! (auto-saved)
```

### **Method 2: Admin Dashboard**
```
1. Login → /admin/dashboard
2. Edit in form fields
3. Click "SAVE ALL"
```

---

## 🎨 Editing Shortcuts

| Action | Shortcut |
|--------|----------|
| Save text | `Enter` |
| Cancel edit | `Esc` |
| Save multiline | `Ctrl + Enter` |
| Toggle edit mode | Click "EDIT/PREVIEW" |

---

## 🖼️ Image Upload

**Two ways to add images:**

1. **Upload File**
   - Click "Upload Image"
   - Select file (max 5MB)
   - Uploaded to cloud storage

2. **Paste URL**
   - Get URL from Unsplash/etc
   - Paste in "Image URL" field
   - Linked directly

**Recommended sizes:**
- Hero: 1920x1080px
- Services: 800x600px
- Portfolio: 1200x800px

---

## 🔐 Admin Functions

| Function | Location | Purpose |
|----------|----------|---------|
| Create account | `/admin/signup` | First time only |
| Login | `/admin/login` | Access editing |
| Dashboard | `/admin/dashboard` | Bulk editing |
| Logout | Toolbar → Logout icon | End session |

---

## 📦 Content Sections

**What you can edit:**

✅ **Hero**
- Headlines (2 lines)
- Services tagline
- Background image

✅ **Services** (3 cards)
- Titles, subtitles, descriptions
- Images for each service

✅ **Work** (4 projects)
- Client names, categories
- Descriptions, images

✅ **About/Intro**
- Title, body text

✅ **Philosophy**
- Manifesto points

✅ **Contact/Footer**
- Email, social links

---

## 🌐 Deployment

**Vercel (Easiest):**
```bash
1. Push to GitHub
2. vercel.com → New Project
3. Import repo → Deploy
```

**Netlify:**
```bash
1. Push to GitHub  
2. netlify.com → New Site
3. Connect repo → Deploy
```

**Manual:**
```bash
npm run build
# Upload /dist folder to host
```

---

## 🐛 Quick Fixes

**Problem:** Can't login  
**Fix:** Clear cache, check email/password

**Problem:** No content showing  
**Fix:** Click "Initialize Default Content"

**Problem:** Edits not saving  
**Fix:** Check you're logged in (toolbar visible)

**Problem:** Images not uploading  
**Fix:** Check file size < 5MB, valid format

---

## 💾 Data Storage

| Type | Where Stored | Persists? |
|------|-------------|-----------|
| Text | Supabase KV DB | ✅ Forever |
| Uploaded images | Supabase Storage | ✅ Forever |
| URL images | External link | ✅ Yes |
| Login session | Browser token | Until logout |

---

## 🎯 Common Tasks

### **Change Hero Image**
```
Home → Edit Mode → Click hero image → Upload/URL → Save
```

### **Update Service Description**
```
Dashboard → Services tab → Edit text → Save All
```

### **Add Portfolio Project**
```
Dashboard → Work tab → Edit project fields → Save All
```

### **Change Contact Email**
```
Home → Edit Mode → Scroll to footer → Click email → Edit → Enter
```

---

## 📱 Access From

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iPhone, Android)
- ✅ Tablet (iPad, etc.)
- ✅ Any device with internet

---

## 🚨 Emergency Reset

If something goes wrong:

```
1. Login to admin dashboard
2. Click "Initialize Default Content"
3. This resets to original SOBO content
```

---

## 📞 Support Checklist

Before asking for help:

- [ ] Checked browser console (F12)
- [ ] Tried clearing cache
- [ ] Confirmed you're logged in
- [ ] Tested in different browser
- [ ] Read error messages

---

## ✨ Pro Tips

💡 **Use external URLs** for images (faster than uploading)  
💡 **Edit mode = yellow highlights** to show editable elements  
💡 **Auto-save** means no manual save needed for inline edits  
💡 **Preview mode** shows what visitors see  
💡 **Multiple tabs** work - edits sync across all  

---

## 🎉 You're Ready!

**Deploy → Signup → Initialize → Edit → Done!**

Your site is production-ready. Edit from anywhere, anytime.

**No Figma Make needed ever again! 🚀**

---

**Quick links:**
- Full guide: `DEPLOYMENT_GUIDE.md`
- Technical details: `MIGRATION_COMPLETE.md`
