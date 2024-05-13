import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  APIUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  APIKey: string = 'appid=ada6a287c7a3ea49ee2c4016583e8b5d';
  private subject = new BehaviorSubject<any>([]);

  getUpdatedWeather = this.subject.asObservable();

  constructor(private http: HttpClient) {
    this.initData();
  }

  getWeatherByCity(cityName='london') {
    return this.http.get(`${this.APIUrl}q=${cityName}&${this.APIKey}`);
  }

  private initData() {
    return this.http.get('link').subscribe((response) => {
      console.log('response', response);
      this.subject.next(response);
    });
  }
}
