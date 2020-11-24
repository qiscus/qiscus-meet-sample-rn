import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import QiscusMeet, { QiscusMeetView } from 'react-native-qiscus-meet';
import OneSignal from 'react-native-onesignal';

function App() {
  
  useEffect(() => {
    const url = 'https://call.qiscus.com';
    const appId = "meetstage-iec22sd";

    OneSignal.init("cda22834-968e-4a35-8e16-b4eb1879f3b1", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});

    OneSignal.inFocusDisplaying(2); // Show native notifications even if the app is open 

    OneSignal.requestPermissions(); // Show the iOS prompt for push permission

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);

    QiscusMeet.setup(appId, url);
  }, [])


function onReceived(notification) {
    
    console.log("Notification received: ", notification);
//     console.log("Get Room", notification.payload.additionalData.room)
//     const userInfo = {
//       displayName: 'Meet User',
//       email: 'user@qiscus.net',
//       room: notification.payload.additionalData.room,
//       avatar: 'https:/gravatar.com/avatar/abc123',
//       videoMuted : true,
//       audioMuted : true,
//       audioOnly: false,
// };
// QiscusMeet.call(userInfo);
}

function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
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

  function endCall(nativeEvent) {
    QiscusMeet.endCall();
  }

  function call() {
    const userInfo = {
          displayName: 'Meet User',
          email: 'user@qiscus.net',
          room: 'roomtest',
          avatar: 'https:/gravatar.com/avatar/abc123',
          videoMuted : true,
          audioMuted : true,
          audioOnly: false,
    };
    QiscusMeet.call(userInfo);
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