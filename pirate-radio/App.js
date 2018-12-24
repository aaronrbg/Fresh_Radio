import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import { AppLoading, Asset, FileSystem, Font, Icon } from 'expo';

import CaptainScreen from './screens/CaptainScreen';
import LandingScreen from './screens/LandingScreen';
import ListenHostScreen from './screens/ListenHostScreen';
import LoginRegisterScreen from './screens/LoginRegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShipCaptainScreen from './screens/ShipCaptainScreen';
import ShipCrewScreen from './screens/ShipCrewScreen';
import AppNavigator from './navigation/AppNavigator';

import shorthash from 'shorthash'

import Player from './components/Player';

//THESE ARE NOT WORKING......... all get || used   TODO: impliment env in react native 
const ENV = process.env.ENV || "development";
const PORT = process.env.PORT || 8080;
const LOCALHOST = process.env.LOCALHOST || 'http://localhost';

export default class App extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      loading: true
    }
  }

  downloadTrack = (index) => {
    Expo.FileSystem.downloadAsync(
        this.state.tracks[index].audioUrl,
        Expo.FileSystem.documentDirectory + shorthash.unique(this.state.tracks[index].audioUrl) + '.mp3'
      )
        .then(({ uri }) => {
          const start = this.state.tracks.slice(0, index);
          const end = this.state.tracks.slice(index + 1);
          this.setState({loading: false, tracks: [
            ...start,
            {
              ...this.state.tracks[index],
              localUrl: uri
            },
            ...end
            ]}, () => console.log('Async download of track ID:', this.state.tracks[index].id, 'complete.'))
        })
        .catch(error => {
          console.error('DOWNLOAD ERROR: ', error);
        });
  }

  updateCurrentTrack = (currentTrack, timeStamp) => {
    this.setState({
      ship: {
        name: this.state.ship.name,
        currentTrack: currentTrack + 1,
        timeStamp: timeStamp
      }
    })
  }
    
  shipRequest = LOCALHOST + ':' + PORT + '/ships/1';

    
  getShip = new Promise((resolve, reject) => {
      fetch(this.shipRequest, {
      method: 'GET'
      }).then((responseData, error) => {
        if (error){
          throw new Error("Error: ", error);
        } else {
          const response = JSON.parse(responseData._bodyText)
          const ship = { 
            ship: response.ship,
            tracks: response.tracks.map(track => {
              return {
                ...track,
                localUrl: null
              }
            })
          }
          resolve(ship);
        }
      })
    })

  componentDidMount() {
    this.getShip.then((ship) => {
      this.setState({
        tracks: ship.tracks,
        ship: ship.ship,
        loading: false
      })
      this.state.tracks.forEach((track, index) => {
          this.downloadTrack(index)
      })
    });
  }

  render() {
    // console.log('App render triggered')

    const screenProps = {
      tracks: this.state.tracks,
      ship: this.state.ship,
      updateCurrentTrack: this.updateCurrentTrack
    }

    if (this.state.loading === true ) {
      return <LandingScreen />
    } else {
      return <AppNavigator screenProps={ screenProps} />
    }

      // if (this.state.loading === true) {
      //   return < LandingScreen />
      // } else {
      //   return <ShipCaptainScreen tracks={this.state.tracks} ship={this.state.ship} updateCurrentTrack={this.updateCurrentTrack}/>
      // }
  }
}


