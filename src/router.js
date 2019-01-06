import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'native-base';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Camera from './components/Camera'
import Home from './components/Home';
import HistoryScreen from './components/HistoryScreen';
import Menu from './components/Menu';

const { height, width } = Dimensions.get('window')

class LoadingScreen extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentWillMount() {
      var self = this;
      setTimeout(function(){ 
        self.props.navigation.navigate('App');
      }, 3000);
  }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <Image resizeMode='contain'  source={require('./assets/img/meat.png')} style={{width: width / 3, height: 100}}/>
          <View style={{position:'absolute', bottom:10, left:0, width}}>
            <View style={{width, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#fff', alignSelf: 'center', fontSize:10}}> Loading</Text>
            </View>
            <Text style={{color:'#fff', alignSelf: 'center', fontSize:10}}>@Copyright2019</Text>
            {/* <Text style={{color:'#fff', alignSelf: 'center', fontSize:10, marginTop:-25}}>Version 1.0.0</Text> */}
          </View>
        </View>
      );
    }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BFFF'
  },
});

export const TabStack = createMaterialBottomTabNavigator({
	Home: {
		screen:Home,
		navigationOptions: {
			tabBarLabel: "Home",
			tabBarIcon: ({tintColor}) => <Icon name="home" style={{color:tintColor}} />
		}
  },
  Menu: {
		screen:Menu,
		navigationOptions: {
			tabBarLabel: "Menu",
			tabBarIcon: ({tintColor}) => <Icon name="menu" style={{color:tintColor}} />
		}
  },
  HistoryScreen: {
		screen:HistoryScreen,
		navigationOptions: {
			tabBarLabel: "History",
			tabBarIcon: ({tintColor}) => <Icon name="paper" style={{color:tintColor}} />
		}
	}
},{
	initialRouteName: "Home",
	activeTintColor: "#f0edf6",
	inactiveTintColor: "#1A237E",
	barStyle: { backgroundColor: '#283593' }
});

export const switchNav =  createSwitchNavigator(
    {
      LoadingScreen: LoadingScreen,
      App: TabStack
    },
    {
      initialRouteName: 'LoadingScreen',
    }
  );

export default createAppContainer(switchNav);
