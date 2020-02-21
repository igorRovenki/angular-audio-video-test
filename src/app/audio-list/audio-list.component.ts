import { Component, OnInit } from '@angular/core';
import { AUDIOS } from './mock-audios';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {
  audios = [];

  constructor() { }

  ngOnInit(): void {
    this.audios = AUDIOS;
  }

}
