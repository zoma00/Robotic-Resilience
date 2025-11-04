// Regional Settings System
// Provides manual region selection for localized survival guidance

class RegionalSettings {
  constructor() {
    this.storageKey = 'survival_regional_settings';
    this.currentRegion = this.loadRegion();
    this.regions = this.initializeRegions();
    this.init();
  }

  initializeRegions() {
    return {
      'north-america': {
        name: 'North America',
        flag: '🇺🇸',
        climate: 'Temperate/Continental',
        languages: ['English', 'Spanish', 'French'],
        emergencyNumber: '911',
        specificTips: [
          'Heavy winter clothing essential in northern regions',
          'Tornado shelters in central plains areas',
          'Hurricane preparedness for coastal areas',
          'Wildfire evacuation routes in western regions'
        ],
        commonHazards: ['Severe weather', 'Wildfires', 'Flooding', 'Earthquakes (West Coast)'],
        water: 'Generally safe municipal water, purify natural sources',
        shelter: 'Frame construction common, basements available in most areas'
      },
      'europe': {
        name: 'Europe',
        flag: '🇪🇺',
        climate: 'Temperate/Maritime',
        languages: ['English', 'German', 'French', 'Spanish', 'Italian'],
        emergencyNumber: '112',
        specificTips: [
          'Dense urban areas require vertical evacuation plans',
          'Historical buildings may lack modern safety features',
          'Excellent public transportation for evacuation',
          'Multi-language emergency broadcasts'
        ],
        commonHazards: ['Flooding', 'Severe storms', 'Heat waves', 'Cold snaps'],
        water: 'High quality municipal water, mountain streams generally safe',
        shelter: 'Stone/concrete construction, limited heating in emergencies'
      },
      'middle-east': {
        name: 'Middle East',
        flag: '🇸🇦',
        climate: 'Arid/Desert',
        languages: ['Arabic', 'Persian', 'Turkish', 'Hebrew'],
        emergencyNumber: 'Varies by country',
        specificTips: [
          'Extreme heat protection essential',
          'Water conservation critical',
          'Sandstorm shelter procedures',
          'Cultural considerations for emergency protocols'
        ],
        commonHazards: ['Extreme heat', 'Sandstorms', 'Flash floods', 'Political instability'],
        water: 'Treat all water sources, severe scarcity possible',
        shelter: 'Thick walls for heat protection, flat roofs common'
      },
      'africa': {
        name: 'Africa',
        flag: '🌍',
        climate: 'Tropical/Arid',
        languages: ['Arabic', 'Swahili', 'French', 'English', 'Portuguese'],
        emergencyNumber: 'Varies by country',
        specificTips: [
          'Tropical disease prevention',
          'Seasonal flood planning',
          'Limited emergency services in rural areas',
          'Traditional shelter construction knowledge useful'
        ],
        commonHazards: ['Disease outbreaks', 'Flooding', 'Drought', 'Wildlife encounters'],
        water: 'Purification essential, seasonal availability varies',
        shelter: 'Traditional materials often superior to modern in climate'
      },
      'asia': {
        name: 'Asia',
        flag: '🌏',
        climate: 'Varies (Tropical to Arctic)',
        languages: ['Mandarin', 'Hindi', 'Japanese', 'Korean', 'Thai', 'Vietnamese'],
        emergencyNumber: 'Varies by country',
        specificTips: [
          'Monsoon season preparation',
          'High population density evacuation challenges',
          'Earthquake and tsunami preparedness',
          'Traditional preservation techniques valuable'
        ],
        commonHazards: ['Earthquakes', 'Tsunamis', 'Typhoons', 'Flooding', 'Volcanic activity'],
        water: 'Purification essential, groundwater often contaminated',
        shelter: 'Earthquake-resistant construction, elevated for flooding'
      },
      'oceania': {
        name: 'Oceania',
        flag: '🇦🇺',
        climate: 'Tropical/Temperate',
        languages: ['English', 'Maori', 'Pacific Islander languages'],
        emergencyNumber: '000 (Australia), 111 (New Zealand)',
        specificTips: [
          'Bushfire evacuation plans essential',
          'Isolation requires extended self-sufficiency',
          'Marine emergency procedures',
          'Traditional island survival techniques'
        ],
        commonHazards: ['Bushfires', 'Cyclones', 'Flooding', 'Remote location challenges'],
        water: 'Rainwater collection systems, treat natural sources',
        shelter: 'Elevated construction for flooding, fire-resistant materials'
      },
      'south-america': {
        name: 'South America',
        flag: '🇧🇷',
        climate: 'Tropical/Temperate',
        languages: ['Spanish', 'Portuguese', 'Indigenous languages'],
        emergencyNumber: 'Varies by country',
        specificTips: [
          'High altitude considerations in Andes',
          'Tropical disease prevention',
          'Remote area self-sufficiency',
          'Seasonal weather extremes'
        ],
        commonHazards: ['Earthquakes', 'Volcanic activity', 'Flooding', 'Disease outbreaks'],
        water: 'Purification essential, abundant in most areas',
        shelter: 'Earthquake considerations, elevation for flooding'
      },
      'egypt': {
        name: 'Egypt',
        flag: '🇪🇬',
        climate: 'Arid Desert',
        languages: ['Arabic', 'English'],
        emergencyNumber: '122 (Police), 123 (Ambulance)',
        specificTips: [
          'Extreme heat and sun protection',
          'Sand and dust storm procedures',
          'Water scarcity management',
          'Cultural and religious considerations'
        ],
        commonHazards: ['Extreme heat', 'Sandstorms', 'Flash floods (rare but severe)', 'Water scarcity'],
        water: 'All water must be purified, very scarce in desert areas',
        shelter: 'Thick walls, courtyards for cooling, underground when possible'
      }
    };
  }

