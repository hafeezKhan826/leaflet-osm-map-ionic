import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';
/**
 * Generated class for the DemoMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-demo-map',
	templateUrl: 'demo-map.html'
})
export class DemoMapPage {
	center: any[];

	demoMap: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		this.loadMap();
		this.center = [ 12.9078, 77.6447 ];
	}

	loadMap() {
		this.demoMap = L.map('map', {
			center: this.center,
			zoom: 15
		});

		//Adicionamos la ruta de OSM.
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; Código 200'
		}).addTo(this.demoMap);
	}
}
