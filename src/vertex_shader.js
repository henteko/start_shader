function vertextShader() {
    return `
  varying vec2 vUv;
  uniform float uTime;
  
  const float power = 30.0;
  const float speed = 13.0;
  
  void main() {
    vUv = uv;
    
    vec3 newPos = position;
    float gray = (newPos.y / 100.0);
    newPos.x += sin(uTime * speed) * power * (gray * gray);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
  }
`;
}

module.exports = vertextShader;