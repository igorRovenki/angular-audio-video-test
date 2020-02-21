import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AudioPageComponent } from './audio-page/audio-page.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    VideoPageComponent,
    MainPageComponent,
    VideoPlayerComponent,
    AudioListComponent,
    AudioPageComponent,
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
