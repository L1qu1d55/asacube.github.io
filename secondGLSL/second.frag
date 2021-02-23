precision mediump float; // lowp mediump highp

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main(void) {
  vec3 color = vec3(0.0);
  vec2 st = gl_FragCoord.xy / min(resolution.x, resolution.y);
  vec2 m = mouse / min(resolution.x, resolution.y);
  vec2 translate = vec2(cos(time * 2.0), sin(time * 2.0));
  st += translate * 0.1;
  vec2 pos = - st + m;
  float r = length(pos) * 2.0 * 15.0;
  float delta = atan(pos.y, pos.x);
  float f = 18.0 * abs(cos(delta)) - 15.0 * abs(cos(2.0 * delta)) - 8.0 * abs(cos(3.0 * delta)) - abs(cos(4.0 * delta));
	color = vec3(1.0 - step(f, r));
	gl_FragColor = vec4(color, 1.0);
}