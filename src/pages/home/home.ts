import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import L from "leaflet";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  onMapClick(e) {
    let tempMarker = L.marker(e.latlng, { icon: this.tempIcon })
      .on('click', this.showMarkerMenu, this)  // Al hacer click, ejecutamos this.showMarkerMenu y le pasamos el contexto (this)
      .addTo(this.map);

    this.mensaje("Pulsada la coordenada: " + e.latlng);

  }
  map: L.Map;
  center: L.PointTuple;
  tempIcon: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }
  ionViewDidLoad() {

    this.center = [12.9078, 77.6447]; //Matanzas, Cuba

    this.initMap();

    this.mensaje("Pulse sobre un punto en el mapa para añadir un nuevo lugar");

    this.tempIcon = L.icon({
      iconUrl: 'assets/imgs/Marker.png',
      shadowUrl: '',
      iconSize: [32, 32], // size of the icon
      shadowSize: [0, 0], // size of the shadow
      iconAnchor: [32, 32], // point of the icon which will correspond to markers location
      shadowAnchor: [0, 0], // the same for the shadow
      popupAnchor: [32, 20] // point from which the popup should open relative to the iconAnchor
    });

    this.map.on('click', (e) => { this.onMapClick(e) });

  }
  showMarkerMenu() {
    this.mensaje("Se ha pulsado click en un marcador puesto.");
  }
  initMap() {

    this.map = L.map('map', {
      center: this.center,
      zoom: 15
    });

    //Adicionamos la ruta de OSM.
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; Código 200'
    })
      .addTo(this.map);

  }
  mensaje(texto) {
    let toast = this.toastCtrl.create({
      message: texto,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
