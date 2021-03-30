
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather-service.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {
  weatherData: Array<any> = [];
  photoData: Array<any> =[];
  matchedPhoto: any;
  cameraName: Array<any>=[];
  allPhotos: Array<any>=[];
  foundMatch: boolean =  false;
  selectedCamera: any;
  showForm= false; 

onClick = () =>{
 this.photoData.forEach((element:any) => {
  this.cameraName.push(element.camera.full_name);
  let uniqueItems = [...new Set(this.cameraName)]
  this.showForm = true;
  return this.cameraName=uniqueItems;
});
}

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
   this.getData(); 
   this.getPhoto();
}  

  async getData() {
   return  this.weatherService.getData().subscribe((data: any) => {
     const {
       sol_keys,
       validity_checks,
       ...solData
     } = data;
     this.weatherData = Object.entries(solData).map(([sol, data]: any) => {
       return {
         sol: sol,
         maxTemp: data.PRE.mx,
         minTemp: data.PRE.mn,
         avgTemp: data.PRE.av,
         date: new Date(data.First_UTC).toDateString()
       };
     });
   })
} 

async getPhoto(){
  
 this.weatherService.getPhoto().subscribe((photoData: any) => {
   this.photoData = photoData.photos;   
  })
}

getMatchedPhoto(sol: string){
  let matchedArray: any[] =[];
  this.photoData.forEach((element:any) => {
    if(element.sol == sol) {  
     matchedArray.push(element.img_src); 
     this.matchedPhoto = element.img_src;
     this.foundMatch = true;
      return this.matchedPhoto
    }   
  });
}

cameraClicked(){
  this.allPhotos = []
  this.photoData.forEach((element:any) => {
    if(element.camera.full_name == this.selectedCamera){
      this.allPhotos.push(element.img_src);
    }    
    return this.allPhotos;
  });
}
}