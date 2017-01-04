import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import{ AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	updates: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController) {
    this.updates=af.database.list('/updates');
  }

  addUpdate(){
  	//getting present time as form of date
  	let t=(new Date()).toISOString();
  	//date=dt.toISOString();
  	let prompt = this.alertCtrl.create({
	    title: 'Traffic Updates ',
	    message: "Enter details of traffic update ",
	    inputs: [
	      {
	        name: 'title',
	        placeholder: 'Title'
	      },
	      {
	      	name: 'message',
	      	placeholder: 'Message'
	      },
	      {
	      	name: 'stripcolor',
	      	placeholder: 'Strip Color i.e red, orange, yellow, green, blue'
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
	          this.updates.push({
	            title: data.title,
	            message: data.message,
	            stripcolor: data.stripcolor,
	            time:t,
	          });
	        }
	      }
	    ]
	  });
  	prompt.present();
	}
  
  //function to calculate time
  showTime(t){

  	//diff of minutes
  	let oneMin = 60*1000;
  	let msgT=new Date(t);
  	let currT=new Date();
  	let diff=Math.round((msgT.getTime() - currT.getTime())/(oneMin));
  	if(Math.abs(diff)>59){
  		diff=Math.round(diff/60);
  		return Math.abs(diff)+" Hours Ago";
  	}
  	return Math.abs(diff) +" Minutes Ago";
  }

}
