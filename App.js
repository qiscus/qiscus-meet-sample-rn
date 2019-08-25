/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import QiscusMeet, { QiscusMeetEvents} from 'react-native-qiscus-meet';

export default class App extends Component {
  constructor(pops) {
    super(pops)
    this.state = {
      id_room: ''
    }
  }
  joinRoom () {
    QiscusMeet.initialize();
    QiscusMeetEvents.addListener('CONFERENCE_LEFT', (data) => {
        // this.props.navigation.navigate("Home")
    });
      setTimeout(() => {
        QiscusMeet.call("https://meet.qiscus.com/"+this.state.id_room);
      }, 2000);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text_room}>Sample Qiscus Meet React Native</Text>
        <TextInput
            placeholder={"Input ID Room"}
            underlineColorAndroid={"#EC407A"}
            onChangeText={(id_room) => this.setState({id_room})}
            style={{width:90}}
        />
        <Button title="Join Room" onPress={() => { this.joinRoom()}} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text_room :{fontWeight:"bold", fontSize:20}
}
