import { Component, OnInit } from '@angular/core';
import { AudioPlayerService } from '../audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  constructor(public audioPlayerService: AudioPlayerService) { }

  ngOnInit(): void {
  }

}
