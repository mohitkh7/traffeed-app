import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

//AF2 settings
export const firebaseConfig={
  apiKey: "AIzaSyC1mVPrGCMgKELWOAKdWoQZ5I8oa--0Sgc",
  authDomain: "indore-traffic-updates.firebaseapp.com",
  databaseURL: "https://indore-traffic-updates.firebaseio.com",
  storageBucket: "indore-traffic-updates.appspot.com",
  messagingSenderId: "301590757882"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
