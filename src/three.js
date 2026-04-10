import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { setupControls } from './CameraControls';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace; 
    refContainer.current.appendChild(renderer.domElement);

    const controls = setupControls(camera, renderer);

    const loader = new THREE.TextureLoader();
    
    // MATCHING YOUR FOLDER STRUCTURE EXACTLY:
    const imagePaths = [
      '/images/photo1.jpg',   // Right
      '/images/photo2.jpg',   // Left
      '/images/photo3.jpg',   // Top
      '/images/photo4.jpg',   // Bottom
      '/images/photo5.jpeg',  // Front (Note the .jpeg)
      '/images/photo6.PNG'   // Back (Note the uppercase .PNG)
    ];

    const materials = imagePaths.map(path => {
      return new THREE.MeshBasicMaterial({ 
        map: loader.load(
          path, 
          undefined, 
          undefined, 
          (err) => console.error("Could not find image at: " + path) 
        )
      });
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    let animationId;
    const animate = function () {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (refContainer.current) {
        refContainer.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach(m => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={refContainer} style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div style={{
        position: "absolute",
        top: "120%",
        left: "50%",
        transform: "translateX(-50%)",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: 1,
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        pointerEvents: "none" 
      }}>
        Muhammad Abdullah Mufeez <br />
        Seat No: B23110006080
      </div>
    </div>
  );
}

export default MyThree;
// import * as THREE from 'three';
// import { useEffect, useRef } from "react";
// import { setupControls } from './CameraControls';

// function MyThree() {
//   const refContainer = useRef(null);

//   useEffect(() => {

    
//     var scene = new THREE.Scene();

    
//     var camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     camera.position.set(0, 0, 5);

   
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     refContainer.current.appendChild(renderer.domElement);

//     const controls = setupControls(camera, renderer);

    
//     var geometry = new THREE.BoxGeometry(1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({ color: '#00FFFF' });
//     var cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

    
//     var animate = function () {
//       requestAnimationFrame(animate);

//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

      
//       controls.update();

//       renderer.render(scene, camera);
//     };

//     animate();

//   }, []);

//   return (
//   <div ref={refContainer} style={{ position: "relative" }}>
    
//     <div style={{
//       position: "absolute",
//       top: "200px",
//       left: "50%",
//       transform: "translateX(-50%)",
//       color: "white",
//       fontSize: "18px",
//       fontWeight: "bold",
//       textAlign: "center",
//       zIndex: 1
//     }}>
//       Muhammad Abdullah Mufeez <br />
//       Seat No: B23110006080
//     </div>

//   </div>
// );
// }

// export default MyThree;