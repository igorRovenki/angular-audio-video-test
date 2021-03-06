import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {VideoListComponent} from './video-list/video-list.component';
import {VideoPageComponent} from './video-page/video-page.component';
import {AudioPageComponent} from './audio-page/audio-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'video/:id', component: VideoPageComponent},
  {path: 'audio/:id', component: AudioPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
