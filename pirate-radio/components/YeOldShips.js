import React, { Component } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
const PiratePNG = require('../assets/images/pirate.png');
const PirateShipPNG = require('../assets/images/pirate-ship.png');

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Styles from '../assets/styles/AppStyles';

export default class YeOldShips extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            resultsList: []
        }
    }

    generateResultsList(){
        let resultsComponentArray = [];
        console.log('YE OLD SHIPS IN PROPS: ', this.props.yeOldShips)
        this.props.yeOldShips.forEach((result, i) => {
            resultsComponentArray.push(
                <TouchableOpacity
                    key={i}
                    style={Styles.SearchList} 
                    onPress={() => {
                        this.props.navigation.navigate('ShipCrewScreen', { shipId: result.shipId  })
                    }}>
                    <View key={i} style={[, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <Text style={Styles.SmallTextPirate}>
                            <Image source={PiratePNG} style={Styles.PirateShipIconSmall}/> { result.shipName }
                        </Text>
                        <Text style={Styles.SmallTextNormal}>
                            Tracks: //Count
                        </Text>
                    </View>
                </TouchableOpacity>
            )
          return   
        })
        return resultsComponentArray
    }

    onComponentDidMount(){
        this.generateResultsList()
    }

    render(){
        return this.generateResultsList()
    }
}