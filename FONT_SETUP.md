# Font Setup Instructions

## Download Noto Nastaliq Urdu Font Files

You need to download the following font files and place them in `public/assets/fonts/nastaliq/`:

### Required Files:
1. **NotoNastaliqUrdu-Regular.woff2** (weight: 400)
2. **NotoNastaliqUrdu-Medium.woff2** (weight: 500)
3. **NotoNastaliqUrdu-SemiBold.woff2** (weight: 600)
4. **NotoNastaliqUrdu-Bold.woff2** (weight: 700)

### Download Options:

#### Option 1: Google Fonts (Recommended)
1. Visit: https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu
2. Click "Download family"
3. Extract the ZIP file
4. Convert TTF files to WOFF2 format (or use online converter)
5. Rename files to match the names above
6. Place in `public/assets/fonts/nastaliq/`

#### Option 2: Direct Download
You can download from:
- https://github.com/google/fonts/tree/main/ofl/notonastaliqurdu
- Or use a font converter tool

#### Option 3: Use Online Converter
1. Download TTF files from Google Fonts
2. Use https://cloudconvert.com/ttf-to-woff2 to convert
3. Place converted WOFF2 files in `public/assets/fonts/nastaliq/`

### File Structure:
```
public/
  assets/
    fonts/
      nastaliq/
        NotoNastaliqUrdu-Regular.woff2
        NotoNastaliqUrdu-Medium.woff2
        NotoNastaliqUrdu-SemiBold.woff2
        NotoNastaliqUrdu-Bold.woff2
```

### After Downloading:
1. Place all 4 WOFF2 files in `public/assets/fonts/nastaliq/`
2. Restart your dev server: `npm run dev`
3. The font should now work without network issues!

### Benefits:
✅ No network dependency
✅ Faster builds
✅ Works offline
✅ More reliable

