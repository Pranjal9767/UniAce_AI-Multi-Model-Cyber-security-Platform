/**
 * AegisAI - Hero 3D WebGL Scene Manager (Three.js)
 * Designed for high performance & modularity:
 * - Default 3D Holographic AI Security Core
 * - Mouse drag & parallax rotation
 * - Extensible API (loadCustomGLTF, updateColors) for future 3D model expansion
 */


class Hero3DScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Objects
    this.coreMesh = null;
    this.wireframeMesh = null;
    this.particlesRing = null;
    this.outerRing = null;

    // Mouse tracking for 3D tilt
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.colors = {
      cyan: 0x00f0ff,
      purple: 0x8b5cf6,
      magenta: 0xd946ef,
      darkBg: 0x05070e
    };

    this.init();
  }

  init() {
    // 1. Setup Scene, Camera, Renderer
    this.scene = new THREE.Scene();

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 8;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    // Clear existing children
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 2. Lighting Setup (Cinematic Quantum Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(this.colors.cyan, 3, 20);
    cyanLight.position.set(5, 5, 5);
    this.scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(this.colors.purple, 3, 20);
    purpleLight.position.set(-5, -5, -5);
    this.scene.add(purpleLight);

    // 3. Build Holographic AI Core Group
    this.heroGroup = new THREE.Group();

    // A) Inner Energy Core (Glowing Sphere)
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: this.colors.cyan,
      emissive: 0x00a8ff,
      emissiveIntensity: 0.6,
      shininess: 100,
      transparent: true,
      opacity: 0.85
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.heroGroup.add(this.coreMesh);

    // B) Outer Geodesic Holographic Shield Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(1.9, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: this.colors.purple,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    this.wireframeMesh = new THREE.Mesh(wireGeo, wireMat);
    this.heroGroup.add(this.wireframeMesh);

    // C) Outer Orbiting Quantum Ring
    const ringGeo = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: this.colors.cyan,
      emissive: this.colors.cyan,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    this.outerRing = new THREE.Mesh(ringGeo, ringMat);
    this.outerRing.rotation.x = Math.PI / 3;
    this.heroGroup.add(this.outerRing);

    // D) Particle Swarm Ring
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colorsArr = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(this.colors.cyan);
    const purpleColor = new THREE.Color(this.colors.purple);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.8;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta);

      const mixColor = Math.random() > 0.5 ? cyanColor : purpleColor;
      colorsArr[i * 3] = mixColor.r;
      colorsArr[i * 3 + 1] = mixColor.g;
      colorsArr[i * 3 + 2] = mixColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particlesRing = new THREE.Points(particleGeo, particleMat);
    this.heroGroup.add(this.particlesRing);

    this.scene.add(this.heroGroup);

    // 4. Bind Events & Start Animation Loop
    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.mouse.targetX = (x / this.container.clientWidth - 0.5) * 1.5;
      this.mouse.targetY = (y / this.container.clientHeight - 0.5) * 1.5;
    });

    this.container.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Rotate components
    if (this.heroGroup) {
      this.heroGroup.rotation.y = time * 0.2 - this.mouse.x * 0.6;
      this.heroGroup.rotation.x = Math.sin(time * 0.3) * 0.1 + this.mouse.y * 0.6;
    }

    if (this.wireframeMesh) {
      this.wireframeMesh.rotation.y = -time * 0.35;
      this.wireframeMesh.rotation.z = time * 0.15;
    }

    if (this.outerRing) {
      this.outerRing.rotation.z = time * 0.4;
    }

    if (this.particlesRing) {
      this.particlesRing.rotation.y = time * 0.1;
    }

    // Pulse core scale
    if (this.coreMesh) {
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      this.coreMesh.scale.set(pulse, pulse, pulse);
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Flexible API Methods for user to easily customize / extend later
   */
  updateColors(cyanHex, purpleHex) {
    if (this.coreMesh) this.coreMesh.material.color.setHex(cyanHex);
    if (this.wireframeMesh) this.wireframeMesh.material.color.setHex(purpleHex);
  }

  /**
   * Hook for future 3D model loader (GLTF / GLB / OBJ)
   */
  loadCustomGLTF(gltfUrl, callback) {
    console.log(`[Hero3DScene] Modular GLTF Loader ready for URL: ${gltfUrl}`);
    // When GLTFLoader is included, user can swap this.heroGroup with custom 3D model mesh
    if (callback) callback();
  }
}

// Global initialization helper
window.initHero3D = function () {
  if (typeof THREE !== 'undefined') {
    window.hero3D = new Hero3DScene('hero-3d-container');
  } else {
    console.warn('Three.js not yet loaded.');
  }
};
///
