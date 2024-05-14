import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherAppComponent } from './weather-app/weather-app.component';

const routes: Routes = [{ 
path:'weatherapp', component: WeatherAppComponent},
{path:'**', redirectTo:'weatherapp'}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
