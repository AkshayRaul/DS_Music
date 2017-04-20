import { Component,OnInit,Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class MusicService{

  constructor(public _http:Http){}
  getMusic():Observable<any>{
    let header=new Headers();
    header.append('Content-type','application/audio'); 
    header.append('Access-Control-Allow-Origin','*'); 
    return this._http.get('http://localhost:3000/getMusic1').map(response=>response.blob);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})

export class AppComponent implements OnInit{
  audio:string;
  Song:any;
  music:any;
  constructor(public getmusic:MusicService){
    this.audio="http://localhost:3000/getMusic";
    var audioContext = new AudioContext();
    var context = new AudioContext(),
    oscillator = context.createOscillator();
    var decodemusic;
    this.getmusic.getMusic().subscribe(response=>{
      decodemusic=response;
      
    });
    context.decodeAudioData(decodemusic, function (buffer) {
        // The contents of our mp3 is now an AudioBuffer
        console.log(buffer);
    });
 
      // Connect the oscillator to our speakers
      oscillator.connect(context.destination);
  }
  ngOnInit(){
    this.getMusic();
    console.log(this.Song);
    
  }
  getMusic(){
    console.log("adsa");
    
  }
}
