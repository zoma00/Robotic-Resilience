# 🤖 Human Continuity Blueprint — Robotic Apocalypse Survival Guide

A comprehensive, practical survival guide for small human groups in a robotic/AI apocalypse scenario. Complete with **multilingual support**, offline functionality, and accessibility features.

## 🌐 Multilingual Support

The survival guide is available in **four languages** with full offline functionality:

- 🇺🇸 **English** - Original content
- 🇸🇦 **Arabic** - RTL layout support (العربية)
- 🇩🇪 **German** - European language support (Deutsch)  
- 🇨🇳 **Chinese** - Asian language support (中文)

## Features

- **Complete survival phases**: From initial detection avoidance to long-term rebuilding
- **Practical skills**: Navigation, water purification, food sustainability, defense strategies
- **Multilingual access**: 4 languages with 200+ translation keys
- **Offline-first**: Works without internet connection using bundled translations
- **PDF downloads**: Generate and download the entire guide as PDF
- **RTL support**: Proper Arabic text rendering and layout
- **Accessibility**: Screen reader support, voice controls, adjustable text size
- **Multi-page site**: Separate pages for survival kit, navigation tutorial, and maps

## Quick Start

1. **Online version**: Visit the [GitHub Pages site](https://yourusername.github.io/robotic-apocalypse-survival-guide/)
2. **Offline use**: The site works completely offline after first load
3. **PDF download**: Click "Download Entire Blog (PDF)" for offline reading

## PDF Downloads

### Downloading All PDFs as ZIP (Important for Offline Use)

**If you want to use the "Download All PDFs (ZIP)" button:**

Modern browsers block JavaScript from accessing local files directly (file:// URLs) for security reasons. To use the ZIP download feature, you must run a local web server:

1. Open a terminal in your project directory.
2. Run:
	```bash
	python3 -m http.server 8080
	```
3. Open your browser and go to:
	[http://localhost:8080/index.html](http://localhost:8080/index.html)
4. Now the "Download All PDFs (ZIP)" button will work and let you download all PDFs at once.

If you open index.html directly from your file system (file://), the ZIP download will **not** work due to browser security restrictions.

You can still download individual PDFs using the other buttons, even without a server.

## GitHub Pages Deployment

### Quick Deploy

1. **Create repository**: Push this folder to a new GitHub repository
2. **Enable Pages**: Go to Settings → Pages → Select "Deploy from a branch" → Choose `main` branch `/ (root)` folder
3. **Done!**: Your site will be live at `https://yourusername.github.io/repository-name/`

### Files included
- `index.html` — Main survival guide with multilingual support
- `survival-kit.html` — War survival kit (fully translated)
- `navigation.html` — Navigation tutorial
- `egypt.html` — Egypt map page
- `assets/js/lang-switcher.js` — Bundled translations for all 4 languages
- `assets/css/styles.css` — Main stylesheet with RTL support
- `README-i18n.md` — Internationalization technical documentation
- `sw.js` — Service worker for offline functionality
- `assets/` — Images, icons, and scripts

## 🔧 Technical Implementation

### Internationalization (i18n)
- **Bundled JavaScript** approach for offline reliability
- **Data-attribute** based translation system (`data-i18n="key"`)
- **localStorage** persistence for language preferences
- **Automatic RTL/LTR** text direction switching
- **200+ translation keys** covering all content areas

### Language Switching
```javascript
// Automatic detection and switching
const savedLang = localStorage.getItem('selectedLanguage') || 'en';
switchLanguage(savedLang);
```

## Development

### Local Development
```bash
# Start local server
python -m http.server 8000
# or use any static file server
```

### PDF Generation

PDFs are generated client-side using html2pdf.js in the browser. No additional setup required.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the site locally
5. Submit a pull request

## License

Content licensed for personal use. Created for preparedness planning and discussion.

---

**Remember**: This is a hypothetical survival guide for educational and entertainment purposes. Stay safe and prepared!
