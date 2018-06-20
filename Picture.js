import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, AsyncStorage, ScrollView, Button, Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import Album from './Album'


const mapStateToProps = state => {
  return { pictureImgUrl: state.pictureImgUrl, pictureImgTitle: state.pictureImgTitle, pictureId: state.pictureId };
}

class Picture extends Component {
  static navigationOptions = {
    title: 'Image Viewer',
  };

  goBack() {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.imageViewer}>
        <Image source={{uri: this.props.pictureImgUrl}} style={{width: 350, height: 350, marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto'}} />
        <Text>{this.props.pictureImgTitle}</Text>
        <View style={styles.buttonCont}>
          <Button title="Close" color="#fff" onPress={() => this.goBack()}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageViewer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCont: {
    backgroundColor: '#1187a1',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20
  }
});

export default connect(mapStateToProps)(Picture);
