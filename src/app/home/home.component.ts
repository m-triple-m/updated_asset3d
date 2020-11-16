import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fov = 45;
  aspect = 2;
  near = 0.1;
  far = 100;

  sellerData;
  constructor(private sellerservice: SellerService) { }

  ngOnInit(): void {
    this.main();
    this.getSellerData();
  }

  getSellerData(){

    this.sellerservice.getAllSellers().subscribe(data => {
      console.log(data);
      this.sellerData = data;
    })

  }
    
  main(){
    const canvas = document.querySelector('#here');
        const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        // renderer.setClearColor (0x333333, 1);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.outputEncoding = THREE.sRGBEncoding;
        const camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        camera.position.set(0, 10, 20);

        const controls = new THREE.OrbitControls(camera, canvas);
        controls.target.set(0, 5, 0);
        controls.update();

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#37517e');

        {
          const planeSize = 40;

          const loader = new THREE.TextureLoader();
          const texture = loader.load('assets/datsun/textures/headlights_normal.jpeg');
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.magFilter = THREE.NearestFilter;
          const repeats = planeSize / 2;
          texture.repeat.set(repeats, repeats);

          const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
          const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
          });
          const mesh = new THREE.Mesh(planeGeo, planeMat);
          mesh.rotation.x = Math.PI * -.5;
          // scene.add(mesh);
        }

        {
          const skyColor = 0xFFFFFF;  // light blue
          const groundColor = 0xFFFFFF;  // brownish orange
          const intensity = 2;
          const hlight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
          scene.add(hlight);
        }

        {
          const color = 0xFFFFFF;
          const intensity = 5;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(5, 10, 2);
          scene.add(light);
          scene.add(light.target);
          const am_light = new THREE.AmbientLight( 0x202020 ); // soft white light
          const hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
          scene.add( am_light );
          scene.add( hemiLight );
        }

        function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
          const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
          const halfFovY = THREE.Math.degToRad(camera.fov * .3);
          const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
          // compute a unit vector that points in the direction the camera is now
          // in the xz plane from the center of the box
          const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

          // move the camera to a position distance units way from the center
          // in whatever direction the camera was from the center already
          camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

          // pick some near and far values for the frustum that
          // will contain the box.
          camera.near = boxSize / 100;
          camera.far = boxSize * 100;

          camera.updateProjectionMatrix();

          // point the camera to look at the center of the box
          camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
        }

        {
          const modelName = 'assets/datsun/scene.gltf';
          console.log('model ==> '+modelName);
          const gltfLoader = new THREE.GLTFLoader();
          gltfLoader.load(modelName, (gltf) => {
          const root = gltf.scene;
          scene.add(root);

          // compute the box that contains all the stuff
          // from root and below
          const box = new THREE.Box3().setFromObject(root);

          const boxSize = box.getSize(new THREE.Vector3()).length();
          const boxCenter = box.getCenter(new THREE.Vector3());

          // set the camera to frame the box
          frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

          // update the Trackball controls to handle the new size
          controls.maxDistance = boxSize * 10;
          controls.target.copy(boxCenter);
          controls.update();
          });
        }

        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {

          renderer.setSize(width, height, false);
          }
          return needResize;
        }

            function render() {
                if (resizeRendererToDisplaySize(renderer)) {

                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                }

                renderer.render(scene, camera);

                requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }

}