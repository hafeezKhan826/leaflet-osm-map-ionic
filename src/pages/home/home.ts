import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import L from 'leaflet';
import 'leaflet-draw';
import { DemoMapPage } from '../demo-map/demo-map';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	editableLayers: any;
	onMapClick(e) {
		this.mensaje('Pulsada la coordenada: ' + e.latlng);
	}
	map: L.Map;
	center: L.PointTuple;
	tempIcon: any;

	constructor(public navCtrl: NavController, public toastCtrl: ToastController) {}
	ionViewDidLoad() {
		this.center = [ 12.9078, 77.6447 ]; //Matanzas, Cuba

		this.initMap();

		this.mensaje('Pulse sobre un punto en el mapa para añadir un nuevo lugar');

		this.tempIcon = L.icon({
			iconUrl: 'assets/images/marker-icon.png',
			shadowUrl: '',
			iconSize: [ 32, 32 ], // size of the icon
			shadowSize: [ 0, 0 ], // size of the shadow
			iconAnchor: [ 32, 32 ], // point of the icon which will correspond to markers location
			shadowAnchor: [ 0, 0 ], // the same for the shadow
			popupAnchor: [ 32, 20 ] // point from which the popup should open relative to the iconAnchor
		});

		this.map.on('click', (e) => {
			// this.onMapClick(e);
		});

		const circle = L.circle([ 12.9078, 77.645 ], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 100
		}).addTo(this.map);

		circle.bindPopup('In a circle');

		var polygon = L.polygon([
			[ 12.908647789453815, 77.6450425386429 ],
			[ 12.908527525973597, 77.64687180519105 ],
			[ 12.907324887989674, 77.64698445796968 ],
			[ 12.907528813968185, 77.64449000358583 ]
		]).addTo(this.map);
		polygon.bindPopup('In a polygon');
	}
	showMarkerMenu() {
		this.mensaje('Se ha pulsado click en un marcador puesto.');
	}
	initMap() {
		this.map = L.map('map', {
			drawControl: true
		}).setView(this.center, 18);

		//Adicionamos la ruta de OSM.
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
			maxZoom: 18
		}).addTo(this.map);

		// add a marker in the given location
		L.marker(this.center).addTo(this.map);

		// Initialise the FeatureGroup to store editable layers
		this.editableLayers = new L.FeatureGroup();
		this.map.addLayer(this.editableLayers);

		var drawPluginOptions = {
			position: 'topleft',
			draw: {
				polygon: {
					allowIntersection: false, // Restricts shapes to simple polygons
					drawError: {
						color: '#e1e100', // Color the shape will turn when intersects
						message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
					},
					shapeOptions: {
						color: 'black'
					}
				},
				// disable toolbar item by setting it to false
				polyline: false,
				circle: false, // Turns off this drawing tool
				rectangle: false,
				marker: false
			},
			edit: {
				featureGroup: this.editableLayers, //REQUIRED!!
				remove: false
			}
		};

		// Initialise the draw control and pass it the FeatureGroup of editable layers
		var drawControl = new L.Control.Draw(drawPluginOptions);
		this.map.addControl(drawControl);

		this.map.on('draw:created', (e) => {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				const name: any = 1916;
				layer.bindPopup(name.toString());
			}
			let seeArea: number;
			if (type === 'polygon') {
				let latLangs: number[] = layer.getLatLngs()[0];
				seeArea = L.GeometryUtil.geodesicArea(latLangs);
				layer.bindPopup(seeArea.toFixed(3).toString());
			}
			this.editableLayers.addLayer(layer).addTo(this.map);
		});
	}
	mensaje(texto) {
		let toast = this.toastCtrl.create({
			message: texto,
			position: 'bottom',
			duration: 1
		});
	}

	goToDemoMap() {
		this.navCtrl.push(DemoMapPage);
	}
}
