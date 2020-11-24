//
//  MeetNotification.swift
//  Exemple
//
//  Created by Ganjar Widiatmansyah on 24/11/20.
//

import Foundation
//import OneSignal
import UserNotifications
import UserNotificationsUI

@objc class MeetNotification : NSObject{
    var appId: String = ""
    let ringingTime = 5
    var current = 0
    override init() {
    }
    @objc func createNotification(userInfo: NSDictionary) {
        print("userInfo :\(userInfo)")
      UIApplication.shared.applicationIconBadgeNumber = Int.random(in: 0..<10)
      
        let callRoomId = "qiscusroom"
        let content = UNMutableNotificationContent()
        content.title = "Incoming Call"
        content.subtitle = "from juang"
        //Play custom sound
        content.sound = UNNotificationSound.init(named:UNNotificationSoundName(rawValue: "call.wav"))
        Timer.scheduledTimer(withTimeInterval: 7, repeats: true) { timer in
            self.removeNotif(id: callRoomId)
            if self.current <= self.ringingTime {
                self.localNotif(content: content, id: callRoomId)
            }
            self.current += 1
        }
    }
    func localNotif(content: UNMutableNotificationContent, id: String) {
        // show this notification five seconds from now
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
        // choose a random identifier
        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
        // add our notification request
        UNUserNotificationCenter.current().add(request)
    }
    func removeNotif(id: String) {
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: [id])
    }
}
