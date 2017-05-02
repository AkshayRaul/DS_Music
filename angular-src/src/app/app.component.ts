import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs/Rx';
import { QueueingSubject } from 'queueing-subject';
import { WebSocketService } from 'angular2-websocket-service';



@Injectable()
export class MusicService {
  constructor(public _http: Http) { }
  getMusic(): Observable<any> {
    let header = new Headers();
    header.append('Content-type','application/audio');
    header.append('Access-Control-Allow-Origin','*');
    return this._http.get('http://localhost:3000/getMusic1').map(response=>response);
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent implements OnInit {
  socket:WebSocket;
  private audioContext: AudioContext;
  private loadingSample: boolean = true;
  private audioBufferSource: ArrayBuffer;
  private audioBuffer: AudioBuffer=null ;
  private playbackRate: number = 1.0;
  private gain: number = 1.0;
  private playButton: Boolean=true;

  constructor(public getmusic: MusicService ) {

    this.socket=new WebSocket("ws://localhost:5000");
    this.WebSocketCommunication("Hello");
    this.socket.addEventListener('message', function (event) {
            console.log('Message from server', event.data);
        });
      this.loadingSample = true;
     
 }

  sendBlah(){
    this.socket.send("Blah");
  }

  ngOnInit() {
      this.audioContext = new AudioContext();
      console.log(this.audioContext);
       this.getmusic.getMusic().subscribe(response=>{
      this.audioBufferSource=response;
      console.log(response);
       if(response._body instanceof ArrayBuffer)
          console.log("yes")
       else
          console.log("no")
      
      this.audioContext.decodeAudioData(new ArrayBuffer.apply(response._body) , function(buffer) {
      console.log(buffer);
      this.audioBuffer = buffer;
      this.playSound(buffer);   
      
    },this.onError);
  });
  
  
  }

  onError(){
    console.log("ERROR!");
  }
    playSample() {
    let bufferSource = this.audioContext.createBufferSource();
    bufferSource.buffer = this.audioBuffer;
    //bufferSource.playbackRate.value = this.playbackRate;
    let gainNode = this.audioContext.createGain();
    //gainNode.gain.value = this.gain;
    //console.log("gain"+this.gain);
    bufferSource.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    bufferSource.start(0);
    
  }
  onClick() {
    console.log("clicked");
    this.playButton=!this.playButton;
    this.playSample();
    this.sendBlah();
  }
  getMusic() {
    console.log("adsa");

  }
  WebSocketCommunication(message){
    console.log(this.socket.readyState);
    this.socket.onopen=function(){
      console.log("Open");
      //this.send(message);
    }
  }
   
    
    
}
