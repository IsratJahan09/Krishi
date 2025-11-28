# 🚀 Krishi Platform - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file (already exists, but verify):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### 3. Start Development Server
```bash
npm run dev
```
Visit: http://localhost:8080

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎯 Key Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Useful
npm outdated             # Check for updates
npm update               # Update dependencies
```

---

## 📱 Features Overview

### For Farmers
1. **Register/Login** - Phone-based authentication
2. **Weather Advisory** - 5-day forecast with advice
3. **Crop Management** - Track harvest batches
4. **Badges** - Earn achievements
5. **Export Data** - Download as JSON/CSV

### For Developers
- React 18 + TypeScript
- Vite for fast builds
- Tailwind CSS + shadcn/ui
- Supabase backend
- LocalStorage persistence

---

## 🔧 Project Structure

```
src/
├── components/       # UI components
├── pages/           # Route pages
├── utils/           # Helper functions
├── hooks/           # Custom hooks
└── integrations/    # Supabase

Key Files:
- src/App.tsx        # Main app & routing
- src/main.tsx       # Entry point
- src/index.css      # Global styles
```

---

## 🐛 Common Issues & Solutions

### Issue: Port 8080 already in use
```bash
# Change port in vite.config.ts
server: {
  port: 3000  # or any other port
}
```

### Issue: Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: TypeScript errors
```bash
# Check diagnostics
npm run lint
```

---

## 🔐 Security Notes

⚠️ **IMPORTANT**: 
- `.env` is now in `.gitignore` (fixed today)
- Never commit API keys
- Passwords are stored in plain text (needs fixing)
- See `SECURITY_CHECKLIST.md` for details

---

## 📚 Documentation

- **ISSUES_FIXED.md** - What was fixed today
- **SECURITY_CHECKLIST.md** - Security improvements needed
- **PROJECT_STATUS_REPORT.md** - Complete project analysis
- **QUICK_START.md** - This file

---

## 🎨 Customization

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: 142 65% 35%;  /* Green */
  --accent: 45 85% 55%;    /* Yellow */
}
```

### Add New Route
1. Create page in `src/pages/`
2. Add route in `src/App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

### Add New Component
```bash
# shadcn/ui components
npx shadcn-ui@latest add button

# Custom component
# Create in src/components/
```

---

## 🧪 Testing (To Be Added)

```bash
# Install testing tools
npm install --save-dev vitest @testing-library/react

# Add to package.json
"test": "vitest"

# Run tests
npm test
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

### Manual
```bash
npm run build
# Upload dist/ folder to your server
```

---

## 📞 Need Help?

1. Check documentation files
2. Review error messages
3. Check browser console
4. Review Supabase logs
5. Check GitHub issues

---

## ✅ Current Status

- ✅ All code errors fixed
- ✅ Build successful
- ✅ Lint passing
- ⚠️ Security improvements needed
- ⚠️ Tests not implemented
- ⚠️ Dependencies outdated

---

## 🎯 Next Steps

1. **Immediate**: Check if `.env` was committed to Git
2. **Short-term**: Implement password hashing
3. **Medium-term**: Add tests
4. **Long-term**: Update dependencies

---

**Happy Coding! 🌾**
