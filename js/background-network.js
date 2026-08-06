/**
 * AegisAI - Dynamic Canvas Neural Network Background
 * Features: Cybernetic node mesh, glowing laser connections, data pulses, mouse repulsion
 */

class NeuralBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.pulses = [];
    this.mouse = { x: null, y: null, radius: 180 };
    
    // Configuration
    this.nodeCount = window.innerWidth < 768 ? 40 : 85;
    this.maxDistance = 140;
    
    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.nodes = [];
      this.createNodes();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  createNodes() {
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        baseColor: Math.random() > 0.5 ? '#00f0ff' : '#8b5cf6'
      });
    }
  }

  spawnPulse(n1, n2) {
    if (Math.random() < 0.03 && this.pulses.length < 15) {
      this.pulses.push({
        x: n1.x,
        y: n1.y,
        targetX: n2.x,
        targetY: n2.y,
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        color: n1.baseColor
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Move node
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;

      // Mouse repulsion
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = node.x - this.mouse.x;
        const dy = node.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          node.x += Math.cos(angle) * force * 3;
          node.y += Math.sin(angle) * force * 3;
        }
      }

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.baseColor;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = node.baseColor;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect nodes
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const alpha = (1 - dist / this.maxDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          
          const gradient = this.ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, `rgba(0, 240, 255, ${alpha})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);
          
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();

          this.spawnPulse(node, other);
        }
      }
    }

    // Update & draw pulses
    for (let p = this.pulses.length - 1; p >= 0; p--) {
      const pulse = this.pulses[p];
      pulse.progress += pulse.speed;

      const currentX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
      const currentY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;

      this.ctx.beginPath();
      this.ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = pulse.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      if (pulse.progress >= 1) {
        this.pulses.splice(p, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.neuralBg = new NeuralBackground('bg-canvas');
});
