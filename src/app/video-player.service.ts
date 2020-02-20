import { Injectable } from '@angular/core';

import { Video } from './core/video'

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  playlist: Video[] = [];
  public playing: boolean = false;
  public current: Video;
  public isPlayerHidden: boolean = true;
  public videoPlayerElement;

  constructor() { }

  add(video: Video, videos: Video[]) {
    if (video === this.current) {
      return;
    }
    this.current = video;
    this.playlist = [];

    for (var i = 0; i < videos.length; i++) {
      this.playlist.push(videos[i]);
    }
  }

  setVideoPlayerElement(videoPlayerElement: any) {
    this.videoPlayerElement = videoPlayerElement;
  }

  getVideoPlayerElement() {
    return this.videoPlayerElement;
  }

  getVideoPlayer() {
    return this.getVideoPlayerElement().childNodes[0];
  }

  removeVideoPlayerElement(hide: boolean = false):void {
    if (hide) {
      this.isPlayerHidden = true;
    }
    try {
      this.getVideoPlayerElement()
        .removeChild(this.getVideoPlayerElement().childNodes[0])
      ;
    } catch (e) {
      console.error(e.message);
    }
  }
}
