import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import{ AngularFire, FirebaseListObservable } from 'angularfire2';

import {AddFeed} from '../add-feed/add-feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	updates: FirebaseListObservable<any>;
	user_updates: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController) {
		//this.updates=af.database.list('/updates').map(items => items.sort((a, b) => a.time - b.time)) as FirebaseListObservable<any[]>;;

		//for offcial updates
		this.updates = af.database.list('/updates/', {
      		query: {
        		orderByChild: 'time'
      		}
    	}).map((array)=>array.reverse()) as FirebaseListObservable<any[]>;
    	//this.updates.reverse() as FirebaseListObservable<any[]>;

    	//for updates from user
    	this.user_updates=af.database.list('/user_updates');



	}

	addUpdate(){
		/*//getting present time as form of date
		let t=(new Date()).toISOString();
		//date=dt.toISOString();
		let prompt = this.alertCtrl.create({
	    title: 'Traffic Updates ',
	    message: "Enter details of traffic update ",
	    inputs: [
	      {
	        name: 'location',
	        placeholder: 'Location'
	      },
	      {
	      	name: 'message',
	      	placeholder: 'Message'
	      },
	      {
	      	name: 'intensity',
	      	placeholder: 'Alert Intensity : high, medium and low'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Save',
	        handler: data => {
	          this.user_updates.push({
	            title: data.location,
	            message: data.message,
	            intensity: data.intensity,
	            time:t,
	          });
	        }
	      }
	    ]
	  });
		prompt.present();*/
		this.navCtrl.push(AddFeed);
	}

	//function to calculate time
	showTime(t){

		//diff of minutes
		let oneMin = 60*1000;
		let msgT=new Date(t);
		let currT=new Date();
		let diff=Math.round((msgT.getTime() - currT.getTime())/(oneMin));
		//Just Now
		if(diff==0)
			return "Just Now";
		//Days
		if(Math.abs(diff)>1439){
			diff=Math.round(diff/1440);
			return Math.abs(diff)+ " Days Ago";
		}
		//Hours
		if(Math.abs(diff)>59){
			diff=Math.round(diff/60);
			return Math.abs(diff)+" Hours Ago";
		}
		//Minutes
		return Math.abs(diff) +" Minutes Ago";
	}

}
