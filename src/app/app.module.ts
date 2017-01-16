import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddFeed } from '../pages/add-feed/add-feed';

import { Data } from '../providers/data';

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
    HomePage,
    AddFeed
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddFeed
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Data]
})
export class AppModule {}
