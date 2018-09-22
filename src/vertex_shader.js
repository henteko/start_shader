function vertextShader() {
    return `
  varying vec2 vUv;
  varying float alpha;
  
  void main() {
    vUv = uv;
    alpha = position.y / 100.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
}

module.exports = vertextShader;