var renderer, scene, camera;
var hemiSphereLight, directionalLight;
var sphereMesh, sphereMat, sphereGeo;
var orbitControl;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mouseOverObject;

function init() {
    //创建div容器
    var container = document.createElement('div');
    document.body.appendChild(container);

    //设置renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    //初始化scene
    scene = new THREE.Scene();

    //初始化相机
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 100);

    //加入灯光
    hemiSphereLight = new THREE.HemisphereLight(0x99FFFF, 0x4F3338, 0.5);
    directionalLight = new THREE.DirectionalLight(0xFAF5E4, 0.5);
    directionalLight.position.set(-1, 1.75, 1);
    scene.add(hemiSphereLight);
    scene.add(directionalLight);

    //加入控制
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

    //注册事件
    window.addEventListener('resize', onWindowReSize, false);
    window.addEventListener('mousemove', onMouseMove, false);

}

function createMesh() {

    sphereMesh = new THREE.SphereGeometry(10, 20, 20);

    for (var i = 0; i < 2000; i++) {
        sphereGeo = new THREE.Mesh(sphereMesh, new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            shininess: Math.random() * 30
        }));

        sphereGeo.position.x = Math.random() * 800 - 400;
        sphereGeo.position.y = Math.random() * 800 - 400;
        sphereGeo.position.z = Math.random() * 800 - 400;

        sphereGeo.rotation.x = Math.random() * 2 * Math.PI;
        sphereGeo.rotation.y = Math.random() * 2 * Math.PI;
        sphereGeo.rotation.z = Math.random() * 2 * Math.PI;

        sphereGeo.scale.x = Math.random() + 0.5;
        sphereGeo.scale.y = Math.random() + 0.5;
        sphereGeo.scale.z = Math.random() + 0.5;


        scene.add(sphereGeo);
    }

}


function update() {

    requestAnimationFrame(update);


    raycaster.setFromCamera(mouse, camera);


    var intersects = raycaster.intersectObjects(scene.children);

    //若鼠标在物体上面
    if (intersects.length > 0) {
        //只有当前物体不等于缓存的物体时才执行
        if (mouseOverObject != intersects[0].object) {

            //如果是从一个物体直接移动到另外一个物体上，需要先把原先的物体还原
            if (mouseOverObject) {
                mouseOverObject.material.emissive.setHex(mouseOverObject.originalEmissive);
            }

            //物体切换，存储旧值，设置新值
            mouseOverObject = intersects[0].object;
            mouseOverObject.originalEmissive = mouseOverObject.material.emissive.getHex();
            mouseOverObject.material.emissive.setHex(0xff0000);
        }

    } else {
        if (mouseOverObject) {
            mouseOverObject.material.emissive.setHex(mouseOverObject.originalEmissive);
            mouseOverObject = null;
        }
    }


    renderer.render(scene, camera);

}

//当窗口发生变化
function onWindowReSize(e) {

    //更新相机的长宽比
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    //renderer也要重置大小
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


init();
createMesh();
update();