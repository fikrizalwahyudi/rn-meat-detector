import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Content
  } from "native-base";

  import {
    StyleSheet,
    View,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
  } from 'react-native';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Home </Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/img/meat.png')}/>
          <Text style={styles.companyName}>Meat Detector</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
             Meat Detector adalah sebuah aplikasi yang dibuat untuk mempermudah memilih daging sapi yang layak dikonsumsi.
             dan informasi yang diberikan adalah informasi yang diambil dari Badan pemeriksa obat dan makanan,
             dan cara penggunaanyapun juga mudah pilih daging yang akan dikonsumsi dan tunjukan pada camera aplikasi Meat Detector,
             dan aplikasipun secara otomatis akan menujukan kualitas daging.
            </Text>
          </View>
          {/* <View >
            <Image style={styles.logoKarkas} source={require('../assets/img/karkasdaging/all.png')}/>
          </View> */}
        </View>
      </ScrollView>
      </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#42A5F5',
  },
  logo:{
    width:120,
    height:120,
    justifyContent: 'center',
    marginBottom:10,
    marginTop:30,
  },
  logoKarkas:{
    width:290,
    height:150,
    justifyContent: 'center',
    marginBottom:10,
    marginTop:30,
  },
  companyName: {
    fontSize:32,
    fontWeight: '600',
    // color: '#FFFFFF',
  },
  slogan:{
    fontSize:18,
    fontWeight: '600',
    // color: '#228B22',
    marginTop:10,
  },
  descriptionContent:{
    padding:30
  },
  description:{
    fontSize:12,
    textAlign:'center',
    marginTop:10,
    // color: '#FFFFFF',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: '#EE82EE',
    fontWeight: '600', 
    fontSize:18,
  }
}); 
export default Home;