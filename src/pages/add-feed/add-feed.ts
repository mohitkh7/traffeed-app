import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import{ AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the AddFeed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-feed',
  templateUrl: 'add-feed.html'
})
export class AddFeed {

	location;
	type="Traffic Jam";
	message;
	intensity="medium";
	user_updates: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public navParams: NavParams) {
  	//for updates to user updates
    this.user_updates=af.database.list('/user_updates');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFeedPage');
  }

  addFeed(){
  	//getting present time as form of date
		let t=(new Date()).toISOString();

  	this.user_updates.push({
      location: this.location,
      type: this.type,
      message: this.message,
      intensity: this.intensity,
      time:t,
    });
    this.navCtrl.pop();
  }

}
