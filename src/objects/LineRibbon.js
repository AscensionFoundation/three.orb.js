THREE.LineRibbon = function( geometry, material ) {

	THREE.Mesh.call( this, geometry, material, THREE.TriangleStrip );
	
	this.attributes = {

		displacement: {	type: 'v3', value: [] },
		customColor: {	type: 'c', value: [] }

	};

	this.uniforms = THREE.UniformsUtils.clone( THREE.UniformsLib.screen );
	this.uniforms.targetSize.value.set( window.innerWidth, window.innerHeight );

	this.geometry = geometry !== undefined ? geometry : new THREE.Geometry();
	this.material = material !== undefined ? material : new THREE.ShaderMaterial( {

		uniforms:       this.uniforms,
		attributes:     this.attributes,
		vertexShader:   THREE.ShaderChunk[ 'line_ribbon_vertex' ],
		fragmentShader: THREE.ShaderChunk[ 'line_ribbon_fragment' ],
		side:           THREE.DoubleSide,
		blending:          THREE.AdditiveBlending,
		depthTest:      false,
		transparent:    true

	} );

	for ( var i = 0; i < this.geometry.segments; ++i ) {



	}

}

THREE.LineRibbon.prototype = Object.create( THREE.Mesh.prototype );
THREE.LineRibbon.prototype.constructor = THREE.LineRibbon;