var camera, scene, renderer, light;
var orbit;

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 500);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    camera.position.z = 50;
    camera.position.y = 50;
    camera.lookAt(0, 0, 0);

    orbit = new THREE.OrbitControls(camera,renderer.domElement);
}

function addMesh() {
    var goMesh = new THREE.SphereGeometry(10,20,20);
    var mat = new THREE.ShaderMaterial({
        vertexShader:dom.getElementById("vs").textContent,
        fragmentShader:dom.getElementById("fs").textContent,        
    });
    var cube = new THREE.Mesh(goMesh, mat);
    scene.add(cube);
}

function render()
{
    renderer.render(scene, camera);
}

function update()
{
    requestAnimationFrame(update);
    render();
}

init();
addMesh();
update();