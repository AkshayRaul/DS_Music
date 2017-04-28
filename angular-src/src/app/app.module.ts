import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent,MusicService, } from './app.component';
import { WebSocketService } from 'angular2-websocket-service'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MusicService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
