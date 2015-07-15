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