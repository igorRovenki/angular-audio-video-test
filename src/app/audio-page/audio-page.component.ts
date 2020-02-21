import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AUDIOS } from '../audio-list/mock-audios';
import { Audio } from '../core/audio'
import { AudioPlayerService } from '../audio-player.service'

@Component({
  selector: 'app-audio-page',
  templateUrl: './audio-page.component.html',
  styleUrls: ['./audio-page.component.css']
})
export class AudioPageComponent implements OnInit {
  audio: Audio;

  constructor(private route:ActivatedRoute, public audioPlayerService:AudioPlayerService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.audio = AUDIOS.find(video => video.id === id);
    this.audioPlayerService.add(this.audio);
  }
}
