uniform sampler2D texture;

varying vec2 v_uv;

void main(void) {

	vec3 diffuse = texture2D( texture, v_uv ).xyz;

	//gl_FragColor = vec4(v_uv.x, v_uv.y, 1.0, 1.0);
	gl_FragColor = vec4( diffuse, 1.0);
}