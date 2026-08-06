/**
 * UniAce - Interactive 5-Feature Security Scanner Suite
 * Email Phishing, SMS Scam, URL Scanner, Image Analysis, Video Deepfake Detection
 */

class SecurityScanner {
  constructor() {
    this.tabs = document.querySelectorAll('.scanner-tab');
    this.labelEl = document.getElementById('scan-input-label');
    this.inputArea = document.getElementById('scan-input-container');
    this.presetContainer = document.getElementById('scan-preset-btns');
    this.runBtn = document.getElementById('scan-action-btn');
    this.resultsContainer = document.getElementById('scan-results-content');

    this.activeTool = 'email';

    // Preset Data for all 5 security features
    this.toolConfigs = {
      email: {
        title: 'Email Phishing Analyzer',
        label: 'Email Header & Body Text Payload',
        type: 'textarea',
        placeholder: 'Paste raw email headers or email text body here...',
        presets: [
          { name: '🚨 Phishing Specimen', val: 'FROM: Security Alert <service-update-urgent@paypa1-security-auth-check.com>\nSUBJECT: URGENT: Account Suspension Notice within 2 hours!\nDear Customer, We detected unauthorized access from Russia. Click http://bit.ly/2x9A8zP to verify your SSN immediately or lose your account access permanently.' },
          { name: '✅ Legitimate Email', val: 'FROM: Quarterly Report <reports@enterprise-corp.com>\nSUBJECT: Q3 Security Compliance Summary\nHello Team, Attached is the Q3 compliance audit overview for your review. Please submit any feedback by Friday.' }
        ]
      },
      sms: {
        title: 'SMS Scam & Smishing Inspector',
        label: 'SMS Message Content',
        type: 'textarea',
        placeholder: 'Enter suspicious SMS text message...',
        presets: [
          { name: '🚨 Smishing Scam', val: '[USPS ALERT]: Your package could not be delivered due to an incorrect house number. Update your details & pay $1.99 fee within 24h at: https://usps-redelivery-portal-online.top/track' },
          { name: '✅ Safe SMS', val: 'Your One-Time Passcode for Security Login is 849201. Do not share this code with anyone. Expires in 5 minutes.' }
        ]
      },
      url: {
        title: 'URL & Domain Threat Scanner',
        label: 'Target URL or IP Address',
        type: 'input',
        placeholder: 'https://example-domain-check.com/login',
        presets: [
          { name: '🚨 Spoofed Bank URL', val: 'https://login-chase-online-account-verify-secure.top/auth/login.php?session=9284' },
          { name: '✅ Official URL', val: 'https://www.github.com/security' }
        ]
      },
      image: {
        title: 'Image Forgery & GAN Payload Analyzer',
        label: 'Image File Path / Metadata URL',
        type: 'input',
        placeholder: 'https://cdn.cyber-assets.net/uploads/specimen_091.png',
        presets: [
          { name: '🚨 AI Generated Fake ID', val: 'https://cyber-storage.internal/specimens/ai_generated_passport_specimen.png' },
          { name: '✅ Genuine Photograph', val: 'https://images.unsplash.com/photo-1563089145-599997674d42' }
        ]
      },
      video: {
        title: 'Video Deepfake & Facial Landmark Detector',
        label: 'Video Stream / File Payload',
        type: 'input',
        placeholder: 'https://video-cdn.net/streams/executive_statement_raw.mp4',
        presets: [
          { name: '🚨 Executive Voice & Face Clone', val: 'https://stream.cyber-assets.net/samples/ceo_synthetic_deepfake_call.mp4' },
          { name: '✅ Authentic Video Stream', val: 'https://stream.cyber-assets.net/samples/official_press_briefing.mp4' }
        ]
      }
    };

    this.init();
  }

