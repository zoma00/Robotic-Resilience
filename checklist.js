// Survival Checklist System with Local Storage
// Tracks user progress across different survival preparation categories

class SurvivalChecklist {
  constructor() {
    this.storageKey = 'survival_checklist_progress';
    this.checklistData = this.initializeChecklistData();
    this.progress = this.loadProgress();
    this.init();
  }

  initializeChecklistData() {
    return {
      'essential-kit': [
        {
          id: 'water-filter',
          title: 'Water Filtration System',
          description: 'Life Straw, water purification tablets, or portable filter',
          priority: 'critical'
        },
        {
          id: 'first-aid',
          title: 'Comprehensive First Aid Kit',
          description: 'Bandages, antiseptics, medications, medical supplies',
          priority: 'critical'
        },
        {
          id: 'multi-tool',
          title: 'Multi-Tool or Swiss Army Knife',
          description: 'Versatile tool with knife, scissors, screwdrivers',
          priority: 'critical'
        },
        {
          id: 'fire-starter',
          title: 'Fire Starting Kit',
          description: 'Waterproof matches, lighter, fire steel, tinder',
          priority: 'critical'
        },
        {
          id: 'emergency-food',
          title: 'Emergency Food Supply (72 hours)',
          description: 'Non-perishable, high-calorie emergency rations',
          priority: 'high'
        },
        {
          id: 'water-storage',
          title: 'Water Storage Containers',
          description: 'Collapsible water containers, water bottles',
          priority: 'high'
        },
        {
          id: 'flashlight',
          title: 'Reliable Flashlight',
          description: 'LED flashlight with extra batteries or hand-crank',
          priority: 'high'
        },
        {
          id: 'rope-paracord',
          title: 'Rope or Paracord (50+ feet)',
          description: 'Strong, versatile cordage for multiple uses',
          priority: 'medium'
        }
      ],
      'navigation': [
        {
          id: 'compass',
          title: 'Magnetic Compass',
          description: 'Reliable compass that works without batteries',
          priority: 'critical'
        },
        {
          id: 'maps',
          title: 'Physical Maps of Local Area',
          description: 'Topographic maps, road maps, waterproof storage',
          priority: 'high'
        },
        {
          id: 'gps-device',
          title: 'Backup GPS Device',
          description: 'Handheld GPS with extra batteries',
          priority: 'medium'
        },
        {
          id: 'whistle',
          title: 'Emergency Whistle',
          description: 'Loud whistle for signaling and communication',
          priority: 'high'
        },
        {
          id: 'radio',
          title: 'Emergency Radio',
          description: 'Hand-crank or solar-powered emergency radio',
          priority: 'medium'
        },
        {
          id: 'mirror',
          title: 'Signaling Mirror',
          description: 'Reflective surface for long-distance signaling',
          priority: 'medium'
        }
      ],
      'shelter': [
        {
          id: 'emergency-blanket',
          title: 'Emergency Blankets/Space Blankets',
          description: 'Reflective blankets for temperature regulation',
          priority: 'critical'
        },
        {
          id: 'tarp',
          title: 'Waterproof Tarp',
          description: 'Large tarp for shelter construction',
          priority: 'high'
        },
        {
          id: 'sleeping-bag',
          title: 'Sleeping Bag or Bedroll',
          description: 'Appropriate for local climate conditions',
          priority: 'high'
        },
        {
          id: 'duct-tape',
          title: 'Duct Tape',
          description: 'Heavy-duty tape for repairs and construction',
          priority: 'medium'
        },
        {
          id: 'tent',
          title: 'Portable Tent or Shelter',
          description: 'Lightweight, easy-to-assemble shelter',
          priority: 'medium'
        },
        {
          id: 'work-gloves',
          title: 'Work Gloves',
          description: 'Durable gloves for handling materials safely',
          priority: 'low'
        }
      ],
      'medical': [
        {
          id: 'prescription-meds',
          title: 'Prescription Medications (30-day supply)',
          description: 'All essential medications for medical conditions',
          priority: 'critical'
        },
        {
          id: 'pain-relievers',
          title: 'Pain Relievers & Fever Reducers',
          description: 'Ibuprofen, acetaminophen, aspirin',
          priority: 'high'
        },
        {
          id: 'antibiotics',
          title: 'Antibiotic Ointment',
          description: 'Topical antibiotics for wound care',
          priority: 'high'
        },
        {
          id: 'medical-documents',
          title: 'Medical Information Cards',
          description: 'Emergency contacts, medical conditions, allergies',
          priority: 'high'
        },
        {
          id: 'thermometer',
          title: 'Digital Thermometer',
          description: 'Battery-powered medical thermometer',
          priority: 'medium'
        },
        {
          id: 'emergency-medicine',
          title: 'Emergency Medications',
          description: 'EpiPen, inhalers, emergency heart medication',
          priority: 'critical'
        }
      ],
      'knowledge': [
        {
          id: 'first-aid-training',
          title: 'First Aid & CPR Certification',
          description: 'Complete certified first aid and CPR training',
          priority: 'critical'
        },
        {
          id: 'navigation-skills',
          title: 'Navigation Skills Practice',
          description: 'Practice using compass and map reading',
          priority: 'high'
        },
        {
          id: 'water-purification',
          title: 'Water Purification Knowledge',
          description: 'Learn multiple methods of water purification',
          priority: 'high'
        },
        {
          id: 'fire-making',
          title: 'Fire Making Skills',
          description: 'Practice starting fires in various conditions',
          priority: 'high'
        },
        {
          id: 'shelter-building',
          title: 'Shelter Construction Skills',
          description: 'Learn to build emergency shelters',
          priority: 'medium'
        },
        {
          id: 'edible-plants',
          title: 'Local Edible Plants Identification',
          description: 'Study edible and poisonous plants in your area',
          priority: 'low'
        },
        {
          id: 'emergency-protocols',
          title: 'Emergency Communication Protocols',
          description: 'Family emergency plans and meeting points',
          priority: 'high'
        }
      ]
    };
  }

