import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
})
export class WeatherAppComponent {
  weatherData!: any;
  localTime: any;
  currentTemp: any;
  feels_like: any;
  minTemp: any;
  maxTemp: any;
  today: number = Date.now();
  city!: string;
  condition: string | undefined;
  country: string | undefined;
  sunrise: any | undefined;
  sunset: any | undefined;
  timeZone: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeatherByCity().subscribe((res) => {
      this.weatherData = res;
      this.setAllData(res);
      console.log('weatherService.getData', this.weatherData);
    });
  }

  checkWeather(location: string) {
    this.weatherService.getWeatherByCity(location).subscribe((res: any) => {
      this.weatherData = res;
      this.setAllData(res);
      console.log('weatherService.getData', this.weatherData);
    });
  }

  changeLocation(location: any) {
    this.checkWeather(location);
  }

  setAllData(allWeather: any) {
    this.localTime = new Date(allWeather.dt*1000);
    this.currentTemp = this.kelvinToCelcius(allWeather.main.temp);
    this.feels_like = this.kelvinToCelcius(allWeather.main.feels_like);
    this.maxTemp = this.kelvinToCelcius(allWeather.main.temp_max);
    this.minTemp = this.kelvinToCelcius(allWeather.main.temp_min);
    this.city = allWeather.name
    this.condition = allWeather.weather[0].description
    this.country = allWeather.sys.country
    this.sunrise = new Date(allWeather.sys.sunrise*1000);
    this.sunset = new Date(allWeather.sys.sunset*1000);
    this.timeZone =  new Date((allWeather.dt+allWeather.timezone)*1000);
    

    console.log(this.localTime);
  }

  kelvinToCelcius(temp: any) {
    return Math.round(temp - 273);
  }
}
