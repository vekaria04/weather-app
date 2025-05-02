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
    this.city = this.city.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();
    this.searchWeather();
  }

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getHistory().subscribe(data => this.searchHistory = data);
  }

  searchWeather() {
    if (!this.city.trim()) return;

    // Capitalize first letter of the city
    this.city = this.city.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();

    this.weatherService.getWeather(this.city).subscribe((data: WeatherResponse) => {
      this.weatherData = data;

      // Save the search to backend
      this.weatherService.saveSearch(this.city).subscribe();

      // Show the map
      this.initMap(data.coord.lat, data.coord.lon);

      // Add to history if not already present
      if (!this.searchHistory.includes(this.city)) {
        this.searchHistory.unshift(this.city);
      }

      // Clear input
      this.city = '';
    });
  }

}
