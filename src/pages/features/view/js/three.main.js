import * as THREE from 'three'
class App { // 场景、相机和渲染器
  constructor(canvas, model, animations) {
      this.scene = App.createScene() // 创建场景
          .add(model)
          .add(App.createAmbientLight())
          .add(App.createDirectionalLight());
      this.camera = App.createCamera();
      this.renderer = App.createRenderer(canvas);
      this.mixer = new AnimationMixer(model, animations);
      this.update();
  }

  static createScene() {
      let scene = new THREE.Scene();
      scene.background = new THREE.Color(0x336495);
      return scene;
  }

  static createAmbientLight() { // 背景光
      return new THREE.AmbientLight(0xffffff, 1);
  }

  static createDirectionalLight() { // 方向光
      let light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(0, 400, 350);
      return light;
  }

  static createCamera() { // 相机
      let camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      camera.position.z = 10;
      camera.position.x = 0;
      camera.position.y = -3;
      return camera;
  }

  static createRenderer(canvas) { // 渲染器
      let renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 2.0;
      return renderer;
  }

  resize() {
      let canvasSize = this.renderer.getSize(new THREE.Vector2());
      let windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
      if (!canvasSize.equals(windowSize)) {
          this.renderer.setSize(windowSize.x, windowSize.y, false);
          this.camera.aspect = windowSize.x / windowSize.y;
          this.camera.updateProjectionMatrix();
      }
  }

  update() {
      this.resize();
      this.mixer.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(() => { this.update() });
  }
}

class AnimationMixer {
  constructor(model, animations) {
      this.clock = new THREE.Clock();
      this.mixer = new THREE.AnimationMixer(model);
      this.animations = animations;
  }

  play(clip) {
      let animation = this.animations.find(a => a.name === clip);
      if (animation) {
          this.mixer.stopAllAction();
          this.mixer.clipAction(animation).play();
          this.clip = clip;
      }
  }

  update() {
      let delta = this.clock.getDelta();
      this.mixer.update(delta);
  }
}

export {
  App, AnimationMixer
}


