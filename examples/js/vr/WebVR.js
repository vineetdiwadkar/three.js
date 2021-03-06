/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */

var WEBVR = {

	createButton: function ( renderer ) {

		function showEnterVR() {

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'ENTER VR';

		}

		function showVRNotFound() {

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.textContent = 'VR NOT FOUND';

		}

		if ( 'getVRDisplays' in navigator ) {

			var button = document.createElement( 'button' );
			button.style.position = 'absolute';
			button.style.bottom = '20px';
			button.style.border = '1px solid #fff';
			button.style.padding = '12px 6px';
			button.style.backgroundColor = 'transparent';
			button.style.color = '#fff';
			button.style.fontFamily = 'sans-serif';
			button.style.fontSize = '13px';
			button.style.fontStyle = 'normal';
			button.style.textAlign = 'center';
			button.style.zIndex = '999';

			showVRNotFound();

			window.addEventListener( 'vrdisplayconnect', function ( event ) {

				console.log( event.display.isConnected );

				var display = event.display;

				showEnterVR();

				button.onclick = function () {

					display.isPresenting ? display.exitPresent() : display.requestPresent( [ { source: renderer.domElement } ] );

				};

				renderer.vr.setDevice( display );

			}, false );

			window.addEventListener( 'vrdisplaydisconnect', function ( event ) {

				console.log( event );
				console.log( event.display.isConnected );

				showVRNotFound();

				button.onclick = null;

				renderer.vr.setDevice( null );

			}, false );

			window.addEventListener( 'vrdisplaypresentchange', function ( event ) {

				var display = event.display;

				button.textContent = display.isPresenting ? 'EXIT VR' : 'ENTER VR';

			}, false );

			return button;

		} else {

			var error = document.createElement( 'div' );
			error.style.position = 'absolute';
			error.style.left = 'calc(50% - 150px)';
			error.style.bottom = '20px';
			error.style.width = '300px';
			error.style.fontFamily = 'sans-serif';
			error.style.fontSize = '16px';
			error.style.fontStyle = 'normal';
			error.style.lineHeight = '26px';
			error.style.backgroundColor = '#fff';
			error.style.color = '#000';
			error.style.padding = '10px';
			error.style.textAlign = 'center';
			error.style.zIndex = '999';
			error.innerHTML = 'Your browser does not support WebVR. Check <a href="https://webvr.info">webvr.info</a> for assistance.';

			return error;

		}

	},

	// DEPRECATED

	checkAvailability: function () {
		console.warn( 'WEBVR.checkAvailability has been deprecated.' );
		return new Promise( function () {} );
	},

	getMessageContainer: function () {
		console.warn( 'WEBVR.getMessageContainer has been deprecated.' );
		return document.createElement( 'div' );
	},

	getButton: function () {
		console.warn( 'WEBVR.getButton has been deprecated.' );
		return document.createElement( 'div' );
	},

	getVRDisplay: function () {
		console.warn( 'WEBVR.getVRDisplay has been deprecated.' );
	}

};
