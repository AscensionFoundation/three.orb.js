varying float c;

void main (void) {

	float dist = abs(c) * 10.;
	float alpha = clamp( 8. - dist, 0.0, 1.0);

	gl_FragColor = vec4(0.1, 0.2, 0.4, 1.0);

}