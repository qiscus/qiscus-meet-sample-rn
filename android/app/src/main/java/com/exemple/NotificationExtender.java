package com.exemple;

import android.content.Intent;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.onesignal.NotificationExtenderService;
import com.onesignal.OSNotificationDisplayedResult;
import com.onesignal.OSNotificationOpenResult;
import com.onesignal.OSNotificationReceivedResult;
import com.onesignal.OneSignal;

import org.json.JSONObject;

import java.math.BigInteger;

public class NotificationExtender extends NotificationExtenderService {
    @Override
    protected boolean onNotificationProcessing(OSNotificationReceivedResult notification) {
        OverrideSettings overrideSettings = new OverrideSettings();
        overrideSettings.extender = builder -> {

            String title = notification.payload.title;
            String body  = notification.payload.body;
            JSONObject additionalData = notification.payload.additionalData;

            Log.d("OneSignalExample", "Get additional data: " + additionalData);

            //Force remove push from Notification Center after 30 seconds
            builder.setTimeoutAfter(30000);
            // Sets the icon accent color notification color to Green on Android 5.0+ devices.
            builder.setColor(new BigInteger("FF00FF00", 16).intValue());
            builder.setContentTitle(title);
            builder.setContentText(body);
            return builder;
        };

        OSNotificationDisplayedResult displayedResult = displayNotification(overrideSettings);
        Log.d("OneSignalExample", "Notification displayed with id: " + displayedResult.androidNotificationId);


        Intent intent = new Intent(NotificationExtender.this, MainActivity.class)
                .addFlags(Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT | Intent.FLAG_ACTIVITY_MULTIPLE_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);

        return false;
    }
}
