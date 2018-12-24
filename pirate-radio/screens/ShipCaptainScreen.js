import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { PirateText } from '../components/PirateText';
import Styles from '../assets/styles/AppStyles';

import { SeaBackground } from '../components/SeaBackground';
import Player from '../components/Player';
import TrackList from '../components/TrackList';


export default class ShipCaptainScreen extends React.Component {

    constructor(props){
        super(props)
    }

    static NavigationOptions = { header: { visibile: false } };

    render() {
        

        console.log("!!!!!!!!!!!", this.props.screenProps)
        
        const {ship, tracks} = this.props.screenProps;
        // const {ship, tracks} = this.props.screenProps;
        // console.log('SHIP: ', this.props.screenProps)
        
        return (
            <SeaBackground>
                <View style={Styles.Boxes}>
                    <View style={Styles.Search}> 
                        <PirateText style={Styles.BigText}>Captain Barbosa</PirateText>
                    </View>

                    <View style={Styles.Results}>
                        <Player tracks={this.props.screenProps.tracks} updateCurrentTrack={this.props.screenProps.updateCurrentTrack.bind(this)}/>
                    </View>

                    <View style={Styles.Popular}>
                        <Text style={Styles.BigText}>{ship.name}{'\n'}</Text>
                        <TrackList tracks={this.props.screenProps.tracks} ship={this.props.screenProps.ship} updateCurrentTrack={this.props.screenProps.updateCurrentTrack}/>
                    </View>
                    {/* <ListView> 
                        <PirateText>Popular Ships</PirateText>
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <PirateText>{rowData}</PirateText>}
                    </ListView> */}
                    <View style={Styles.Footer}>
                        <BottomNav/>
                    </View>
                </View>
            </SeaBackground>
        )
    }
}