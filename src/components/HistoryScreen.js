import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  SwipeRow,
  View
} from "native-base";

import { AsyncStorage, Alert } from "react-native"
import { NavigationEvents } from "react-navigation";
import * as _ from 'lodash';

// const jamur = "file:///data/data/com.imagerecogitionreactnative/cache/react-native-image-crop-picker/52a3c94c-4e2e-4f92-ac85-cf8af47c549e.jpg"
// const listItem = [
// ];

let datas = [];

class HistoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      listImage: [],
      listData: []
    }
  }

  // componentWillFocus() {
  //   console.log("asdasdasd")
  //   // Screen will entered
  // }

  componentDidMount() {
    
  }

  fetchingData() {
    console.log(this.state.listImage.length);
    // this.setState({listImage:[]});
    // this.state.listImage = [];
    // console.log("test");
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        // console.log("storage ", stores);
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          // console.log(key)
          let key = store[i][0];
          let value = JSON.parse(store[i][1]);
  
          var obj = {
            data: value,
            text: key,
          }
          datas.push(obj);
          this.setState({listData:datas});
        });
      });
    });

    // this.state.listData = _.sortBy(this.state.listData,'key', 'desc');
    
  }

  clearAsyncStorage = async() => {
    console.log("kepencet")
    AsyncStorage.clear();
    datas = []
    // // this.setState({listImage:[]})
    
    this.setState({listData:[]})
    this.fetchingData();
    console.log("ini data", this.state.listData);
    this.render();
  }

  handleClick(){
    Alert.alert(
      'Delete History',
      'Anda yakin akan menghapus semua data history ?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this.clearAsyncStorage()},
      ],
      { cancelable: true }
    )
  }
  

  

  render() {
    // let img = this.state.listImage[0];
    // console.log("img");
    // if(datas.length > 0)
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
              // datas = [];
              datas = []
              // this.setState({listImage:[]})
              this.setState({listData:[]})
              console.log(this.state.listData);
              this.fetchingData();
              // this.setState({listData:_.sortBy(this.state.listData,'text', 'asc')})
              // console.log(_.sortBy(this.state.listData,'text', 'desc'));
          }}
          />
        <Header>
          <Left>
            {/* <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button> */}
          </Left>
          <Body>
            <Title>History</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.handleClick()}>
              <Icon name="trash" />
            </Button>
          </Right>
        </Header>

        <Content>
          <List>
            {this.state.listData.reverse().map((data, i) => {
              // console.log("data", data);
              if(this.state.listData.length > 0){
              return(
              <ListItem thumbnail key={i}>
                <Left>
                  <Thumbnail square size={55} source={{uri:data.data.imgCrop}} />
                </Left>
                <Body>
                  <Text>Kualitas : {data.data.result}</Text>
                  <Text>
                    Tingkat kedekatan warna : {data.data.data[0].hasil1}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.data.createDate}
                  </Text>
                </Body>
                {/* <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right> */}
              </ListItem>
              )
            }else{
              return null
            }
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
});

export default HistoryScreen;