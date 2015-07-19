uniform float threshold;
uniform float gamma;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_threshold;
varying float v_gamma;

void main() {

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	v_uv = uv;
	v_color = vec4(1., 1., 1., 1.); // color;
	v_threshold = threshold;
	v_gamma = gamma;
}