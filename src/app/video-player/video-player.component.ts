import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Video } from '../core/video'
import { VideoPlayerService } from '../video-player.service'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer;
  video: Video;

  constructor(
    public videoPlayerService: VideoPlayerService
  ) {  }

  ngOnInit() {
    //console.log(this.videoPlayer.nativeElement)
    //this.videoPlayerService.setVideoPlayerElement(this.videoPlayer.nativeElement);
  }

  ngAfterViewInit():void {
    this.videoPlayerService.setVideoPlayerElement(this.videoPlayer.nativeElement);
  }
}
