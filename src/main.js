const THREE = require('three-js')([
    'OrbitControls',
    'OBJLoader',
    'MTLLoader'
]);

const width = window.innerWidth;
const height = window.innerHeight;
let scene;
let camera;
let renderer;
let controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, width / height, 1, 5000 );
    camera.position.set(126, 256, 412);

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( "http://localhost:3000/" );
    mtlLoader.load( 'boy.mtl', function( materials ) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'boy.obj', function ( object ) {
            objmodel = object.clone();
            objmodel.scale.set(8, 8, 8);

            obj = new THREE.Object3D();
            obj.add(objmodel);

            scene.add(obj);

            const light = new THREE.AmbientLight(0xFFFFFF);
            scene.add( light );

            renderer = createRenderer(width, height);

            controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.target.set( 0, 50, 0 );

            animate();
        }, function(){}, function(){} );
    });
}
function createRenderer(width, height) {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor( 0xa0a0a0 );
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    return renderer;
}

function animate() {
    controls.update();
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render( scene, camera );
}

window.addEventListener('load', init);