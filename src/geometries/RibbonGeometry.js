THREE.RibbonGeometry = function( segments, duration ) {

	THREE.BufferGeometry.call( this );

	this.positions = new Float32Array( segments * 3 * 6 );
	this.addAttribute( 'position', new THREE.DynamicBufferAttribute( this.positions, 3 ) );

	this.segments = segments;
	this.duration = duration;
	this.index = 0;

}

THREE.RibbonGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
THREE.RibbonGeometry.prototype.constructor = THREE.RibbonGeometry;

THREE.RibbonGeometry.prototype.advance = function( x, y, z ) {

	var positions = this.positions;
	var v = this.index;

	positions[ v * 18 +  3 ] = x;
	positions[ v * 18 +  4 ] = y;
	positions[ v * 18 +  5 ] = z;

	positions[ v * 18 + 12 ] = x;
	positions[ v * 18 + 13 ] = y;
	positions[ v * 18 + 14 ] = z;

	positions[ v * 18 + 15 ] = x;
	positions[ v * 18 + 16 ] = y;
	positions[ v * 18 + 17 ] = z + 10;

	v = v + 1;

	if ( v >= this.segments ) {

		v = 0;

	}

	positions[ v * 18 +  0 ] = x;
	positions[ v * 18 +  1 ] = y;
	positions[ v * 18 +  2 ] = z;

	positions[ v * 18 +  6 ] = x;
	positions[ v * 18 +  7 ] = y;
	positions[ v * 18 +  8 ] = z + 10;

	positions[ v * 18 +  9 ] = x;
	positions[ v * 18 + 10 ] = y;
	positions[ v * 18 + 11 ] = z + 10;

	positions[ v * 18 +  3 ] = NaN;
	positions[ v * 18 +  4 ] = NaN;
	positions[ v * 18 +  5 ] = NaN;

	positions[ v * 18 + 12 ] = NaN;
	positions[ v * 18 + 13 ] = NaN;
	positions[ v * 18 + 14 ] = NaN;

	positions[ v * 18 + 15 ] = NaN;
	positions[ v * 18 + 16 ] = NaN;
	positions[ v * 18 + 17 ] = NaN;

	this.index = v;
	this.attributes.position.needsUpdate = true;
}