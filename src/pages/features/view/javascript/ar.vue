<template>
  <article-content :title="title" :time="time">
    <section>
      <h2>ar</h2>
      <!-- <div class="buttons">
        <button class="switch-button">Next</button>
      </div> -->
      <!-- <canvas width="500" height="400" id="app-canvas"></canvas> -->
      <!-- <a-scene
      renderer="antialias: auto;"
      tune-renderer
      >
        <a-assets>
          <a-asset-item id="bot_dance" src="models/multi.glb"></a-asset-item>
        </a-assets>
          <a-entity
            id="bot"
            gltf-model="#bot_dance"
            position="0 1 -2.1"
            scale="2 2 2"
            animation-mixer="clip: CatWalk"
          ></a-entity>
          <a-entity
            environment="preset: forest; groundColor: #445; groundTexture: checkerboard;"></a-entity>
          <a-light type="ambient" color="#ffffff" intensity="1"></a-light>
          <a-light
            type="directional"
            color="#ffffff"
            position="0 400 350"
            intensity="2"
          ></a-light>
          <a-camera fov="45" near="1" far="2000"></a-camera>
      </a-scene> 
      <video></video> -->

      <div id="WebGL-output"></div>
      <div id="Stats-output"></div>
      <div id="label"></div>
    </section>
  </article-content>
</template>
<script>
// import Vue from 'vue'
import ArticleContent from "@/components/article.vue";
// import { App} from '../js/three.main'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
console.log(THREE)


