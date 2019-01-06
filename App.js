import React  from 'react';
import { StyleSheet, View } from 'react-native';
import {Icon, Root} from 'native-base';
import {createBottomTabNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator, createSwitchNavigator} from 'react-navigation-material-bottom-tabs';
import LoadingScreen from './src/router';

export default class App extends React.Component {

	constructor(props){
		super(props);
		process.nextTick = setImmediate;
	}

	render() {
		return (
			<Root>
				<LoadingScreen />
		 	</Root>
		);
	}
}
