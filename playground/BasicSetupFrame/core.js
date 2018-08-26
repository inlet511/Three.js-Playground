var renderer, scene, camera;
var hemiSphereLight, directionalLight;
var sphereMesh, sphereMat, sphereGeo;
var orbitControl;

function init() {

	//获取div容器
	var container = document.getElementById( 'container' );

	//设置renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.innerWidth / window.innerHeight );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	//初始化scene
	scene = new THREE.Scene();

	//初始化相机
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 0, 0, 100 );

	//加入灯光
	hemiSphereLight = new THREE.HemisphereLight( 0x99FFFF, 0x4F3338, 0.5 );
	directionalLight = new THREE.DirectionalLight( 0xFAF5E4, 0.5 );
	directionalLight.position.set( - 1, 1.75, 1 );
	scene.add( hemiSphereLight );
	scene.add( directionalLight );

	//加入控制
	orbitControl = new THREE.OrbitControls( camera, renderer.domElement );

	//注册事件
	window.addEventListener( 'resize', onWindowReSize, false );
	document.addEventListener( 'keydown', onKeyDown, false );

}

function createMesh() {

	sphereMesh = new THREE.SphereGeometry( 10, 20, 20 );
	sphereMat = new THREE.MeshPhongMaterial( {
		color: 0xdddddd,
		specular: 0x009900,
		shininess: 30,
		flatShading: false
	} );
	sphereGeo = new THREE.Mesh( sphereMesh, sphereMat );
	scene.add( sphereGeo );

}


function update() {

	requestAnimationFrame( update );
	renderer.render( scene, camera );

}

//当窗口发生变化
function onWindowReSize( e ) {

	//更新相机的长宽比
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	//renderer也要重置大小
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onKeyDown( e ) {

}

init();
createMesh();
update();
