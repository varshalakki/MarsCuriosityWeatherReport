import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private API_KEY = `SJtLy0wNppl58fwcHcMcFKo9i4tkASgJlgLSmXkJ`
  private API_URL = `https://api.nasa.gov/insight_weather/?api_key=${this.API_KEY}&feedtype=json&ver=1.0`;
  private PHOTO_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${this.API_KEY}`
  
  constructor(private httpClient: HttpClient) { }

  getData():Observable<[]>{  
    return this.httpClient.get<[]>(this.API_URL);  
  }

  getPhoto():Observable<[]>{
    return this.httpClient.get<[]>(this.PHOTO_API_URL);
  } 
}
