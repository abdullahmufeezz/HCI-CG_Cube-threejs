import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { setupControls } from './CameraControls';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {

    
    var scene = new THREE.Scene();

    
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 5);

   
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current.appendChild(renderer.domElement);

    const controls = setupControls(camera, renderer);

    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: '#00FFFF' });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    
    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

  }, []);

  return (
  <div ref={refContainer} style={{ position: "relative" }}>
    
    <div style={{
      position: "absolute",
      top: "200px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      zIndex: 1
    }}>
      Muhammad Abdullah Mufeez <br />
      Seat No: B23110006080
    </div>

  </div>
);
}

export default MyThree;