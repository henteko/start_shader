const THREE = require('three-js')([ 'OrbitControls' ]);
const vox = require('vox.js');

const vertextShader = require('./vertex_shader');
const fragmentShader = require('./fragment_shader');

const width = window.innerWidth;
const height = window.innerHeight;
let scene;
let camera;
let renderer;
let controls;
let uniforms = {};
var addTime = 0.01;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, width / height, 1, 5000 );
    camera.position.set(126, 256, 412);
    renderer = createRenderer(width, height);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 50, 0 );
    uniforms.uResolution = {
        type: "v2",
        value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height)
    };
    uniforms.uTime = { type: "f", value: 0.0 };

    animate();

    const parser = new vox.Parser();
    parser.parse("boy.vox").then(addVoxel);
}

function addVoxel(voxelData) {
    const builder = new vox.MeshBuilder(voxelData, {voxelSize: 5});
    uniforms.uTex = {type:'t', value: builder.getTexture()};

    const material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: uniforms,
        vertexShader: vertextShader(),
        fragmentShader: fragmentShader()
    });

    const mesh = new THREE.Mesh(builder.geometry, material);
    scene.add( mesh );
}

function createRenderer(width, height) {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor( 0xa0a0a0 );
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    return renderer;
}

function animate() {
    uniforms.uTime.value += addTime;

    if (uniforms.uTime.value > 1.0) {
        addTime = -0.01;
    }
    if (uniforms.uTime.value < 0.0) {
        addTime = 0.01;
    }

    controls.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

window.addEventListener('load', init);