  init() {
    this.renderAllChecklists();
    this.updateProgressStats();
    this.bindEvents();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    this.trackProgressUpdate();
  }

  renderAllChecklists() {
    Object.keys(this.checklistData).forEach(category => {
      this.renderChecklist(category);
    });
  }

  renderChecklist(category) {
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) return;

    const items = this.checklistData[category];
    grid.innerHTML = '';

    items.forEach(item => {
      const isCompleted = this.progress[item.id] || false;
      const itemElement = this.createChecklistItem(item, isCompleted);
      grid.appendChild(itemElement);
    });

    this.updateCategoryProgress(category);
  }

  createChecklistItem(item, isCompleted) {
    const itemDiv = document.createElement('div');
    itemDiv.className = `checklist-item ${isCompleted ? 'completed' : ''}`;
    itemDiv.setAttribute('data-item-id', item.id);

    itemDiv.innerHTML = `
      <div class="item-content">
        <div class="item-checkbox ${isCompleted ? 'checked' : ''}"></div>
        <div class="item-details">
          <div class="item-title">${item.title}</div>
          <div class="item-description">${item.description}</div>
        </div>
      </div>
      <div class="item-priority priority-${item.priority}">${item.priority}</div>
    `;

    itemDiv.addEventListener('click', () => this.toggleItem(item.id));
    return itemDiv;
  }

  toggleItem(itemId) {
    this.progress[itemId] = !this.progress[itemId];
    this.saveProgress();
    this.updateDisplay();
    
    // Track completion in analytics
    gtag('event', 'checklist_item_toggle', {
      event_category: 'User Engagement',
      event_label: itemId,
      value: this.progress[itemId] ? 1 : 0
    });
  }

  updateDisplay() {
    // Update all visual elements
    Object.keys(this.checklistData).forEach(category => {
      this.renderChecklist(category);
    });
    this.updateProgressStats();
  }

  updateCategoryProgress(category) {
    const items = this.checklistData[category];
    const completed = items.filter(item => this.progress[item.id]).length;
    const total = items.length;
    
    const progressElement = document.getElementById(`${category}-progress`);
    if (progressElement) {
      progressElement.textContent = `${completed}/${total}`;
    }
  }

  updateProgressStats() {
    const allItems = Object.values(this.checklistData).flat();
    const completedItems = allItems.filter(item => this.progress[item.id]);
    const criticalItems = allItems.filter(item => item.priority === 'critical');
    const criticalCompleted = criticalItems.filter(item => this.progress[item.id]);
    
    const overallProgress = Math.round((completedItems.length / allItems.length) * 100);
    
    // Update stats display
    document.getElementById('overall-progress').textContent = `${overallProgress}%`;
    document.getElementById('completed-items').textContent = completedItems.length;
    document.getElementById('critical-completed').textContent = `${criticalCompleted.length}/${criticalItems.length}`;
    document.getElementById('remaining-items').textContent = allItems.length - completedItems.length;

    // Update category progress
    Object.keys(this.checklistData).forEach(category => {
      this.updateCategoryProgress(category);
    });
  }

  bindEvents() {
    // Any additional event bindings can go here
  }

  trackProgressUpdate() {
    const allItems = Object.values(this.checklistData).flat();
    const completedItems = allItems.filter(item => this.progress[item.id]);
    const overallProgress = Math.round((completedItems.length / allItems.length) * 100);
    
    gtag('event', 'checklist_progress_update', {
      event_category: 'User Engagement',
      event_label: 'overall_progress',
      value: overallProgress
    });
  }

  exportProgress() {
    const allItems = Object.values(this.checklistData).flat();
    const completedItems = allItems.filter(item => this.progress[item.id]);
    const overallProgress = Math.round((completedItems.length / allItems.length) * 100);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      overallProgress: overallProgress,
      completedItems: completedItems.length,
      totalItems: allItems.length,
      categoryBreakdown: {},
      completedItemsList: completedItems.map(item => ({
        title: item.title,
        category: this.findItemCategory(item.id),
        priority: item.priority
      }))
    };

    // Calculate category breakdown
    Object.keys(this.checklistData).forEach(category => {
      const items = this.checklistData[category];
      const completed = items.filter(item => this.progress[item.id]).length;
      exportData.categoryBreakdown[category] = {
        completed: completed,
        total: items.length,
        percentage: Math.round((completed / items.length) * 100)
      };
    });

    // Create downloadable file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `survival_checklist_progress_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // Track export
    gtag('event', 'checklist_export', {
      event_category: 'User Engagement',
      event_label: 'progress_export',
      value: overallProgress
    });
  }

  findItemCategory(itemId) {
    for (const [category, items] of Object.entries(this.checklistData)) {
      if (items.some(item => item.id === itemId)) {
        return category;
      }
    }
    return 'unknown';
  }

  printChecklist() {
    const printWindow = window.open('', '_blank');
    const allItems = Object.values(this.checklistData).flat();
    const completedItems = allItems.filter(item => this.progress[item.id]);
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Survival Checklist - Progress Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2d3748; border-bottom: 2px solid #9AE6B4; padding-bottom: 10px; }
          h2 { color: #4a5568; margin-top: 30px; }
          .progress-summary { background: #f7fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .checklist-item { margin: 10px 0; padding: 10px; border-left: 4px solid #e2e8f0; }
          .completed { border-left-color: #9AE6B4; background: #f0fff4; }
          .pending { border-left-color: #fed7d7; background: #fffafa; }
          .priority { display: inline-block; padding: 2px 6px; border-radius: 12px; font-size: 0.8em; font-weight: bold; }
          .priority-critical { background: #fed7d7; color: #c53030; }
          .priority-high { background: #feebc8; color: #dd6b20; }
          .priority-medium { background: #bee3f8; color: #3182ce; }
          .priority-low { background: #c6f6d5; color: #38a169; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <h1>🛡️ Survival Checklist Progress Report</h1>
        <div class="progress-summary">
          <p><strong>Overall Progress:</strong> ${Math.round((completedItems.length / allItems.length) * 100)}% (${completedItems.length}/${allItems.length} items)</p>
          <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        ${Object.keys(this.checklistData).map(category => {
          const items = this.checklistData[category];
          const completed = items.filter(item => this.progress[item.id]).length;
          
          return `
            <h2>${this.getCategoryTitle(category)} (${completed}/${items.length})</h2>
            ${items.map(item => `
              <div class="checklist-item ${this.progress[item.id] ? 'completed' : 'pending'}">
                <strong>${this.progress[item.id] ? '✅' : '⏳'} ${item.title}</strong>
                <span class="priority priority-${item.priority}">${item.priority}</span><br>
                <small>${item.description}</small>
              </div>
            `).join('')}
          `;
        }).join('')}
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()">Print This Report</button>
          <button onclick="window.close()">Close</button>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Track print
    gtag('event', 'checklist_print', {
      event_category: 'User Engagement',
      event_label: 'progress_print',
      value: Math.round((completedItems.length / allItems.length) * 100)
    });
  }

  getCategoryTitle(category) {
    const titles = {
      'essential-kit': '🛡️ Essential Survival Kit',
      'navigation': '🧭 Navigation & Communication', 
      'shelter': '🏠 Shelter & Protection',
      'medical': '🏥 Medical & Health',
      'knowledge': '📚 Knowledge & Skills'
    };
    return titles[category] || category;
  }

  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      this.progress = {};
      this.saveProgress();
      this.updateDisplay();
      
      // Track reset
      gtag('event', 'checklist_reset', {
        event_category: 'User Engagement',
        event_label: 'progress_reset',
        value: 1
      });
      
      alert('Progress has been reset successfully.');
    }
  }
}

// Global functions for button actions
function exportProgress() {
  if (window.survivalChecklist) {
    window.survivalChecklist.exportProgress();
  }
}

function printChecklist() {
  if (window.survivalChecklist) {
    window.survivalChecklist.printChecklist();
  }
}

function resetProgress() {
  if (window.survivalChecklist) {
    window.survivalChecklist.resetProgress();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.survivalChecklist = new SurvivalChecklist();
  
  // Track checklist page engagement
  let startTime = Date.now();
  
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    gtag('event', 'page_engagement', {
      event_category: 'User Behavior',
      event_label: 'checklist_page_time',
      value: timeSpent
    });
  });
});