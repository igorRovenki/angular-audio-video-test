# Как сделать сквозной аудиоплеер в Ангуляре, который будет работать на всех страницах сайта?

#### 1. Создадим новый компонент **audio-list**
  
```ng generate component audio-list```  

Cоздадим тип для аудио. Для этого в папке `src/core` создадим файл `audio.ts`:

```
export class Audio {
    id: number;
    name: string;
    src: string;
}
```

Создадим фикстуру массив аудиозаписей `src/app/audio-list/mock-audios.ts`

```
import { Audio } from '../core/audio';
export const AUDIOS: Audio[] = [
    {
        id: 16,
        name: 'Философия общего дела Федорова кратко',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-4-filonenko-filosofiya-obschego-dela-fedorova-kratko.mp3',
    },
    {
        id: 15,
        name: 'Лекция перед сном. Игра про бесконечность',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-3-filonenko-lekciya-pered-snom-igra-pro-beskonechnost.mp3',
    },
    {
        id: 14,
        name: 'Великие игроки',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-2-aleksandr-filonenko-velikie-igroki.mp3',
    },
    {
        id: 13,
        name: 'Игра в Биссер',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-1-aleksandr-filonenko-igra-v-biser.mp3',
    },
    {
        id: 12,
        name: 'Мой домашний динозавр',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-1-aleksandr-filonenko-igra-v-biser.mp3',
    },
    {
        id: 11,
        name: 'Звёздочки на земле',
        src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-1-aleksandr-filonenko-igra-v-biser.mp3',
    },
];
```

В файл компонента `src/app/audio-list/audio-list.component.ts` добавим в массив audios данные фикстуры
 
```
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
```

В шаблон компонента `src/app/audio-list/audio-list.component.html` добавим:

```
<div class="row">
    <div class="col-md-4" *ngFor="let audio of audios">
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <p class="card-text">{{audio.name}}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a role="button" class="btn btn-sm btn-outline-secondary" [routerLink]="['audio', audio.id]">Слушать</a>
                    </div>
                    <small class="text-muted">9 mins</small>
                </div>
            </div>
        </div>
    </div>
</div>
```

Добавим на главную страницу (`src/app/main-page/main-page.component.html`) вызов компонента `audio-list`:

```
<h2>Аудио</h2>
<app-audio-list></app-audio-list>
```

### 2. Создадим компонент для страницы аудио

```ng generate component audio-page```

Добавим в код компонента `src/app/audio-page/audio-page.component.ts`. В метод ngOnInit мы будем использовать сервис
audioPlayerService, который создадим на следующем шаге.

```
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
```

Добавим роутинг в файл `src/app/app-routing.module.ts`, чтобы мы могли открывать страницу аудио с определенным id.

```
import {AudioPageComponent} from './audio-page/audio-page.component';
const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'audio/:id', component: AudioPageComponent}
];
```

Проверим, есть ли в `app.component.html` вызов `<router-outlet></router-outlet>`, если нет, то добавим:

```<router-outlet></router-outlet>```

### 3. Создадим аудио сервис и компонент аудио плеера, который будет работать даже после ухода со страницы аудиозаписи

Создадим сервис для аудио плеера

```ng generate service audioPlayer```

Добавим в файл сервиса код

```
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
```

Создадим компонент аудио плеера, который будет работать на всех страницах сайта.

```ng generate component audio-player```

Добавим в конструктор компонента `src/app/audio-player/audio-player.component.ts` сервис AudioPlayerService

```
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
```

и в шаблон компонента `src/app/audio-player/audio-player.component.html` добавим:

```
<audio #audioplayer src="{{audioPlayerService.current.src}}" [hidden]="!audioPlayerService.current.id" controls autoplay></audio>
```

в стиль компонента добавим:

```
audio {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 98%;
}
```

Добавим также вызов компонента в `src/app/app.component.html`. После вызова `<router-outlet></router-outlet>`
добавим `<app-audio-player></app-audio-player>`

```
<div class="album py-5 bg-light">
    <div class="container">
      <router-outlet></router-outlet>
      <app-audio-player></app-audio-player>
    </div>
  </div>
```

Поздравляем! Вы реализовали сквозной аудиоплеер на AngularJS!

Весь работающий код Вы можете найти в репозитории [https://github.com/igorRovenki/angular-audio-video-test/](https://github.com/igorRovenki/angular-audio-video-test/)
