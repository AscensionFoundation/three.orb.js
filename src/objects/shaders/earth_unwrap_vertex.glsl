uniform float alpha;
varying vec2 v_uv;

/*
def geographic_to_web_mercator(x_lon, y_lat):
if abs(x_lon) <= 180 and abs(y_lat) < 90:
	num = x_lon * 0.017453292519943295
	x = 6378137.0 * num
	a = y_lat * 0.017453292519943295
	x_mercator = x
	y_mercator = 3189068.5 * log((1.0 + math.sin(a)) / (1.0 - math.sin(a)))         
	return x_mercator, y_mercator
else:
	print('Invalid coordinate values for conversion')        
*/

void main(void) {

	vec3 pos = position;
	float len = length( position );

	float cameraLength = length( cameraPosition );
	vec3 center = cameraPosition / cameraLength * len;

	float dp = dot( cameraPosition, position ) / len / cameraLength;
	float arc = acos( dp ) * len;

	vec3 up = cross( cameraPosition - position, center - position );
	vec3 perp = normalize(cross( cameraPosition - position, up ));

	vec3 proj = center + perp * arc;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( mix( proj, position, alpha ) , 1.0 );

	v_uv = uv;
}