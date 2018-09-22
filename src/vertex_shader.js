function vertextShader() {
    return `
  varying vec2 vUv;
  uniform float uTime;
  
  vec3 twist(vec3 p, float power){
    float s = sin(power * p.y);
    float c = cos(power * p.y);
    mat3 m = mat3(
      c, 0.0,  -s,
      0.0, 1.0, 0.0,
      s, 0.0,   c
    );
    return m * p;
  }
  
  void main() {
    vUv = uv;
    
    vec3 newPos = position;
    if(newPos.y > 45.0 && newPos.y < 100.0) {
      newPos.xyz = twist(newPos.xyz, sin(uTime));
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
  }
`;
}

module.exports = vertextShader;