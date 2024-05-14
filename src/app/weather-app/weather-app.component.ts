import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Root } from '../models/weather.model';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
})
export class WeatherAppComponent {
  weatherData: Root = {} as Root;
  localTime: any;
  currentTemp: any;
  feels_like: any;
  minTemp: any;
  maxTemp: any;
  today: number = Date.now();
  city: string;
  condition: string | undefined;
  country: string | undefined;
  sunrise: any;
  sunset: any;
  timeZone: any;
  humidity: number = -1;
  windSpeed: number = NaN;

  constructor(private weatherService: WeatherService) {
    this.city = '';
  }

  ngOnInit(): void {
    this.fetchWeather('London');
  }

  fetchWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((res: Root) => {
      this.weatherData = res;
      this.setAllData(res);
      console.log('Weather data:', this.weatherData);
    });
  }

  setAllData(allWeather: Root) {
    if (!allWeather) {
      console.error('Weather data is undefined or null');
      return;
    }

    const currentWeather = allWeather.current;

    if (!currentWeather) {
      console.error('Current weather data is undefined or null');
      return;
    }

    const location = allWeather.location;

    if (!location) {
      console.error('Location data is undefined or null');
      return;
    }

    this.humidity = currentWeather.humidity;
    this.windSpeed = currentWeather.wind_kph;

    this.localTime = new Date(currentWeather.last_updated_epoch * 1000);
    this.currentTemp = currentWeather.temp_c;
    this.feels_like = currentWeather.feelslike_c;

    this.city = location.name;
    this.country = location.country;

    this.condition = currentWeather.condition.text;
  }

  kelvinToCelcius(temp: any) {
    return Math.round(temp - 273);
  }
}