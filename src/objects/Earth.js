THREE.Earth = function ( camera ) {

	THREE.Object3D.call( this );

	this.type = 'Earth';
	
	this.camera = camera;
	this.uniforms = THREE.UniformsUtils.clone( THREE.UniformsLib.earth );
	this.uniforms.tDiffuse.value = THREE.ImageUtils.loadTexture( '../data/earth.color.jpg' );

	// create terrain geometry
	{
		var geometry = new THREE.SphereGeometry( THREE.Constants.atmosphere.innerRadius, 100, 100 );
		geometry = new THREE.BufferGeometry().fromGeometry( geometry );

		var material = new THREE.ShaderMaterial({

			uniforms:		this.uniforms,
			vertexShader:	THREE.ShaderChunk [ 'earth_ground_vertex' ],
			fragmentShader:	THREE.ShaderChunk [ 'earth_ground_fragment' ],

			depthWrite: true,

		});

		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'terrain';

		this.add( mesh );

	};

	// create sky geometry
	{
		var geometry = new THREE.SphereGeometry( THREE.Constants.atmosphere.outerRadius, 100, 100 );
		geometry = new THREE.BufferGeometry().fromGeometry( geometry );

		var material = new THREE.ShaderMaterial({

			uniforms:		this.uniforms,
			vertexShader:	THREE.ShaderChunk [ 'earth_atmosphere_vertex' ],
			fragmentShader:	THREE.ShaderChunk [ 'earth_atmosphere_fragment' ],

			side: THREE.BackSide,
			transparent: true,
			blending: THREE.AdditiveBlending

		});

		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'sky';

		this.add( mesh );
	};

};

THREE.Earth.prototype = Object.create( THREE.Object3D.prototype );
THREE.Earth.prototype.constructor = THREE.Earth;

THREE.Earth.prototype.updateMatrixWorld = function() {

	THREE.Object3D.prototype.updateMatrixWorld.apply( this, arguments );

	var cameraHeight = this.camera.position.length();

	this.uniforms.v3LightPosition.value.set(0, 1, 0);
	this.uniforms.fCameraHeight.value = cameraHeight;
	this.uniforms.fCameraHeight2.value = cameraHeight * cameraHeight;

}