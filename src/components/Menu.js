import React, { Component } from "react";
import { StyleSheet,Image } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Toast,
  View,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import * as uploader from '../utils/ImageUtils';
import { AsyncStorage } from "react-native"
import { NavigationEvents } from "react-navigation";
import { colorsFromUrl } from 'react-native-dominant-color';
import * as _ from 'lodash';


class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            img:null,
            isResult:false,
            dominantColor:null,
            result:null,
            listHasil:null,
            data:[{}]
        };
        this.imagess = "";
        this.warnaKarkas = [
          {
              id: 1,
              kategori: "kategori 1",
              kualitas: "buruk",
              rgb: [238,209,198],
              hsv: [0.0458,0.1681,0.9333],
              imgSrc: require('../assets/img/karkasdaging/1.png')
          },
          {
              id: 2,
              kategori: "kategori 1",
              kualitas: "buruk",
              rgb: [247,156,148],
              hsv: [0.0135,0.4008,0.9686],
              imgSrc: require('../assets/img/karkasdaging/2.png')
          },
          {
              id: 3,
              kategori: "kategori 1",
              kualitas: "buruk",
              rgb: [239,115,105],
              hsv: [0.0124,0.5607,0.9373],
              imgSrc: require('../assets/img/karkasdaging/3.png')
          },
          {
              id: 4,
              kategori: "kategori 2",
              kualitas: "baik",
              rgb: [231,66,41],
              hsv: [0.0219,0.8225,0.9059],
              imgSrc: require('../assets/img/karkasdaging/4.png')
          },
          {
              id: 5,
              kategori: "kategori 2",
              kualitas: "baik",
              rgb: [218,33,33],
              hsv: [0.0000,0.8486,0.8549],
              imgSrc: require('../assets/img/karkasdaging/5.png')
          },
          {
              id: 6,
              kategori: "kategori 2",
              kualitas: "baik",
              rgb: [214,33,33],
              hsv: [0.0000,0.8458,0.8392],
              imgSrc: require('../assets/img/karkasdaging/6.png')
          },
          {
              id: 7,
              kategori: "kategori 3",
              kualitas: "sangat baik",
              rgb: [197,24,24],
              hsv: [0.0000,0.8782,0.7725],
              imgSrc: require('../assets/img/karkasdaging/7.png')
          },
          {
              id: 8,
              kategori: "kategori 3",
              kualitas: "sangat baik",
              rgb: [169,24,24],
              hsv: [0.0000,0.8580,0.6627],
              imgSrc: require('../assets/img/karkasdaging/8.png')
          },
          {
              id: 9,
              kategori: "kategori 3",
              kualitas: "sangat baik",
              rgb: [148,8,8],
              hsv: [0.0000,0.9459,0.5804],
              imgSrc: require('../assets/img/karkasdaging/9.png')
          }
      ];
        
    }

    pickerCallback = message => {
        if (message && message.nativeEvent && message.nativeEvent.data) {
          console.log(message.nativeEvent.data); // response from ImageColorPicker
        }
    };

    uploadImage(){
        
        var self = this;
        uploader.pickImageHandler().then((res)=>{
            // console.log("resultnya", res);
            // console.log("urinya", this.uri);
            // this.uri = res;
            console.log("result", res);
            self.setState({img:res.originalImg});
            // self.imagess = res.path;
            
            // this._storeData(res.imgCrop.path);
            // let self = this;
            colorsFromUrl(res.imgCrop.path, (err, colors) => {
                if(!err) {                    
                    // self.setState()
                    var result = self.calculateColor(colors.dominantColor);
                    console.log("data", result);
                    self.setState({isResult:true, dominantColor:colors.dominantColor, result:result[0].kategori, data:result})
                    console.log(self.state.isResult);
                    var date = new Date(),
                    year = date.getFullYear(),
                    month = (date.getMonth() + 1).toString(),
                    formatedMonth = (month.length === 1) ? ("0" + month) : month,
                    day = date.getDate().toString(),
                    formatedDay = (day.length === 1) ? ("0" + day) : day,
                    hour = date.getHours().toString(),
                    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
                    minute = date.getMinutes().toString(),
                    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
                    second = date.getSeconds().toString(),
                    formatedSecond = (second.length === 1) ? ("0" + second) : second;

                    var obj = {
                      originalImg:res.originalImg,
                      imgCrop:res.imgCrop.path,
                      dominantColor: colors.dominantColor,
                      result: result[0].kategori,
                      data: result,
                      createDate: formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond
                    }
                    
                    this._storeData(obj);
                    self.showToast(colors.dominantColor,"success");
                }else{
                  self.showToast(err,"success");
                  console.log(err);
                }
            });
            
            // self.setState({uri:res});
        }).catch((err)=>{
            self.showToast("Failed Upload Image","warning");
            console.log(err);
            
        })
    }

    rgbToHsv = (r, g, b) => {
      r /= 255, g /= 255, b /= 255;
    
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, v = max;
    
      var d = max - min;
      s = max == 0 ? 0 : d / max;
    
      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
      }
    
      return [ h.toFixed(4), s.toFixed(4), v.toFixed(4) ];
    }

    calculateColor(hexColorValue) {
      var dominantColor = hexColorValue;
      rgbDominantColor = dominantColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
      
      // [0,21,31]
      var hsvDominantColor = this.rgbToHsv(rgbDominantColor[0], rgbDominantColor[1], rgbDominantColor[2]);
      console.log("warna rgb dari dominant color adalah ", rgbDominantColor);
      console.log("hasil dari calculate function adalah ",  hsvDominantColor );

      var list = [];

      this.warnaKarkas.map((each, index)=>{
        var hasil = this.getDistanceColor(each.hsv, hsvDominantColor).toFixed(4);
        var obj = {
          hasil1:hasil,
          kategori: each.kualitas,
          imgSrc:each.imgSrc
        }
        list.push(obj);
      })

      console.log(_.sortBy(list,'hasil1'));
      var res = _.sortBy(list,'hasil1');

      return res;

    }

    getDistanceColor(color1 , color2){
      hDiff = color1[0] - color2[0];
      sDiff = color1[1] - color2[1];
      vDiff = color1[2] - color2[2];

      return hDiff * hDiff + sDiff * sDiff + vDiff * vDiff;
    }

    _storeData = async (data) => {
        try {
          await AsyncStorage.setItem(('img'+ new Date().getTime()), JSON.stringify(data)).then(obj=>{
              console.log("success", obj);
              
          }).catch(err=>{
              console.log(err);
          });
        } catch (error) {
          // Error saving data
          console.log(error)
        }
    }

    showToast = (message,type) =>{
        Toast.show({
            text: message,
            buttonText: 'Okay',
            type:type
        })
    }

  render() {
   
    const logo = (this.state.img);
    const cardResult = <Card style={styles.mb}>
                        <CardItem header>
                          <Text>Result</Text>
                        </CardItem>
                        <CardItem cardBody>
                          <Image source={{uri: this.state.img}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        
                        <CardItem>
                          <Body style={{alignContent:"center"}} >
                            <Text>
                              Kualitas : {this.state.result}
                            </Text>
                            <Text>
                              Tingkat kedekatan warna : {this.state.data[0].hasil1}
                            </Text>
                          </Body>
                        </CardItem>
                        
                      </Card>;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({
              img:null,
              isResult:false,
              dominantColor:null,
              result:null,
              listHasil:null,
              data:[{}]
            })
          }}
          />
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Menu</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ backgroundColor: "#FFF", padding: 20 }}>
          <Button block onPress={this.uploadImage.bind(this)} style={{marginBottom:30}}>
            <Text>Select Image {this.state.isResult}</Text>
          </Button>
          {this.state.isResult ? cardResult : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex:1
  },
  mb15: {
    marginBottom: 20
  },
});

export default Menu;