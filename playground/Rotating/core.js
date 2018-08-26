var renderer, scene, camera;
var hemiSphereLight, directionalLight;
var sphereMesh, sphereGeo;
var orbitControl;



var clock;

function init() {

	//创建div容器
	var container = document.createElement( 'div' );
	document.body.appendChild( container );

	//设置renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.innerWidth / window.innerHeight );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	//初始化scene
	scene = new THREE.Scene();

	//初始化相机
	camera = new THREE.PerspectiveCamera(
		30,
		window.innerWidth / window.innerHeight,
		0.1,
		5000
	);
	camera.position.set( 0, 0, 300 );

	//加入灯光
	hemiSphereLight = new THREE.HemisphereLight( 0x99ffff, 0x4f3338, 0.5 );
	directionalLight = new THREE.DirectionalLight( 0xfaf5e4, 0.5 );
	directionalLight.position.set( - 1, 1.75, 1 );
	scene.add( hemiSphereLight );
	scene.add( directionalLight );

	//加入控制
	orbitControl = new THREE.OrbitControls( camera, renderer.domElement );

	//设置计时器
	clock = new THREE.Clock( true );

	//注册事件
	window.addEventListener( 'resize', onWindowReSize, false );

}

function createMesh() {

	sphereMesh = new THREE.SphereGeometry( 10, 20, 20 );

	for ( var i = 0; i < 2000; i ++ ) {

		sphereGeo = new THREE.Mesh(
			sphereMesh,
			new THREE.MeshPhongMaterial( {
				color: Math.random() * 0xffffff,
				shininess: Math.random() * 30
			} )
		);

		sphereGeo.position.x = Math.random() * 800 - 400;
		sphereGeo.position.y = Math.random() * 800 - 400;
		sphereGeo.position.z = Math.random() * 800 - 400;

		sphereGeo.rotation.x = Math.random() * 2 * Math.PI;
		sphereGeo.rotation.y = Math.random() * 2 * Math.PI;
		sphereGeo.rotation.z = Math.random() * 2 * Math.PI;

		sphereGeo.scale.x = Math.random() + 0.5;
		sphereGeo.scale.y = Math.random() + 0.5;
		sphereGeo.scale.z = Math.random() + 0.5;

		scene.add( sphereGeo );

	}

}

function update() {

	requestAnimationFrame( update );

	animate();

	renderer.render( scene, camera );

}

function animate() {

	var deltaTime = clock.getDelta();
	console.log( deltaTime );

	scene.traverse( function ( item ) {

		if ( item instanceof THREE.Mesh ) {

			//item.rotateOnAxis( new THREE.Vector3( 0, 1, 0 ), THREE.Math.degToRad( 100 ) * deltaTime );
			//item.rotation.x += THREE.Math.degToRad( 100 ) * deltaTime;
			//calcRotationIn3D( item, new THREE.Vector3( 0, THREE.Math.degToRad( 50 ) * deltaTime, 0 ) );
			calcRotationAroundAxis( item, 'y', THREE.Math.degToRad( 50 ) * deltaTime );

		}

	} );

}

//旋转方法1
function calcRotationAroundAxis( obj3D, axis, angle ) {

	var euler;

	if ( axis === 'x' ) {

		euler = new THREE.Euler( angle, 0, 0, 'XYZ' );

	}

	if ( axis === 'y' ) {

		euler = new THREE.Euler( 0, angle, 0, 'XYZ' );

	}

	if ( axis === 'z' ) {

		euler = new THREE.Euler( 0, 0, angle, 'XYZ' );

	}
	obj3D.position.applyEuler( euler );

}

//旋转方法2
function calcRotationIn3D( obj3D, angles, order = 'XYZ' ) {

	var euler;

	euler = new THREE.Euler( angles.x, angles.y, angles.z, order );

	obj3D.position.applyEuler( euler );

}

//当窗口发生变化
function onWindowReSize( e ) {

	//更新相机的长宽比
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	//renderer也要重置大小
	renderer.setSize( window.innerWidth, window.innerHeight );

}



init();
createMesh();
update();
