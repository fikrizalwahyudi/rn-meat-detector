import React from 'react';
import { Modal, Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton.js';

import * as _ from 'lodash';

export default class Camera extends React.Component {

	constructor(props){
		super(props);
        this.state = { 
			identifedAs: '',
			loading: false
		}
		this.responseData = {};
		this.showCamera = true;
    }

    // takePicture = async function(){
		
	// 	if (this.camera) {

	// 		// Pause the camera's preview
	// 		this.camera.pausePreview();
            
    //         // Set the activity indicator
	// 		this.setState((previousState, props) => ({
	// 			loading: true
	// 		}));
			
	// 		// Set options
	// 		const options = {
    //             base64: true
    //         };
			
	// 		// Get the base64 version of the image
	// 		const data = await this.camera.takePictureAsync(options)
			
	// 		// Get the identified image
	// 		this.identifyImage(data.base64);
	// 	}
	// }

	takePicture = async function() {
		if (this.camera) {
		  const options = { quality: 0.5, base64: true };
		//   this.setState({
		// 	loading: true
		//   });
		  const data = await this.camera.takePictureAsync(options);
		//   this.setState({
		// 	loading: false
		//   });
		console.log(data);
		  this.identifyImage(data.base64);
		}
	  };
	

	identifyImage(imageData){

		// Initialise Clarifai api
		const Clarifai = require('clarifai');

		const app = new Clarifai.App({
			apiKey: '7e24556f63e545148b4714ec64983cf8'
		});

		console.log("test");
		// Identify the image
		app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", {base64: imageData})
			.then((response) => {	
				console.log("masuk");
				// this.displayAnswer(response.outputs[0].data.concepts[0].name)
				console.log("response ", response);
				// Alert.alert(String(response.outputs[0]));
				// var string = "";
				// response.outputs[0].data.colors.forEach(e => {
				// 	string += JSON.stringify(e);
				// });
				// // Alert.alert(string);
				// // this.setState((prevState, props) => ({
				// // 	identifedAs:identifiedImage,
				// // 	loading:false
				// // }));
				// this.responseData = response.outputs[0].data.colors;
				// this.showCamera = false;

				var dominanceColor = _.sortBy(response.outputs[0].data.colors, [function(o) { return o.value; }]);
				Alert.alert(JSON.stringify(dominanceColor[0].w3c.name + " hex :  " + JSON.stringify(dominanceColor[0].w3c.hex)));
				
				// this.displayAnswer(response);
			}).catch(
				(err) => {
					Alert.alert("error");
					console.log(err);
				}
				);
	}

	displayAnswer(identifiedImage){


		// Dismiss the acitivty indicator
		this.setState((prevState, props) => ({
			identifedAs:identifiedImage,
			loading:false,
			re
		}));
		console.log("masuk");

		console.log(this.state.identifedAs);
		// Show an alert with the answer on
		Alert.alert("test");
		Alert.alert(
			this.state.identifedAs,
			'',
			{ cancelable: false }
		  )

		// Resume the preview
		this.camera.resumePreview();
	}
    
	render() {
		return (
			<RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
			<ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
				<CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
			</RNCamera>
		);
		

		
	}

	
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

