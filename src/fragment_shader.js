function fragmentShader() {
    return `
  uniform vec2 uResolution;
  varying vec2 vUv;
  uniform sampler2D uTex;

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    gl_FragColor = vec4(st.xy, 0.0, 0.5);
  }
`;
}

module.exports = fragmentShader;