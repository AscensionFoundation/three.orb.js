THREE.RibbonGeometry = function( segments, duration ) {

	THREE.BufferGeometry.call( this );

	this.positions = new Float32Array( segments * 3 * 6 );
	this.normals = new Float32Array( segments * 3 * 6 );
	this.uvs = new Float32Array( segments * 2 * 6 );
	this.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.positions, 3 ) );
	this.addAttribute( 'normal', new THREE.DynamicBufferAttribute( this.normals, 3 ) );
	this.addAttribute( 'uv', new THREE.DynamicBufferAttribute( this.uvs, 2 ) );
	this.previous = new THREE.Vector3();
	this.temp = new THREE.Vector3();

	for ( var i = 0; i < segments; ++i ) {

		this.uvs[ i * 12 + 0 ] = 1;
		this.uvs[ i * 12 + 2 ] = 1;
		this.uvs[ i * 12 + 4 ] = -1;
		this.uvs[ i * 12 + 6 ] = 1;
		this.uvs[ i * 12 + 8 ] = -1;
		this.uvs[ i * 12 + 10 ] = -1;

	}

	this.segments = segments;
	this.duration = duration;
	this.index = 0;

}

THREE.RibbonGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
THREE.RibbonGeometry.prototype.constructor = THREE.RibbonGeometry;

THREE.RibbonGeometry.prototype.advance = function( x, y, z ) {

	var positions = this.positions;
	var normals = this.normals;
	var v = this.index;
	var t = this.temp;
	t.set(x, y, z).sub(this.previous);

	normals[ v * 18 +  3 ] = t.x;
	normals[ v * 18 +  4 ] = t.y;
	normals[ v * 18 +  5 ] = t.z;
	positions[ v * 18 +  3 ] = x;
	positions[ v * 18 +  4 ] = y;
	positions[ v * 18 +  5 ] = z;

	normals[ v * 18 +  9 ] = t.x;
	normals[ v * 18 + 10 ] = t.y;
	normals[ v * 18 + 11 ] = t.z;
	positions[ v * 18 +  9 ] = x;
	positions[ v * 18 + 10 ] = y;
	positions[ v * 18 + 11 ] = z;

	normals[ v * 18 + 15 ] = t.x;
	normals[ v * 18 + 16 ] = t.y;
	normals[ v * 18 + 17 ] = t.z;
	positions[ v * 18 + 15 ] = x;
	positions[ v * 18 + 16 ] = y;
	positions[ v * 18 + 17 ] = z;

	v = v + 1;

	if ( v >= this.segments ) {

		v = 0;

	}

	normals[ v * 18 +  0 ] = t.x;
	normals[ v * 18 +  1 ] = t.y;
	normals[ v * 18 +  2 ] = t.z;
	positions[ v * 18 +  0 ] = x;
	positions[ v * 18 +  1 ] = y;
	positions[ v * 18 +  2 ] = z;

	normals[ v * 18 +  6 ] = t.x;
	normals[ v * 18 +  7 ] = t.y;
	normals[ v * 18 +  8 ] = t.z;
	positions[ v * 18 +  6 ] = x;
	positions[ v * 18 +  7 ] = y;
	positions[ v * 18 +  8 ] = z;

	normals[ v * 18 +  12 ] = t.x;
	normals[ v * 18 +  13 ] = t.y;
	normals[ v * 18 +  14 ] = t.z;
	positions[ v * 18 + 12 ] = x;
	positions[ v * 18 + 13 ] = y;
	positions[ v * 18 + 14 ] = z;

	positions[ v * 18 +  3 ] = NaN;
	positions[ v * 18 +  4 ] = NaN;
	positions[ v * 18 +  5 ] = NaN;

	positions[ v * 18 +  9 ] = NaN;
	positions[ v * 18 + 10 ] = NaN;
	positions[ v * 18 + 11 ] = NaN;

	positions[ v * 18 + 15 ] = NaN;
	positions[ v * 18 + 16 ] = NaN;
	positions[ v * 18 + 17 ] = NaN;

	this.index = v;
	this.attributes.position.needsUpdate = true;
	this.attributes.normal.needsUpdate = true;
	this.previous.set( x, y, z );
}