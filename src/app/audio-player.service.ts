import { Injectable } from '@angular/core';

import { Audio } from './core/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  public current: Audio;

  constructor() {
    this.current = new Audio;
    this.current.src = '';
    this.current.name = '';
  }

  add(audio: Audio) {
    if (audio === this.current) {
      return;
    }
    this.current = audio;
  }
}