  init() {
    if (!this.tabs.length) return;

    this.bindEvents();
    this.switchTool('email');
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.switchTool(tab.dataset.tool);
      });
    });

    if (this.runBtn) {
      this.runBtn.addEventListener('click', () => this.runAnalysis());
    }
  }

  switchTool(toolKey) {
    this.activeTool = toolKey;
    const config = this.toolConfigs[toolKey];
    if (!config) return;

    if (this.labelEl) this.labelEl.innerText = config.label;

    // Render input area
    if (this.inputArea) {
      if (config.type === 'textarea') {
        this.inputArea.innerHTML = `<textarea id="scan-input-field" class="scan-textarea" rows="5" placeholder="${config.placeholder}"></textarea>`;
      } else {
        this.inputArea.innerHTML = `<input type="text" id="scan-input-field" class="scan-input" placeholder="${config.placeholder}" />`;
      }
    }

    // Render preset buttons
    if (this.presetContainer) {
      this.presetContainer.innerHTML = '';
      config.presets.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'preset-btn';
        btn.innerText = p.name;
        btn.addEventListener('click', () => {
          const field = document.getElementById('scan-input-field');
          if (field) field.value = p.val;
        });
        this.presetContainer.appendChild(btn);
      });
    }

    // Reset results area
    this.renderIdleState();
  }

  renderIdleState() {
    if (!this.resultsContainer) return;
    this.resultsContainer.innerHTML = `
      <div class="scan-status-idle">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
        <h3>Ready to Inspect</h3>
        <p style="font-size: 0.85rem; max-width: 280px; margin-top: 0.5rem;">Select a preset or paste custom content then click 'Run AI Security Scan'</p>
      </div>
    `;
  }

  runAnalysis() {
    const inputField = document.getElementById('scan-input-field');
    const content = inputField ? inputField.value.trim() : '';

    if (!content) {
      alert('Please enter or select sample content before running scan.');
      return;
    }

    if (!this.resultsContainer) return;

    // Determine mock threat verdict based on input clues
    const isPhishingOrScam = content.includes('paypa1') || content.includes('URGENT') || content.includes('.top') || content.includes('bit.ly') || content.includes('synthetic') || content.includes('ai_generated');
    const riskScore = isPhishingOrScam ? Math.floor(Math.random() * 8 + 91) : Math.floor(Math.random() * 5 + 2);

    // Render scanning progress state
    this.resultsContainer.innerHTML = `
      <div class="scan-progress">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-cyan);">[AI ENGINE] Processing ${this.toolConfigs[this.activeTool].title}...</span>
          <span id="scan-percentage" style="font-family:var(--font-mono); font-weight:700;">0%</span>
        </div>
        <div class="progress-bar-bg">
          <div id="scan-progress-bar" class="progress-bar-fill"></div>
        </div>
        <div class="scan-log-box" id="scan-logs"></div>
      </div>
    `;

    const progressBar = document.getElementById('scan-progress-bar');
    const percentageEl = document.getElementById('scan-percentage');
    const logsContainer = document.getElementById('scan-logs');

    const steps = [
      'Ingesting payload & extracting token vectors...',
      'Cross-referencing Zero-Day threat global database...',
      'Executing Deep Neural Network NLP sentiment check...',
      'Evaluating domain age, SSL chain & heuristic flags...',
      'Finalizing confidence probability score...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progressPercent = Math.min(currentStep * 15, 90); // Cap at 90% until fetch returns

      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      if (percentageEl) percentageEl.innerText = `${progressPercent}%`;

      if (logsContainer && currentStep <= steps.length) {
        const logItem = document.createElement('div');
        logItem.className = 'scan-log-item done';
        logItem.innerHTML = `<span>✓</span> <span>${steps[currentStep - 1]}</span>`;
        logsContainer.appendChild(logItem);
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    }, 400);

    // Call actual backend API
    const toolToEndpoint = {
      email: '/api/phishing/email',
      sms: '/api/phishing/sms',
      url: '/api/phishing/url',
      image: '/api/deepfake/image',
      video: '/api/deepfake/video'
    };

    const endpoint = toolToEndpoint[this.activeTool];
    const payload = (this.activeTool === 'image' || this.activeTool === 'video') 
      ? { url: content } 
      : { content: content };

    fetch(`http://127.0.0.1:8000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      clearInterval(interval);
      if (progressBar) progressBar.style.width = `100%`;
      if (percentageEl) percentageEl.innerText = `100%`;
      
      const isThreat = data.risk_level === 'HIGH' || data.risk_level === 'CRITICAL';
      const score = Math.floor(data.confidence_score);
      
      setTimeout(() => this.renderVerdict(isThreat, score, content, data), 400);
    })
    .catch(err => {
      clearInterval(interval);
      console.error(err);
      alert('Error connecting to AI Backend. Ensure the FastAPI server is running on port 8000.');
      this.renderIdleState();
    });
  }

  renderVerdict(isThreat, score, content, data = null) {
    if (!this.resultsContainer) return;

    const statusClass = isThreat ? 'verdict-danger' : 'verdict-safe';
    const statusTitle = isThreat ? '🚨 HIGH THREAT DETECTED' : '✅ CLEAN & AUTHENTIC';
    const statusDesc = data ? data.explanation : (isThreat 
      ? 'Severe security risks detected: Malicious triggers, spoofed origins, or synthetic artifacts identified.' 
      : 'No malicious indicators or synthetic alterations detected. Passed zero-trust neural heuristics.');
    const processingTime = data ? `(Processed in ${data.processing_time}s)` : '';

    this.resultsContainer.innerHTML = `
      <div class="verdict-box ${statusClass}">
        <div>
          <h3 style="font-size:1.15rem; margin-bottom:0.3rem;">${statusTitle}</h3>
          <p style="font-size:0.85rem; opacity:0.9;">${statusDesc} <br><span style="font-size:0.75rem; color:#aaa;">${processingTime}</span></p>
        </div>
        <div class="verdict-score">${score}/100</div>
      </div>

      <div style="margin-top: 1.25rem; font-family: var(--font-mono); font-size: 0.8rem; background: rgba(0,0,0,0.4); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
        <div style="color: var(--accent-cyan); margin-bottom: 0.5rem; font-weight: 700;">[DETAILED VECTOR MATRIX]</div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.25rem;">
          <span>AI Model Prediction:</span> <span>${data ? data.prediction : (isThreat ? 'Malicious' : 'Safe')}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.25rem;">
          <span>Risk Level:</span> <span>${data ? data.risk_level : (isThreat ? 'HIGH' : 'LOW')}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>Recommended Action:</span> <span style="color:${isThreat ? '#f87171' : '#10b981'}; font-weight:700;">${isThreat ? 'BLOCK & QUARANTINE' : 'ALLOW TRAFFIC'}</span>
        </div>
      </div>

      <button id="scan-reset-btn" class="btn btn-secondary btn-sm" style="margin-top: 1.25rem; width:100%;">
        Run Another Security Scan
      </button>
    `;

    const resetBtn = document.getElementById('scan-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.renderIdleState());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.securityScanner = new SecurityScanner();
});
