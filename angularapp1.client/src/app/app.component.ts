import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherResponse } from './models/weather-response';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  city = '';
  weatherData: any;
  searchHistory: string[] = [];
  private map: any;

  initMap(lat: number, lon: number) {
  setTimeout(() => {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map').setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    L.marker([lat, lon]).addTo(this.map);
  }, 0);
  }

  searchWeatherFromHistory(city: string) {
    this.city = city;
    this.searchWeather();
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getHistory().subscribe(data => this.searchHistory = data);
  }

  searchWeather() {
    this.weatherService.getWeather(this.city).subscribe((data: WeatherResponse) => {
      this.weatherData = data;
      this.weatherService.saveSearch(this.city).subscribe();
      this.initMap(data.coord.lat, data.coord.lon);
      this.searchHistory.unshift(this.city);
      this.city = '';
      this.initMap(data.coord.lat, data.coord.lon);
    });
  }
}