// Vue.config.ignoredElements = [
//   'a-scene',
//   'a-entity',
//   'a-camera',
//   'a-nft',
//   'a-marker',
//   'a-text',
//   'a-box',
//   'a-assets',
//   'a-asset-item',
//   'a-plane',
//   'a-gltf-model',
//   'a-light'
// ];
export default {
  name: "ar",
  data () {
    return {
      title: "ar",
      time: "2021-10-27"
    }
  },
  created () {
    // this.threeFn()
    // this.videoFn();


    
  },
  mounted() {
    // setTimeout(()=> {
    //   this.aframeFn()
    // }, 3000)

    // var stats = initStats();
    var scene, camera, renderer, controls, light, selectObject;
    var that = this;

    // 场景
    function initScene() {
        scene = new THREE.Scene();
    }

    // 相机
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.set(0, 400, 600);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    // 渲染器
    function initRenderer() {
        if (that.Detector().webgl) {
            renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            renderer = new THREE.CanvasRenderer();
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x050505);
        document.body.appendChild(renderer.domElement);
    }

    // 初始化模型
    function initContent() {
        var helper = new THREE.GridHelper(1200, 50, 0xCD3700, 0x4A4A4A);
        scene.add(helper);

        var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x9370DB});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.y = 50;
        cube.name = "cube";
        scene.add(cube);

        var sphereGeometry = new THREE.SphereGeometry(50, 50, 50, 50);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x3CB371});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 200;
        sphere.position.y = 50;
        sphere.name = "sphere";
        // sphere.position.z = 200;
        scene.add(sphere);

        var cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100, 100);
        var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xCD7054});
        var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.x = -200;
        cylinder.position.y = 50;
        cylinder.name = "cylinder";
        scene.add(cylinder);
    }

    // 鼠标双击触发的方法
    function onMouseDblclick(event) {

        // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        var intersects = getIntersects(event);

        // 获取选中最近的 Mesh 对象
        if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
            selectObject = intersects[0].object;
            changeMaterial(selectObject);
        } else {
            alert("未选中 Mesh!");
        }
    }

    // 获取与射线相交的对象数组
    function getIntersects(event) {
        event.preventDefault();
        console.log("event.clientX:" + event.clientX)
        console.log("event.clientY:" + event.clientY)

        // 声明 raycaster 和 mouse 变量
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, camera);

        // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
        var intersects = raycaster.intersectObjects(scene.children);

        //返回选中的对象
        return intersects;
    }

    // 窗口变动触发的方法
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // 键盘按下触发的方法
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                initCamera();
                initControls();
                break;
        }
    }

    // 改变对象材质属性
    function changeMaterial(object) {

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff * Math.random(),
            transparent: object.material.transparent ? false : true,
            opacity: 0.8
        });
        object.material = material;
    }

    // 初始化轨迹球控件
    function initControls() {
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        // controls.noRotate = true;
        controls.noPan = true;
        // 视角最小距离
        controls.minDistance = 1000;
        // 视角最远距离
        controls.maxDistance = 5000;
    }

    // 添加拖拽控件
    function initDragControls() {
        // 添加平移控件
        var transformControls = new THREE.TransformControls(camera, renderer.domElement);
        scene.add(transformControls);

        // 过滤不是 Mesh 的物体,例如辅助网格
        var objects = [];
        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i].isMesh) {
                objects.push(scene.children[i]);
            }
        }
        // 初始化拖拽控件
        var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

        // 鼠标略过事件
        dragControls.addEventListener('hoveron', function (event) {
            // 让变换控件对象和选中的对象绑定
            transformControls.attach(event.object);
        });
        // 开始拖拽
        dragControls.addEventListener('dragstart', function (event) {
            controls.enabled = false;
        });
        // 拖拽结束
        dragControls.addEventListener('dragend', function (event) {
            controls.enabled = true;
        });
    }

    // 初始化灯光
    function initLight() {
        light = new THREE.SpotLight(0xffffff);
        light.position.set(-300, 600, -400);
        light.castShadow = true;

        scene.add(light);
        scene.add(new THREE.AmbientLight(0x5C5C5C));
    }

    // 初始化 dat.GUI
    function initGui() {
        // 保存需要修改相关数据的对象
        gui = new function () {

        }
        // 属性添加到控件
        var guiControls = new dat.GUI();
    }

    // 初始化性能插件
    // function initStats() {
    //     var stats = new Stats();

    //     stats.domElement.style.position = 'absolute';
    //     stats.domElement.style.left = '0px';
    //     stats.domElement.style.top = '0px';

    //     document.body.appendChild(stats.domElement);
    //     return stats;
    // }

    // 更新div的位置
    function renderDiv(object) {
        // 获取窗口的一半高度和宽度
        let halfWidth = window.innerWidth / 2;
        let halfHeight = window.innerHeight / 2;

        // 逆转相机求出二维坐标
        let vector = object.position.clone().project(camera);

        // 修改 div 的位置
        $("#label").css({
            left: vector.x * halfWidth + halfWidth,
            top: -vector.y * halfHeight + halfHeight - object.position.y
        });
        // 显示模型信息
        $("#label").text("name:" + object.name);
    }

    // 更新控件
    function update() {
        // stats.update();
        controls.update();
        controls.handleResize();
        transformControls.update();
    }

    // 初始化
    function init() {
        initScene();
        initCamera();
        initRenderer();
        initContent();
        initLight();
        initControls();
        // initGui();
        initDragControls();
        // addEventListener('dblclick', onMouseDblclick, false);
        addEventListener('resize', onWindowResize, false);
        addEventListener('keydown', onKeyDown, false);
    }

    function animate() {
        if (selectObject != undefined && selectObject != null) {
            renderDiv(selectObject);
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        update();
    }

    init();
    animate();
  },
  methods: {
    threeFn() {
      // load model and start app
      let loader = new GLTFLoader();
      loader.load('static/models/multi.glb',
          function (gltf) {
              let model = gltf.scene;
              model.scale.set(10, 10, 10);
              model.position.y = -6;

              let canvas = document.querySelector('#app-canvas');
              let app = new App(canvas, model, gltf.animations);
              app.mixer.play('CatWalk');
              document.querySelector(".switch-button").addEventListener("click", () => {
                  const clips = [
                      'CatWalk',
                      'Samba',
                      'Belly',
                  ]
                  let clipIndex = clips.indexOf(app.mixer.clip);
                  clipIndex = (clipIndex + 1) % clips.length;
                  app.mixer.play(clips[clipIndex]);
              });
          },
          undefined,
          function (error) {
              console.error(error);
          }
      );
    },
    videoFn() {
      // 想要获取一个最接近 1280x720 的相机分辨率
      var constraints = { audio: true, video: { width: 1500, height: 700 }, frameRate: { ideal: 10, max: 15 } };
      // var constraints = { video: { frameRate: { ideal: 10, max: 15 } } };
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
    },
    aframeFn() {
      AFRAME.registerComponent('tune-renderer', {
        init: function () {
            let renderer = this.el.renderer;
            renderer.toneMapping = THREE.ReinhardToneMapping;
            renderer.toneMappingExposure = 2.0;
        }
      });
      function on_switch() {
        const clips = [
            'CatWalk',
            'Samba',
            'Belly',
        ]
        let bot = document.querySelector('#bot');
        let mixer = bot.getAttribute("animation-mixer");
        let clipIndex = clips.indexOf(mixer.clip);
        let nextClipIndex = (clipIndex + 1) % clips.length;
        bot.setAttribute("animation-mixer", "clip: " + clips[nextClipIndex]);
      }

      document
        .querySelector(".switch-button")
        .addEventListener("click", on_switch);
    },
    Detector() {
      /**
       * @author alteredq / http://alteredqualia.com/
       * @author mr.doob / http://mrdoob.com/
       */
      var Detector = {
      
        canvas: !! window.CanvasRenderingContext2D,
        webgl: ( function () {
      
          try {
      
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
      
          } catch ( e ) {
      
            return false;
      
          }
      
        } )(),
        workers: !! window.Worker,
        fileapi: window.File && window.FileReader && window.FileList && window.Blob,
      
        getWebGLErrorMessage: function () {
      
          var element = document.createElement( 'div' );
          element.id = 'webgl-error-message';
          element.style.fontFamily = 'monospace';
          element.style.fontSize = '13px';
          element.style.fontWeight = 'normal';
          element.style.textAlign = 'center';
          element.style.background = '#fff';
          element.style.color = '#000';
          element.style.padding = '1.5em';
          element.style.width = '400px';
          element.style.margin = '5em auto 0';
      
          if ( ! this.webgl ) {
      
            element.innerHTML = window.WebGLRenderingContext ? [
              'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
              'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' ) : [
              'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
              'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' );
      
          }
      
          return element;
      
        },
      
        addGetWebGLMessage: function ( parameters ) {
      
          var parent, id, element;
      
          parameters = parameters || {};
      
          parent = parameters.parent !== undefined ? parameters.parent : document.body;
          id = parameters.id !== undefined ? parameters.id : 'oldie';
      
          element = Detector.getWebGLErrorMessage();
          element.id = id;
      
          parent.appendChild( element );
      
        }
      
      };
      return Detector;
      // // browserify support
      // if ( typeof module === 'object' ) {
      
      //   module.exports = Detector;
      // }
    }
  },
  components: {
    ArticleContent
  }
}
</script>
<style lang="scss" scoped>
#label {
  position: absolute;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  border-radius: 5px;
}
</style>