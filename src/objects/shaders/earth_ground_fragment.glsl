//
// Atmospheric scattering fragment shader
//
// Author: Sean O'Neil
//
// Copyright (c) 2004 Sean O'Neil
//
// Ported for use with three.js/WebGL by James Baicoianu

//uniform sampler2D s2Tex1;
//uniform sampler2D s2Tex2;

uniform float fNightScale;
uniform vec3 v3LightPosition;
uniform sampler2D tDiffuse;
//uniform sampler2D tDiffuseNight;
//uniform sampler2D tClouds;

uniform float fMultiplier;

varying vec3 c0;
varying vec3 c1;
varying vec3 vNormal;
varying vec2 vUv;

void main (void)
{
	//gl_FragColor = vec4(c0, 1.0);
	//gl_FragColor = vec4(0.25 * c0, 1.0);
	//gl_FragColor = gl_Color + texture2D(s2Tex1, gl_TexCoord[0].st) * texture2D(s2Tex2, gl_TexCoord[1].st) * gl_SecondaryColor;
	float phong = max(dot(normalize(-vNormal), normalize(v3LightPosition)), 0.0);

	vec3 diffuseTex = texture2D( tDiffuse, vUv ).xyz;
	//vec3 diffuseNightTex = texture2D( tDiffuseNight, vUv ).xyz;

	//diffuseTex = vec3(0.0);
	//diffuseNightTex = vec3(0.0);
	//vec3 cloudsTex = texture2D( tClouds, vUv ).xyz;

	//vec3 day = max( diffuseTex, cloudsTex ) * c0;
	//vec3 night = fNightScale * (0.7 * pow(diffuseNightTex, vec3(3)) + 0.3 * diffuseNightTex) * (1.0 - c0) * phong * (1.0 - cloudsTex);



	// specular
	//vec3 r = reflect( -normalize(v3LightPosition), normalize(vNormal) );
	//float specular =  0.2 * pow(max(dot(r, normalize(cameraPosition)), 0.0), 3.0);





	//gl_FragColor = vec4(c1, 1.0) + vec4(day + night, 1.0);

	//gl_FragColor = vec4(fMultiplier * (c1 + day + night), 1.0);
	gl_FragColor = vec4(c1 + c0 * diffuseTex, 1.0);
	//gl_FragColor.r += specular;
	//gl_FragColor.rg += vUv.xy;

}