THREE.Matrix4.prototype.lerp = function( m, alpha ) {

	for ( var i = 0; i < 16; ++i ) {

		this.elements[ i ] += ( m.elements[ i ] - this.elements[ i ] ) * alpha ;

	}

	return this;
}

THREE.Matrix4.prototype.lerpMatrices = function( m1, m2, alpha ) {

	for ( var i = 0; i < 16; ++i ) {

		this.elements[ i ] = ( m2.elements[ i ] - m1.elements[ i ] ) * alpha + m1.elements[ i ];

	}
	
	return this;

}

/**
 * A projection matrix that allows easy conversion between perspective and orthogonal views
 * @param parallelism
 */
THREE.Matrix4.prototype.makeFocal = function( width, height, parallelism, focal, near, far) {

		var ymax = near * Math.tan( THREE.Math.degToRad( fov * 0.5 ) );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

}