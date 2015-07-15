/**
 * @author axiverse / http://axiverse.com/
 */

THREE.BlendCamera = function ( c1, c2, alpha ) {

	THREE.Camera.call( this );

	this.type = 'BlendCamera';

	this.c1 = c1; // !== undefined ? c1 : 50;
	this.c2 = c2; // !== undefined ? c2 : 1;
	this.alpha = alpha !== undefined ? alpha : 0;

	this.updateProjectionMatrix();

};

THREE.BlendCamera.prototype = Object.create( THREE.Camera.prototype );
THREE.BlendCamera.prototype.constructor = THREE.BlendCamera;


/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 */

THREE.BlendCamera.prototype.setAlpha = function ( alpha ) {

	this.alpha = alpha;
	this.updateProjectionMatrix();

}

THREE.BlendCamera.prototype.updateProjectionMatrix = function () {

	this.c1.updateProjectionMatrix();
	this.c2.updateProjectionMatrix();

	this.projectionMatrix.lerpMatrices( this.c1.projectionMatrix, this.c2.projectionMatrix, this.alpha );

};

THREE.BlendCamera.prototype.clone = function () {

	var camera = new THREE.BlendCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.alpha = this.alpha;

	camera.c1 = this.c1.clone();
	camera.c2 = this.c2.clone();

	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;

};