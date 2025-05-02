import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from './models/weather-response';


@Injectable({ providedIn: 'root' })
export class WeatherService {
  apiKey = 'bd98aeb743ba85d90a5bb68ad587a3e0';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  saveSearch(city: string) {
    return this.http.post('/api/history', { city });
  }

  getHistory() {
    return this.http.get<string[]>('/api/history');
  }
}
