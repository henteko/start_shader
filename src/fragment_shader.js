function fragmentShader() {
    return `
  varying vec2 vUv;
  varying float alpha;
  uniform sampler2D uTex;
  uniform float uTime;

  void main() {
    gl_FragColor = texture2D(uTex,vUv);
    gl_FragColor.a = alpha + uTime;
  }
`;
}

module.exports = fragmentShader;