import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import Album from './Album';
import axios from 'axios';
import { connect } from 'react-redux';
import { liftAlbumsToState, selectedAlbum } from './actions/index.js';

const mapDispatchToProps = dispatch => {
  return {
    liftAlbumsToState: (data) => dispatch(liftAlbumsToState(data)),
    selectedAlbum: (data) => dispatch(selectedAlbum(data))
  }
}

const mapStateToProps = state => {
  return { albums: state.albums };
}

class Home extends Component {
  static navigationOptions = {
    title: 'Photo Albums',
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then((response) => {
      this.props.liftAlbumsToState(response.data);
    }).catch((error) => {
      console.log(error)
    })
  }

  goToAlbum(albumId, albumTitle) {
    this.props.selectedAlbum({
      id: albumId,
      title: albumTitle
    })
    this.props.navigation.navigate('Album')
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.props.albums.length > 0
            ? this.props.albums.map((album, index) => {
              return (
                <View style={styles.buttonCont} key={index}>
                  <Button title={'📷 ' + album.id + '. ' + album.title} color="#fff" style={styles.albumContainer} onPress={() => this.goToAlbum(album.id, album.title)}>
                  </Button>
                </View>
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
  buttonCont: {
    backgroundColor: '#1187a1',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  albumContainer: {
    marginTop: 10,
    marginBottom: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
