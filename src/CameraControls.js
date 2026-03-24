// CameraControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function setupControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  // Enable smooth movement
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Enable zoom and rotate
  controls.enableZoom = true;
  controls.enableRotate = true;

  // Optional: restrict angles
  controls.maxPolarAngle = Math.PI / 2;

  return controls;
}