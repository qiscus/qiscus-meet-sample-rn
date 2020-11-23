package com.exemple;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

import com.facebook.react.ReactActivity;

import static java.security.AccessController.getContext;

public class MainActivity extends ReactActivity {
  public static int ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE= 2323;


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Exemple";
  }



  private void RequestPermission() {
    // Check if Android M or higher
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      // Show alert dialog to the user saying a separate permission is needed
      // Launch the settings activity if the user prefers
      Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
              Uri.parse("package:" + this.getPackageName()));
      startActivityForResult(intent, ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE);
    }
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q &&
            !Settings.canDrawOverlays(this))
    {
      RequestPermission();
    }
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == ACTION_MANAGE_OVERLAY_PERMISSION_REQUEST_CODE) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        if (!Settings.canDrawOverlays(this)) {
//          PermissionDenied();
        } else {
          // Permission Granted-System will work
        }

      }
    }
  }
}


