import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-show-on-map',
  templateUrl: 'show-on-map.html'
})

export class ShowOnMap {

	@ViewChild('map') mapElement: ElementRef;
	map:any;

	feedObj;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.feedObj=navParams.get('feedObj');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowOnMapPage');
    this.loadMap();
    this.addMarker();
  }

  //function To show map
  loadMap(){
  	let latLng= new google.maps.LatLng(22.7196,75.8577);

  	let mapOptions={
  		center:latLng,
  		zoom:15,
  		mapTypeId: google.maps.MapTypeId.roadmap
  	}
  	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  //to add marker in Map
  addMarker(){
  	let marker= new google.maps.Marker({
  		map:this.map,
  		animation: google.maps.Animation.DROP,
  		position: this.map.getCenter() 		
  	});

  	let content="<h6>"+ this.feedObj.message +"</h6>";
  	this.addInfoWindow(marker,content);
  }

  //Show info window on click
  addInfoWindow(marker,content){
  	let infoWindow= new google.maps.InfoWindow({
  		content: content
  	});

  	google.maps.event.addListener(marker,'click',()=>{
  		infoWindow.open(this.map, marker);
  	});
  }
}
