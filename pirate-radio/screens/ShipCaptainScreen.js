import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { PirateText } from '../components/PirateText';


import { SeaBackground } from '../components/SeaBackground';
import Player from '../components/Player';


export default class ShipCaptainScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trackList: []
        }
    }

    generateTrackList(){
        let trackComponentArray = []
        this.props.tracks.forEach((track, i) => {
            let active = (track.id === this.props.ship.currentTrack)
            trackComponentArray.push(<Text key={i} style={[styles.smallText, !track.localUrl ? styles.off : [], active ? styles.active : []]}>{track.title} by {track.artist}</Text>)
        })
        this.setState({trackList: trackComponentArray})
    }

    onComponentDidMount(){
        this.generateTrackList()
    }

    render() {
        console.log('CAPTIN SHIP RENDER')
        const {ship, tracks} = this.props;
        // console.log('SHIP: ', this.props)
       
        return (
            <SeaBackground>
                <View style={styles.boxes}>
                    <View style={styles.search}> 
                        <PirateText style={styles.bigText}>Captain Barbosa</PirateText>
                    </View>

                    <View style={styles.results}>
                        <Player tracks={this.props.tracks} generateTrackList={this.generateTrackList.bind(this)} updateCurrentTrack={this.props.updateCurrentTrack.bind(this)}/>
                    </View>

                    <View style={styles.popular}>
                        <Text style={styles.bigText}>{ship.name}{'\n'}</Text>
                        {this.state.trackList}
                    </View>
                    {/* <ListView> 
                        <PirateText>Popular Ships</PirateText>
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <PirateText>{rowData}</PirateText>}
                    </ListView> */}
                    <View style={styles.footer}>
                        <BottomNav/>
                    </View>
                </View>
            </SeaBackground>
        )
        
    }
}

styles = StyleSheet.create({
    boxes: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    search: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '10%',
        marginTop: 35,
        backgroundColor: '#383131',
        borderRadius: 15,
    },
    results: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '30%',
        marginVertical: 15,
        backgroundColor: '#383131',
        borderRadius: 15,
    },
    popular: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '30%',
        marginVertical: 15,
        backgroundColor: '#383131',
        borderRadius: 15,
    },
    footer: {
        height: '14%'
    },

    bigText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
    },

    smallText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    off: {
        opacity: 0.30,
      },
    active: {
        fontWeight: 'bold',
    }
})