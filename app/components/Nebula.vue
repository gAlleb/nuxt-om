<template>
  <div id="threeNebula" />
  
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';

let scene, camera, renderer, composer, cloudParticles = []; 

onMounted(() => {
  // SCENE
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000, 0.001);

  // CAMERA
  camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100; 
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(scene.fog.color);
  renderer.domElement.id = 'threeNebula';
  document.getElementById('threeNebula').appendChild(renderer.domElement);

  // Composer
  composer = new POSTPROCESSING.EffectComposer(renderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

  // Ambient Light
  const ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  // Directional Light
  const directionalLight = new THREE.DirectionalLight(0xff8c19);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // Point Lights
  const orangeLight = new THREE.PointLight(0x006600, 50, 450, 1.7);
  orangeLight.position.set(200, 300, 100);
  scene.add(orangeLight);
  const redLight = new THREE.PointLight(0x0193a3, 250, 450, 1.7);
  redLight.position.set(100, 300, 100);
  scene.add(redLight);
  const blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);

  // Load Smoke Texture
  const loader = new THREE.TextureLoader();
  loader.load('/images/smoke.png', (texture) => {
    const cloudGeo = new THREE.PlaneGeometry(500, 500); 
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide // Render both sides of the plane
    });

    // Add cloud particles after the texture is loaded
    for (let p = 0; p < 50; p++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  // Load Stars Texture
  loader.load('/images/stars.jpg', (texture) => {
    const textureEffect = new POSTPROCESSING.TextureEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      texture: texture
    });
    textureEffect.blendMode.opacity.value = 0.5;

    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75
    });
    bloomEffect.blendMode.opacity.value = 1.5;

    const effectPass = new POSTPROCESSING.EffectPass(
      camera,
      bloomEffect,
      textureEffect
    );
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
  });

  // Render animation loop
  const render = () => {
    requestAnimationFrame(render);
    composer.render(0.1);

    cloudParticles.forEach(p => {
      p.rotation.z -= 0.009;
    });
  };
  render();

  // Window resize event listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {});
});
</script>

