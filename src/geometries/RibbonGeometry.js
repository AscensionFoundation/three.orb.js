THREE.RibbonGeometry = function( segments, duration ) {

	THREE.BufferGeometry.call( this );

	this.positions = new Float32Array( segments * 3 * 2 );
	this.normals = new Float32Array( segments * 3 * 2 );
	this.uvs = new Float32Array( segments * 2 * 2 );
	this.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.positions, 3 ) );
	this.addAttribute( 'normal', new THREE.DynamicBufferAttribute( this.normals, 3 ) );
	this.addAttribute( 'uv', new THREE.DynamicBufferAttribute( this.uvs, 2 ) );
	this.previous = new THREE.Vector3();
	this.temp = new THREE.Vector3();

	for ( var i = 0; i < segments; ++i ) {

		this.uvs[ i * 4 + 0 ] = 1;
		this.uvs[ i * 4 + 2 ] = -1;

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

	normals[ v * 6 +  0 ] = t.x;
	normals[ v * 6 +  1 ] = t.y;
	normals[ v * 6 +  2 ] = t.z;
	normals[ v * 6 +  3 ] = t.x;
	normals[ v * 6 +  4 ] = t.y;
	normals[ v * 6 +  5 ] = t.z;

	positions[ v * 6 + 0 ] = x;
	positions[ v * 6 + 1 ] = y;
	positions[ v * 6 + 2 ] = z;
	positions[ v * 6 + 3 ] = x;
	positions[ v * 6 + 4 ] = y;
	positions[ v * 6 + 5 ] = z;

	v = v + 1;

	if ( v >= this.segments ) {

		v = 0;

	}

	positions[ v * 6 + 0 ] = NaN;
	positions[ v * 6 + 1 ] = NaN;
	positions[ v * 6 + 2 ] = NaN;
	positions[ v * 6 + 3 ] = NaN;
	positions[ v * 6 + 4 ] = NaN;
	positions[ v * 6 + 5 ] = NaN;

	this.index = v;
	this.attributes.position.needsUpdate = true;
	this.attributes.normal.needsUpdate = true;
	this.previous.set( x, y, z );
}