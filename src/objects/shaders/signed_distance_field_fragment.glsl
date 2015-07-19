uniform sampler2D texture;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_threshold;
varying float v_gamma;

void main() {

	vec4 color = texture2D( texture, v_uv );
	float dist = color.r;
	float alpha = smoothstep( v_threshold - v_gamma, v_threshold + v_gamma , dist );
	gl_FragColor = v_color * alpha;

}