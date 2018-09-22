function fragmentShader() {
    return `
  varying vec2 vUv;
  varying float alpha;
  uniform sampler2D uTex;

  void main() {
    gl_FragColor = texture2D(uTex,vUv);
    gl_FragColor.a = alpha;
  }
`;
}

module.exports = fragmentShader;