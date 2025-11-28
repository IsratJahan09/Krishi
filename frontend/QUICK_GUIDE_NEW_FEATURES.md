# 🚀 Quick Guide - New Features

## ⚡ Get Started in 30 Seconds

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the New Pages

Open your browser and visit:

#### 🌤️ Weather Alert Page
```
http://localhost:8080/weather-alert
```
- Enter location name (e.g., ঢাকা, চট্টগ্রাম)
- View 5-day forecast
- Get farming advice based on weather

#### 📦 Storage Advice Page
```
http://localhost:8080/storage-advice
```
- Browse 6 storage tips
- Click any post to read full article
- Learn proper crop storage methods

#### 🛡️ Crop Protection Page
```
http://localhost:8080/crop-protection
```
- Browse 6 protection guides
- Click any post to read full article
- Learn disease prevention methods

---

## 🎯 Quick Navigation

### From Homepage
1. Go to `http://localhost:8080`
2. Click any of the three feature cards:
   - **আবহাওয়া সতর্কতা** → Weather Alert
   - **সংরক্ষণ পরামর্শ** → Storage Advice
   - **ফসল রক্ষা** → Crop Protection

### Back Navigation
- Every page has a "হোমে ফিরে যান" (Back to Home) button
- Blog posts have "ফিরে যান" (Back) button

---

## 📱 Mobile Testing

### Test on Mobile Device
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Visit: `http://YOUR_IP:8080` on mobile
3. Test all three pages

### Responsive Breakpoints
- **Mobile**: 320px - 767px (1 column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: 1024px+ (3 columns)

---

## 🎨 What You'll See

### Weather Alert Page
- Search box for location
- 5 forecast cards (horizontal scroll on mobile)
- Advisory message with icon
- Additional tips section

### Storage Advice Page
- 6 blog post cards in grid
- Each card shows:
  - Title in Bangla
  - Short description
  - Category tag
  - Date in Bangla
  - "বিস্তারিত পড়ুন" button

### Crop Protection Page
- 6 blog post cards in grid
- Emergency tips section with emojis
- Help/contact section at bottom

### Single Blog Post
- Full article content
- Formatted with headings and lists
- Back button to list page
- Related posts section

---

## 🔧 Customization

### Change Blog Content
Edit `src/data/blogPosts.ts`:
```typescript
export const storagePosts: BlogPost[] = [
  {
    id: '1',
    slug: 'your-slug',
    title: 'আপনার শিরোনাম',
    description: 'সংক্ষিপ্ত বিবরণ',
    tag: 'ট্যাগ',
    date: '২৫ নভেম্বর, ২০২৫',
    content: `আপনার সম্পূর্ণ কন্টেন্ট`,
    category: 'storage'
  }
];
```

### Add New Blog Post
1. Open `src/data/blogPosts.ts`
2. Add new object to `storagePosts` or `protectionPosts` array
3. Save file
4. Post automatically appears on page

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: 142 65% 35%;  /* Green */
  --accent: 45 85% 55%;    /* Yellow */
}
```

---

## 🐛 Troubleshooting

### Page Not Found
- Check URL spelling
- Ensure dev server is running
- Clear browser cache

### Bangla Text Not Showing
- Check font loading in browser
- Verify `font-bangla` class is applied
- Check browser console for errors

### Build Errors
```bash
# Clear and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Features Checklist

### Weather Alert ✅
- [x] Location search
- [x] 5-day forecast
- [x] Bangla numbers
- [x] Weather icons
- [x] Advisory messages
- [x] LocalStorage cache
- [x] Mobile responsive

### Storage Advice ✅
- [x] 6 blog posts
- [x] Grid layout
- [x] Single post view
- [x] Category tags
- [x] Bangla dates
- [x] Read more buttons
- [x] Mobile responsive

### Crop Protection ✅
- [x] 6 blog posts
- [x] Grid layout
- [x] Single post view
- [x] Emergency tips
- [x] Help section
- [x] Shield icon theme
- [x] Mobile responsive

---

## 🎯 Key URLs

```
Homepage:           http://localhost:8080/
Weather Alert:      http://localhost:8080/weather-alert
Storage Advice:     http://localhost:8080/storage-advice
Crop Protection:    http://localhost:8080/crop-protection

Example Blog Post:  http://localhost:8080/storage-advice/dhan-shukano-somoy
```

---

## 💡 Tips

1. **Test on Mobile First**: The design is mobile-first
2. **Use Real Device**: Test on actual phone for best results
3. **Check Bangla Font**: Ensure Noto Sans Bengali loads
4. **Test Scroll**: Horizontal scroll on forecast cards
5. **Try All Links**: Click through all navigation

---

## 🎉 You're Ready!

All three pages are fully functional and ready to use. Start the dev server and explore!

```bash
npm run dev
```

Then visit: **http://localhost:8080**

---

**Happy Farming! 🌾**
