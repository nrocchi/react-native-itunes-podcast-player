package com.myitunespodcastplayer;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
//import android.view.View;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "myItunesPodcastPlayer";
  }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.show(this);
        //hideNavigationBar();
    }

    /*@Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideNavigationBar();
        }
    }*/

    /*private void hideNavigationBar() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );

    }*/
}
