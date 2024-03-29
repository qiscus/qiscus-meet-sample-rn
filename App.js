import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import QiscusMeet, { QiscusMeetView } from 'react-native-qiscus-meet';

function App() {

  useEffect(() => {
    const url = 'https://call.qiscus.com';
    const appId = "meetstage-iec22sd";
    QiscusMeet.setup(appId, url);
  }, [])
  function endCall(nativeEvent) {
    QiscusMeet.endCall();
  }
  
  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent)
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent)
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent)
  }
  function onParticipantJoined(nativeEvent){
        /* Participant  joined conference */
    console.log(nativeEvent)
  }
  function onParticipantLeft(nativeEvent){
        /* Participant left event */
        endCall();
        console.log(nativeEvent)

  }


  function call() {
    const data = {
          displayName: 'Meet User',
          email: 'user@qiscus.net',
          room: 'roomtest',
          avatar: 'https:/gravatar.com/avatar/abc123',
          videoMuted : true,
          audioMuted : true,
          audioOnly: true,
          overFlowMenu:true,
          chatEnabled :false,
          meetingPassword:false,
          inviteEnabled:false,
          meetingNameEnabled:true,
          toolboxEnabled :true,
          raiseHandEnabled:true,
          tileViewEnabled:false,
          toolboxAlwaysVisible:true,
          screenSharing:true,
          participantMenu:true,
          videoMuteButton:true,
          audioMuteButton:true,
          securityDialog:true,
          muteEveryoneButton:true,
          muteEveryoneVideo:true,
          conferenceTimerEnabled:true
    };
    QiscusMeet.call(data);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => endCall()}
      >
        <Text>End Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => call()}
      >
        <Text>Start all</Text>
      </TouchableOpacity>
      <QiscusMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        onParticipantJoined={e => onParticipantJoined(e)}
        onParticipantLeft={e => onParticipantLeft(e)}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          marginTop: 20,
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,

  },
});

export default App;