  init() {
    this.createRegionSelector();
    this.applyRegionalSettings();
  }

  loadRegion() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved).region : 'north-america'; // Default region
  }

  saveRegion(regionKey) {
    const settings = {
      region: regionKey,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
    this.currentRegion = regionKey;
    
    // Track region selection
    gtag('event', 'region_selection', {
      event_category: 'User Preferences',
      event_label: regionKey,
      value: 1
    });
  }

  createRegionSelector() {
    // Create floating region selector button
    const selectorButton = document.createElement('div');
    selectorButton.id = 'region-selector-button';
    selectorButton.innerHTML = `
      <div class="region-button">
        <span class="region-flag">${this.regions[this.currentRegion].flag}</span>
        <span class="region-name">${this.regions[this.currentRegion].name}</span>
        <span class="dropdown-arrow">▼</span>
      </div>
    `;

    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.id = 'region-dropdown';
    dropdown.className = 'region-dropdown hidden';
    
    // Get current language for UI text
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const uiText = this.getUIText(currentLang);
    
    dropdown.innerHTML = `
      <div class="dropdown-header">
        <h3>${uiText.selectYourRegion}</h3>
        <p>${uiText.getRegionSpecific}</p>
      </div>
      <div class="region-options">
        ${Object.entries(this.regions).map(([key, region]) => `
          <div class="region-option ${key === this.currentRegion ? 'selected' : ''}" 
               data-region="${key}">
            <span class="option-flag">${region.flag}</span>
            <div class="option-details">
              <div class="option-name">${region.name}</div>
              <div class="option-climate">${region.climate}</div>
            </div>
            ${key === this.currentRegion ? '<span class="selected-check">✓</span>' : ''}
          </div>
        `).join('')}
      </div>
      <div class="dropdown-footer">
        <button class="close-dropdown">${uiText.close}</button>
      </div>
    `;

    // Add styles
    this.addRegionSelectorStyles();

    // Append to body
    document.body.appendChild(selectorButton);
    document.body.appendChild(dropdown);

    // Bind events
    this.bindRegionSelectorEvents();
  }

  getUIText(language) {
    const texts = {
      en: {
        selectYourRegion: '🌍 Select Your Region',
        getRegionSpecific: 'Get region-specific survival guidance',
        close: 'Close'
      },
      ar: {
        selectYourRegion: '🌍 اختر منطقتك',
        getRegionSpecific: 'احصل على إرشادات البقاء الخاصة بالمنطقة',
        close: 'إغلاق'
      }
    };
    return texts[language] || texts.en;
  }

  addRegionSelectorStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #region-selector-button {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        cursor: pointer;
      }

      .region-button {
        background: linear-gradient(135deg, 
          rgba(154, 230, 180, 0.9) 0%, 
          rgba(104, 211, 145, 0.9) 100%);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(154, 230, 180, 0.4);
        border-radius: 25px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #1a202c;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(154, 230, 180, 0.3);
        transition: all 0.3s ease;
      }

      .region-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(154, 230, 180, 0.4);
      }

      .region-flag {
        font-size: 1.2rem;
      }

      .dropdown-arrow {
        font-size: 0.8rem;
        opacity: 0.7;
        transition: transform 0.3s ease;
      }

      .region-button.open .dropdown-arrow {
        transform: rotate(180deg);
      }

      .region-dropdown {
        position: fixed;
        top: 70px;
        right: 20px;
        width: 320px;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.95) 0%, 
          rgba(248, 250, 252, 0.95) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(154, 230, 180, 0.3);
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        transition: all 0.3s ease;
      }

      .region-dropdown.hidden {
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
      }

      .dropdown-header {
        padding: 20px;
        border-bottom: 1px solid rgba(154, 230, 180, 0.2);
      }

      .dropdown-header h3 {
        margin: 0 0 5px 0;
        color: #1a202c;
        font-size: 1.1rem;
      }

      .dropdown-header p {
        margin: 0;
        color: #4a5568;
        font-size: 0.9rem;
      }

      .region-options {
        max-height: 300px;
        overflow-y: auto;
        padding: 10px;
      }

      .region-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .region-option:hover {
        background: rgba(154, 230, 180, 0.1);
      }

      .region-option.selected {
        background: rgba(154, 230, 180, 0.2);
        border: 1px solid rgba(154, 230, 180, 0.4);
      }

      .option-flag {
        font-size: 1.5rem;
      }

      .option-details {
        flex: 1;
      }

      .option-name {
        font-weight: 600;
        color: #1a202c;
        margin-bottom: 2px;
      }

      .option-climate {
        font-size: 0.8rem;
        color: #4a5568;
      }

      .selected-check {
        color: #38a169;
        font-weight: bold;
      }

      .dropdown-footer {
        padding: 15px 20px;
        border-top: 1px solid rgba(154, 230, 180, 0.2);
        text-align: center;
      }

      .close-dropdown {
        background: linear-gradient(135deg, #9AE6B4 0%, #68D391 100%);
        color: #1a202c;
        border: none;
        padding: 8px 20px;
        border-radius: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .close-dropdown:hover {
        background: linear-gradient(135deg, #68D391 0%, #48BB78 100%);
      }

      @media (max-width: 768px) {
        #region-selector-button {
          top: 10px;
          right: 10px;
        }

        .region-dropdown {
          right: 10px;
          left: 10px;
          width: auto;
          top: 60px;
        }

        .region-button {
          padding: 8px 12px;
          font-size: 0.8rem;
        }

        .region-name {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  bindRegionSelectorEvents() {
    const button = document.getElementById('region-selector-button');
    const dropdown = document.getElementById('region-dropdown');
    const closeBtn = dropdown.querySelector('.close-dropdown');
    const options = dropdown.querySelectorAll('.region-option');

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    closeBtn.addEventListener('click', () => {
      this.hideDropdown();
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const regionKey = option.dataset.region;
        this.selectRegion(regionKey);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        this.hideDropdown();
      }
    });
  }

  toggleDropdown() {
    const dropdown = document.getElementById('region-dropdown');
    const button = document.querySelector('.region-button');
    
    if (dropdown.classList.contains('hidden')) {
      this.showDropdown();
    } else {
      this.hideDropdown();
    }
  }

  showDropdown() {
    const dropdown = document.getElementById('region-dropdown');
    const button = document.querySelector('.region-button');
    
    dropdown.classList.remove('hidden');
    button.classList.add('open');
  }

  hideDropdown() {
    const dropdown = document.getElementById('region-dropdown');
    const button = document.querySelector('.region-button');
    
    dropdown.classList.add('hidden');
    button.classList.remove('open');
  }

  selectRegion(regionKey) {
    if (this.regions[regionKey]) {
      this.saveRegion(regionKey);
      this.updateRegionDisplay();
      this.applyRegionalSettings();
      this.hideDropdown();
      
      // Show confirmation
      this.showRegionChangeNotification();
    }
  }

  updateRegionDisplay() {
    const button = document.querySelector('.region-button');
    const flagSpan = button.querySelector('.region-flag');
    const nameSpan = button.querySelector('.region-name');
    
    const region = this.regions[this.currentRegion];
    flagSpan.textContent = region.flag;
    nameSpan.textContent = region.name;

    // Update dropdown selected state
    const options = document.querySelectorAll('.region-option');
    options.forEach(option => {
      const isSelected = option.dataset.region === this.currentRegion;
      option.classList.toggle('selected', isSelected);
      
      const checkmark = option.querySelector('.selected-check');
      if (checkmark) checkmark.remove();
      
      if (isSelected) {
        option.innerHTML += '<span class="selected-check">✓</span>';
      }
    });
  }

  applyRegionalSettings() {
    const region = this.regions[this.currentRegion];
    
    // Update page content based on region
    this.updateRegionalContent(region);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('regionChanged', {
      detail: { region: this.currentRegion, regionData: region }
    }));
  }

  updateRegionalContent(region) {
    // Get current language for labels
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const labels = this.getRegionalLabels(currentLang);
    
    // Add region-specific tips to pages
    const regionalTips = document.querySelectorAll('.regional-tips');
    regionalTips.forEach(container => {
      container.innerHTML = `
        <h3>🌍 ${region.name} ${labels.specificTips}</h3>
        <ul>
          ${region.specificTips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        <div class="region-details">
          <p><strong>${labels.emergencyNumber}:</strong> ${region.emergencyNumber}</p>
          <p><strong>${labels.commonHazards}:</strong> ${region.commonHazards.join(', ')}</p>
          <p><strong>${labels.waterSafety}:</strong> ${region.water}</p>
          <p><strong>${labels.shelterNotes}:</strong> ${region.shelter}</p>
        </div>
      `;
    });
  }

  getRegionalLabels(language) {
    const labels = {
      en: {
        specificTips: 'Specific Tips',
        emergencyNumber: 'Emergency Number',
        commonHazards: 'Common Hazards',
        waterSafety: 'Water Safety',
        shelterNotes: 'Shelter Notes'
      },
      ar: {
        specificTips: 'نصائح خاصة',
        emergencyNumber: 'رقم الطوارئ',
        commonHazards: 'المخاطر الشائعة',
        waterSafety: 'سلامة المياه',
        shelterNotes: 'ملاحظات المأوى'
      }
    };
    return labels[language] || labels.en;
  }

  showRegionChangeNotification() {
    const region = this.regions[this.currentRegion];
    
    const notification = document.createElement('div');
    notification.className = 'region-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-flag">${region.flag}</span>
        <span>Region updated to ${region.name}</span>
      </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
      .region-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #9AE6B4 0%, #68D391 100%);
        color: #1a202c;
        padding: 12px 20px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(154, 230, 180, 0.4);
        z-index: 1002;
        animation: slideIn 0.3s ease;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
      }
      
      .notification-flag {
        font-size: 1.2rem;
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  }

  getCurrentRegion() {
    return this.regions[this.currentRegion];
  }

  getCurrentRegionKey() {
    return this.currentRegion;
  }
}

// Initialize regional settings when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.regionalSettings = new RegionalSettings();
});