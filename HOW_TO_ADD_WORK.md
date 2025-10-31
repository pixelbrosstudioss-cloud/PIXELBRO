# 📸 How to Add Your Work to the Website

## 📁 Two Folders Created

### 1. `designs/` folder - For design work
- Add your design images here (JPG, PNG, GIF, WebP)
- Images will automatically appear in the portfolio

### 2. `video-editing/` folder - For video work  
- Add your video files here (MP4, WebM, MOV)
- Videos will automatically appear in the portfolio

## 🎬 How It Works

### For Images (Design Work):
1. Add your image files to the `designs/` folder
2. They will replace the colored placeholders
3. Format: JPG, PNG, GIF, WebP

### For Videos (Video Editing):
1. Add your video files to the `video-editing/` folder
2. They will replace the colored placeholders
3. Format: MP4 (recommended)

## ⚠️ Current Status

✅ **Video Editing Folder**: You already have 1 video (`d5a6afb9dba9c57f89522b4a88d7f9f2.mp4`) - it's now showing on the website!

❌ **Designs Folder**: Empty - Add your design images here

## 📝 Quick Guide to Replace Placeholders

### Option 1: Automatic (Future Feature)
- Just add files to folders - website will automatically load them
- This requires a server or hosting service

### Option 2: Manual (Current Method)
1. Add your images/videos to the folders
2. Open `index.html`
3. Find the placeholder divs
4. Replace with `<img>` or `<video>` tags pointing to your files

**Example:**
```html
<!-- Before (placeholder) -->
<div class="placeholder-image" style="background: linear-gradient(...);"></div>

<!-- After (your image) -->
<img src="designs/your-image.jpg" alt="Project Name">

<!-- After (your video) -->
<video autoplay muted loop playsinline>
    <source src="video-editing/your-video.mp4" type="video/mp4">
</video>
```

## 📦 File Recommendations

### Images:
- **Size**: 1200px - 1920px width
- **Format**: JPG or PNG
- **File size**: Under 2MB

### Videos:
- **Resolution**: 1280x720 or 1920x1080
- **Format**: MP4 (H.264)
- **File size**: Under 50MB
- **Duration**: Short clips (under 30 seconds) work best

## 🎯 Next Steps

1. **Add design images** to `designs/` folder
2. **Add more videos** to `video-editing/` folder
3. **Update the HTML** to display them (replace placeholders)

---

**Tip**: Use descriptive file names like `logo-design-2024.jpg` or `commercial-edit-1.mp4`



