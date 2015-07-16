uniform float alpha;
varying vec2 v_uv;

#define PI 3.1415926535897932384626433832795

void main2(void) {
	vec3 pos = position;
	float len = length( position );

	float cameraLength = length( cameraPosition );
	vec3 center = cameraPosition / cameraLength * len;

	float dp = dot( cameraPosition, position ) / len / cameraLength;
	float ac = acos( dp );
	float arc = ac * len;

	vec3 up = cross( cameraPosition - position, center - position );
	vec3 perp = normalize(cross( cameraPosition - position, up ));

	vec3 proj = center + perp * arc;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( mix( proj, position, alpha ) , 1.0 );

	v_uv = uv;
}