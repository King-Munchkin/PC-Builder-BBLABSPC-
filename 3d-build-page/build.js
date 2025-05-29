import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.set(0, 100, 800);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("viewer3D").appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0x333333, 3));
const topLight = new THREE.DirectionalLight(0xffffff, 5);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const spotLight = new THREE.SpotLight(0xffffff, 3);
spotLight.position.set(0, 100, 200);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

// Globals
const loader = new GLTFLoader();
const objectsToRender = {};
let controls;

// Drag support
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;
let isDragging = false;
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const lastMousePosition = new THREE.Vector2();

// Load and render a model
export function loadModel(part) {
  const modelPath = `./Models/${part}/scene.gltf`;

  loader.load(
    modelPath,
    (gltf) => {
      const object = gltf.scene;
      object.rotation.y = Math.PI / 2;
      object.scale.set(300, 300, 300);

      const group = new THREE.Group();
      group.add(object);
      group.position.set(0, 0, 0);

      scene.add(group);
      objectsToRender[part] = group;

      if (!controls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.zoomSpeed = 0.5;
        controls.minDistance = 10;
        controls.maxDistance = 2000;
      }

      // ✅ Recenter camera to all loaded models
      updateCameraTargetToAllObjects();

      // Reset drag state
      resetDragState();
    },
    undefined,
    (error) => {
      console.error(`Failed to load model for ${part}`, error);
    }
  );
}

// ✅ Compute the center of all loaded parts and update camera target
function updateCameraTargetToAllObjects() {
  const boundingBox = new THREE.Box3();

  Object.values(objectsToRender).forEach((group) => {
    boundingBox.expandByObject(group);
  });

  const center = new THREE.Vector3();
  boundingBox.getCenter(center);

  controls.target.copy(center);
  controls.update();
}

// Event: Add part to build
window.addEventListener("addPartToBuild", (e) => {
  const { part } = e.detail;
  loadModel(part);
});

// Event: Remove part from build
window.addEventListener("removePartFromBuild", (e) => {
  const { part } = e.detail;
  const object = objectsToRender[part];
  if (object) {
    scene.remove(object);
    object.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose());
        } else {
          child.material?.dispose();
        }
      }
    });
    delete objectsToRender[part];

    // Update camera center after removing
    updateCameraTargetToAllObjects();
  }
});

// Get intersected objects under the mouse
function getIntersects(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(
    Object.values(objectsToRender).map((g) => g.children[0]),
    true
  );
}

// Mouse Down
function onMouseDown(event) {
  const intersects = getIntersects(event);
  if (intersects.length > 0) {
    selectedObject = intersects[0].object.parent;
    isDragging = true;
    lastMousePosition.set(mouse.x, mouse.y);
    controls.enabled = false;
  }
}

// Mouse Move
function onMouseMove(event) {
  if (isDragging && selectedObject) {
    const intersects = getIntersects(event);
    if (intersects.length > 0) {
      const intersection = intersects[0].point;
      selectedObject.position.set(intersection.x, intersection.y, intersection.z);
    }
    lastMousePosition.set(mouse.x, mouse.y);
  }
}

// Mouse Up
function onMouseUp() {
  isDragging = false;
  selectedObject = null;
  controls.enabled = true;
}

// Reset drag state
function resetDragState() {
  selectedObject = null;
  isDragging = false;
}

// Event listeners for dragging
renderer.domElement.addEventListener("mousedown", onMouseDown, false);
renderer.domElement.addEventListener("mousemove", onMouseMove, false);
renderer.domElement.addEventListener("mouseup", onMouseUp, false);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls?.update();
  renderer.render(scene, camera);
}
animate();
