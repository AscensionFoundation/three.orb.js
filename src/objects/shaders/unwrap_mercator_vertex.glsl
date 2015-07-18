uniform float alpha;
varying vec2 v_uv;

#define PI 3.1415926535897932384626433832795

vec3 hermite( vec3 p1, vec3 p2, vec3 t1, vec3 t2, float a ) {

	float a2 = a * a;
	float a3 = a2 * a;

	float h1 = 2. * a3 - 3. * a2 + 1.;
	float h2 = -2. * a3 + 3. * a2;
	float h3 = a3 - 2. * a2 + a;
	float h4 = a3 - a2;

	return h1 * p1 + h2 * p2 + h3 * t1 + h4 * t2;

}

void main( void ) {

	float r = length( position );
	vec3 cameraRay = normalize( cameraPosition );

	float cameraLength = length( cameraPosition );
	vec3 center = cameraPosition / cameraLength * r;

	float depth = tan( alpha * PI / 2. ) * r;
	vec3 origin = -cameraRay * depth;

	float ratio = ( depth + r ) / r;
	float p = depth + r;


	float theta = acos( position.y / r ); // lat up/down [ pi / 2, -pi / 2 ]
	float phi = atan( position.x, position.z ); // long left/right [ -pi, pi ]

	float ctheta = acos( center.y / r ); // lat up/down
	float cphi = atan( center.x, center.z ); // long left/right

	float dtheta = ( theta - ctheta );
	float dphi = ( phi - cphi );

	dphi = mod( ( dphi ) + PI, 2. * PI ) - PI;

	theta = dtheta / ratio + ctheta;
	phi = dphi / ratio + cphi;

	vec3 moved = vec3( p * sin( theta ) * sin( phi ), p * cos( theta ), p * sin( theta ) * cos( phi ));
	gl_Position = projectionMatrix * modelViewMatrix * vec4( moved + origin , 1.0 );

	v_uv = uv;
}