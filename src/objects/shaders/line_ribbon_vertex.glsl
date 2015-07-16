uniform vec2 targetSize;

varying float c;

void main(void) {

	vec3 cam = cross(cameraPosition - position, normal);
	vec4 nor = projectionMatrix * modelViewMatrix * vec4( cam, 1.0 );
	vec2 dir = normalize( nor.xy );

	vec4 pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	c = 1.;//pos.w;
	pos.x += uv.x * pos.w * 1. / targetSize.x * dir.x;
	pos.y += uv.x * pos.w * 1. / targetSize.y * dir.y;
	//pos.x += 0.5;
	gl_Position = pos;

}