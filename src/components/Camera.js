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
		this.listColor = ["#EFD0C1",
		"#EFD0C1",
		"#EFCFC0",
		"#EFCEC0",
		"#EFCEBF",
		"#EFCDBE",
		"#EFCCBD",
		"#EFCBBC",
		"#EFCABB",
		"#EFC9BA",
		"#F0C9B9",
		"#F0C8B9",
		"#F0C7B8",
		"#F0C6B7",
		"#F0C6B6",
		"#F0C5B5",
		"#F0C4B5",
		"#F0C3B4",
		"#F0C3B3",
		"#F0C2B2",
		"#F0C1B2",
		"#F0C0B1",
		"#F0BFB0",
		"#F1BFAF",
		"#F1BEAE",
		"#F1BDAE",
		"#F1BCAD",
		"#F1BBAC",
		"#F1BBAB",
		"#F1BAAA",
		"#F1B9AA",
		"#F1B8A9",
		"#F1B7A8",
		"#F1B6A7",
		"#F1B5A6",
		"#F2B5A6",
		"#F2B4A5",
		"#F2B3A4",
		"#F2B2A3",
		"#F2B1A2",
		"#F2B0A2",
		"#F2AFA1",
		"#F2AEA0",
		"#F2AD9F",
		"#F2AC9E",
		"#F2AB9E",
		"#F2AA9D",
		"#F2AA9C",
		"#F3A99B",
		"#F3A89A",
		"#F3A79A",
		"#F3A699",
		"#F3A598",
		"#F3A497",
		"#F3A396",
		"#F3A296",
		"#F3A195",
		"#F3A094",
		"#F39F93",
		"#F39E92",
		"#F49D92"];
    }

  

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

				var dominanceColor = _.sortBy(response.outputs[0].data.colors, [function(o) { return o.value; }]);
				// Alert.alert(JSON.stringify(dominanceColor[0].w3c.name + " hex :  " + JSON.stringify(dominanceColor[0].w3c.hex)));
				var message = "Kondisi Kurang Baik";
				// this.listColor.forEach(e=>{
				// 	if(e == dominanceColor[0].w3c.hex){
				// 		message = "Kondisi Baik";
				// 	}
				// })
				var warnaDominan = dominanceColor[0].w3c.hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
				console.log(warnaDominan);
				
				var rgb = [255,0,0];

				var nilaiTertinggi = [rgb[0]+50,rgb[1]+50,rgb[2]+50];
				var nilatiTerendah = [rgb[0]-50,rgb[1]-50,rgb[2]-50];
				var hasil = [];
				for (let i = 0; i < warnaDominan.length; i++) {
					const element = warnaDominan[i];
					if(element <= nilaiTertinggi[i] && element >= nilatiTerendah[i] ){
						hasil.push(true);
					}else{
						hasil.push(false);
					}
				}
				var check = function(hasil){
					return hasil;
				};
				
				var res = hasil.every(check);
				if(res){
					Alert.alert("Kualitas Baik", hasil.toString());
				}else{
					Alert.alert("Kualitas Kurang Baik", hasil.toString());
				}
				// console.log(res.toString());
				

				// // this.displayAnswer(response);
			}).catch(
				(err) => {
					Alert.alert("Maaf gagal mendeteksi gambar");
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

