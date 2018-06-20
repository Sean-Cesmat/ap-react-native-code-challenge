import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, Image, ScrollView, ListView, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { openPicture } from './actions/index.js';
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return {
    openPicture: (data) => dispatch(openPicture(data))
  }
}

const mapStateToProps = state => {
  return { albums: state.albums, selectedAlbumId: state.selectedAlbumId, selectedAlbumTitle: state.selectedAlbumTitle };
}

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: []
    }
  }
  
  static navigationOptions = {
    title: 'Album Gallery',
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + this.props.selectedAlbumId)
    .then((response) => {
      this.setState({
        currentAlbum: response.data
      })
    })
  }

  openPicture(pictureData) {
    this.props.openPicture(pictureData);
    this.props.navigation.navigate('Picture')
  }


  render() {
    this.state.currentAlbum.length > 0 ?
    console.log('currentAlbum: ', this.state.currentAlbum, typeof this.state.currentAlbum[0].url.toString() ) : null
    return (
      <View>
        <Text style={{textAlign: 'center'}}>{this.props.selectedAlbumTitle}</Text>
        <ScrollView contentContainerStyle={styles.grid}>
          { this.state.currentAlbum.length > 0
            ? this.state.currentAlbum.map((image, index) => {
            return (
                <TouchableOpacity key={index} style={styles.imageList} onPress={() => this.openPicture({url: image.url, title: image.title, id: image.id})}>
                  <Image style={{width: 100, height: 100}}  source={{uri: image.url}} />
                </TouchableOpacity>
              )
            })
            : null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageList: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
