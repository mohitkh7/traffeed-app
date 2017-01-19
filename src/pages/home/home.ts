import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';

import{ AngularFire, FirebaseListObservable } from 'angularfire2';

import {AddFeed} from '../add-feed/add-feed';
import {ShowOnMap} from '../show-on-map/show-on-map';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	updates: FirebaseListObservable<any>;
	user_updates: FirebaseListObservable<any>;
	constructor(public navCtrl: NavController, af: AngularFire) {

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

	ionViewDidLoad(){
		
	}

	addUpdate(){
		this.navCtrl.push(AddFeed);
	}
	showOnMap(Obj){
		this.navCtrl.push(ShowOnMap,{feedObj:Obj});
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
