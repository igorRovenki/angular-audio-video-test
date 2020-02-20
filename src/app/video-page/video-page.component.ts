import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VIDEOS } from '../video-list/mock-videos';
import { Video } from '../core/video'
import { VideoPlayerService } from '../video-player.service'

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer;
  video: Video;
  sticky: boolean = false;
  playListener;

  constructor(private route:ActivatedRoute, public videoPlayerService:VideoPlayerService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.video = VIDEOS.find(video => video.id === id);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    if ($event.currentTarget.innerWidth > 959) {
      this.sticky = $event.currentTarget.scrollY > 600;
    }
  }

  ngAfterViewInit():void {
    this.playListener = (event) => {
      if (!this.videoPlayerService.isPlayerHidden) {
        this.videoPlayerService.isPlayerHidden = true;
        this.videoPlayerService.removeVideoPlayerElement();
      }
    };
    this.videoPlayer.nativeElement.addEventListener('play', this.playListener);
  }

  ngOnDestroy():void {
    this.videoPlayer.nativeElement.className = 'sticky';

    if (!this.videoPlayer.nativeElement.paused) {
      this.videoPlayerService.isPlayerHidden = false;
    }

    this.videoPlayer.nativeElement.removeEventListener('play', this.playListener);
    this.videoPlayer.nativeElement.className = '';
    this.videoPlayer.nativeElement.style.height = '100%';
    this.videoPlayerService.removeVideoPlayerElement();
    this.videoPlayerService.getVideoPlayerElement().appendChild(this.videoPlayer.nativeElement);
  }

}
