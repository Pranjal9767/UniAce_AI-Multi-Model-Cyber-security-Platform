/**
 * UniAce - Threat Analytics Dashboard Controller
 * Simulates real-time AI security mitigations, threat radar, and live telemetry feeds
 */

class ThreatDashboard {
  constructor() {
    this.feedContainer = document.getElementById('dash-feed-list');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.threatCountEl = document.getElementById('stat-threats-today');
    this.latencyEl = document.getElementById('stat-avg-latency');
    this.riskScoreEl = document.getElementById('stat-risk-score');

    this.currentFilter = 'all';
    this.threatCounter = 1428590;

    // Sample threat events
    this.threatTemplates = [
      { type: 'Zero-Day Phishing', target: 'Corporate Mail Gateway', origin: '185.220.101.5', severity: 'critical', cat: 'phishing' },
      { type: 'AI Voice & Deepfake Spoof', target: 'Executive Comms Channel', origin: '91.240.118.12', severity: 'critical', cat: 'deepfake' },
      { type: 'SMS Smishing Shortlink', target: 'SMS Gateway (US-East)', origin: '194.26.29.112', severity: 'warning', cat: 'phishing' },
      { type: 'Malicious Image GAN Payload', target: 'Media Upload Pipeline', origin: '45.142.214.77', severity: 'warning', cat: 'zero-day' },
      { type: 'URL Domain Typosquatting', target: 'Public Auth Endpoint', origin: '103.152.18.9', severity: 'info', cat: 'phishing' },
      { type: 'Polymorphic Ransomware Dropper', target: 'Endpoint Cluster #04', origin: '193.106.191.24', severity: 'critical', cat: 'ransomware' },
      { type: 'Synthetic Video Biometric Attack', target: 'KYC Verification Service', origin: '185.234.218.4', severity: 'critical', cat: 'deepfake' }
    ];

    this.init();
  }

  init() {
    if (!this.feedContainer) return;

    this.bindFilters();
    this.populateInitialFeed();
    this.startLiveFeedSimulation();
  }

  bindFilters() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter || 'all';
        this.renderFeed();
      });
    });
  }

  populateInitialFeed() {
    this.activeEvents = [...this.threatTemplates.slice(0, 5)];
    this.renderFeed();
  }

  renderFeed() {
    if (!this.feedContainer) return;
    this.feedContainer.innerHTML = '';

    const filtered = this.currentFilter === 'all' 
      ? this.activeEvents 
      : this.activeEvents.filter(e => e.cat === this.currentFilter);

    if (filtered.length === 0) {
      this.feedContainer.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted); font-size: 0.85rem;">No active threats matching filter category</div>`;
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'feed-item';
      el.innerHTML = `
        <div class="feed-type">
          <span class="severity-tag sev-${item.severity}">${item.severity}</span>
          <span>${item.type}</span>
        </div>
        <span style="color: var(--text-muted); font-size: 0.75rem;">${item.origin} → ${item.target}</span>
      `;
      this.feedContainer.appendChild(el);
    });
  }

  startLiveFeedSimulation() {
    // Periodically add new simulated threat event
    setInterval(() => {
      const randomThreat = this.threatTemplates[Math.floor(Math.random() * this.threatTemplates.length)];
      const newEvent = {
        ...randomThreat,
        origin: `${Math.floor(Math.random()*220+1)}.${Math.floor(Math.random()*254)}.${Math.floor(Math.random()*254)}.${Math.floor(Math.random()*254)}`
      };

      this.activeEvents.unshift(newEvent);
      if (this.activeEvents.length > 8) this.activeEvents.pop();

      this.threatCounter += Math.floor(Math.random() * 5 + 1);
      if (this.threatCountEl) {
        this.threatCountEl.innerText = (this.threatCounter / 1000000).toFixed(2) + 'M';
      }

      if (this.latencyEl) {
        this.latencyEl.innerText = (3.2 + Math.random() * 0.9).toFixed(1) + 'ms';
      }

      this.renderFeed();
    }, 4500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.threatDash = new ThreatDashboard();
});
