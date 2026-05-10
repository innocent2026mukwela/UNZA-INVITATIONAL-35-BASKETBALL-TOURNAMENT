import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 60;

    const COUNT = 1400;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    // Red palette
    const palette = [
      new THREE.Color(0xe8000d),
      new THREE.Color(0xff3333),
      new THREE.Color(0x9b0007),
      new THREE.Color(0xff6666),
      new THREE.Color(0x660005),
    ];

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 28 + Math.random() * 52;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.5, vertexColors: true,
      transparent: true, opacity: 0.6,
      sizeAttenuation: true, depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineVerts: number[] = [];
    const SUBSET = 260, THRESHOLD = 20;
    for (let i = 0; i < SUBSET; i++) {
      for (let j = i + 1; j < SUBSET; j++) {
        const dx = positions[i*3]   - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < THRESHOLD) {
          lineVerts.push(positions[i*3], positions[i*3+1], positions[i*3+2],
                         positions[j*3], positions[j*3+1], positions[j*3+2]);
        }
      }
    }
    if (lineVerts.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
      scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
        color: 0xe8000d, transparent: true, opacity: 0.07, depthWrite: false,
      })));
    }

    let mouseX = 0, mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let frame = 0, rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      frame++;
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.025;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);
      mat.opacity = 0.45 + Math.sin(frame * 0.01) * 0.12;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
