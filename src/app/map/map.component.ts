import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: any;
  private centroid: L.LatLngExpression = [-8.054912893912377, -34.88790323661564];
  
  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 65  
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    const sensors = [
      {
        lat : -8.054272974423708, 
        long: -34.88656432687761,
        status: 10,
        residuo: "Orgânico"
      },
      {
        lat : -8.054145150417943,
        long: -34.88794950829553,
        status: 50,
        residuo: "Plástico"
      },
      {
        lat : -8.054723763620000,
        long: -34.88728003682802,
        status: 30,
        residuo: "Metal"
      },
      {
        lat : -8.055731763620000,
        long: -34.88802003682602,
        status: 100,
        residuo: "Orgânico"
      },
      {
        lat : -8.055841763620000,
        long: -34.88697503682002,
        status: 25,
        residuo: "Papel"
      },
      {
        lat : -8.054571763620000,
        long: -34.88968103682002,
        status: 67,
        residuo: "Metal"
      }]
    var myIcon = L.icon({
        iconUrl: '/assets/data/lixeira.png',
        iconSize: [50, 50],
        iconAnchor: [22, 45],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [0, 95],
        shadowAnchor: [22, 94]
    });
    sensors.forEach((element, index) => {
      L.marker([element.lat, element.long], {icon: myIcon} ).addTo(this.map)
      .bindPopup(`<b>Código:</b> ${index} <br> <b>Tipo:</b> ${element.residuo} <br> <b>Capacidade:</b> ${element.status}%`);
      
    });
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map);
  }

}